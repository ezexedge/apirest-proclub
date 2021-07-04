const Club = require('../models/Club')
const db = require('../config/db')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXUsuario = require('../models/ClubXUsuario')
const Pais = require('../models/Pais')
const ClubXusuario = require('../models/ClubXUsuario')
const Provincia = require('../models/Provincia')

exports.clubTodos = async (req, res) => {


  try {
    const result = await Club.findAll({
      where: {
        activo: 1
      },
      order: [['id', 'DESC']]})

    res.status(200).json(result)

  } catch (err) {
    res.status(400).json(err)

  }

}

exports.listClubWithRespAndPais = async (req, res) => {


  try {

    const result = await db.query(`SELECT clubs.id, clubs.nombre, concat(personas.nombre,' ',personas.apellido) AS 'contacto',  provincia.nombre AS 'ciudad' , pais.nombre AS 'pais'  
   FROM clubs, personas, direccions , provincia, pais
   WHERE personas.id = clubs.personaId AND direccions.id = clubs.direccionId AND provincia.id = direccions.provinciaId AND pais.id = provincia.countryId AND clubs.activo = 1;`)


    res.status(200).send(result[0])

  } catch (err) {
    res.status(400).json(err)
  }

}



exports.clubActivo = async (req, res) => {


  try {
    const result = await Club.findAll({
      where: {
        activo: 1
      }

    })
  
    res.status(200).send(result)

  } catch (err) {
    res.status(400).json(err)
  }

}



exports.clubById = async (req, res) => {

  try {
    const idClub = req.params.id

    const result = await Club.findAll({
      include: [
          {
            model: Persona,
            as: 'persona',
            include: [
              {
                model: TipoDocumento,
              as: 'tipoDocument'
              },
              {
               model: Direccion,
                as: 'direccionPersona',
                include: [{
                  model: Provincia,
                  as: 'provincia',
                  include : [{
                      model: Pais,
                      as: 'country'
                  }]
                }],

                }
            ],
          },
          {
            model: Direccion,
            as: 'direccion',
            include : [{
              model: Provincia,
              as : 'provincia',
              include : [{
                model: Pais,
                as : 'country'
              }]
            }]
          }
        ], where: {
          id: idClub,
        }
      },
      )


      if(result.length === 0){
        throw new Error('El club no existe')      

      }


    res.status(200).json(result[0])


  } catch (err) {
    console.log('errorr-----', err)
    res.status(400).json({'error': err.message})
  }

}

exports.clubWithResponsableYDireccion = async (req, res) => {

  try {
    const id = req.params.id

    const listClub = await Club.findByPk(id, {
      include: [
        {
          model: Direccion, as: "direccion",
          model: Persona, as: "persona",
        }
      ]
    })

    res.status(200).json(listClub)

  } catch (err) {
    console.log('errorr-----', err)
    res.status(400).json(err)
  
  }

}


exports.clubEliminar = async (req, res) => {

  try {
    const id = req.params.id

    const club = await Club.findByPk(id)

    if(!club){
      throw new Error('el usuario no existe')
  }

    club.activo = 0

    await club.save()

    res.status(200).json({message:'eliminado correctamente'})

  } catch (err) {
    console.log('errorr-----', err)
    res.status(400).json({'error': err.message})
  }

}



exports.crearClub = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {

    
    if(!req.file) {
      
      throw new Error('debe ingresar una logo el club')
    }

    const { nombre, descripcion, logo, colorPrimario, colorTextoPrimario, colorSecundario,colorTextoSecundario, direccion, responsable } = JSON.parse(req.body.data)
   
   

      
      let imagen = req.file.filename
      console.log(imagen)
 

    const nuevaPersona = await Persona.create({ nombre: responsable.nombre, apellido: responsable.apellido, telefono: responsable.telefono },{ transaction: t })

    const nuevaDireccion = await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia },{ transaction: t })

    const clubNuevo = await Club.create({
     logo: imagen, nombre: nombre, descripcion: descripcion, logo: imagen, colorPrimario: colorPrimario,
      colorTextoPrimario: colorTextoPrimario, colorSecundario: colorSecundario,
      colorTextoSecundario: colorTextoSecundario, direccionId: nuevaDireccion.id, personaId: nuevaPersona.id, activo: 1
    },{ transaction: t })


    await t.commit();

    res.status(200).json({'message': 'club creado'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}

exports.clubEditar = async (req, res) => {


  const t = await db.transaction()


  try {


   


    const id = req.params.id
    
    const { nombre, descripcion, logo, colorPrimario, colorTextoPrimario, colorSecundario, direccion, responsable } = JSON.parse(req.body.data)

    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = logo
    }

    const club = await Club.findByPk(id)

    if (club) {

      await Persona.update({ nombre: responsable.nombre, apellido: responsable.apellido, telefono: responsable.telefono }, { where: { id: club.personaId } , transaction: t })

      await Direccion.update({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia }, { where: { id: club.direccionId }, transaction: t })

      await Club.update({ nombre: nombre, descripcion: descripcion, logo: imagen, colorPrimario: colorPrimario, colorTextoPrimario: colorTextoPrimario, colorSecundario: colorSecundario, direccionId: club.direccionId, personaId: club.personaId, activo: 1 }, { where: { id: club.id }, transaction: t })


    await t.commit();

      res.status(200).json({ "message": "modificado con exito" })

    } else {
      await t.rollback();
      throw new Error('El curso no existe')
    }
  }
  catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }


}


exports.estado = async (req,res) => {
  
  const club = req.params.club
  const estado = req.params.estado
  const usuario = req.params.usuario

   try{

      const result = await ClubXUsuario.findOne({
        where:{
          clubId: club,
          usuarioId:usuario
        }
      })

      if(!result){
        throw new Error('los datos del club o el usuario son incorrectos')
      }
      await ClubXUsuario.update({ estadoId : estado },{ where: { id: result.id }})
      res.status(200).json({'message': 'estado modificado'})

   }catch(err){
     res.status(400).json({'err' : err.message})
   }


}


