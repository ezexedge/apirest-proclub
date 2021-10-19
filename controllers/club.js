
const Club = require('../models/Club')
const db = require('../config/db')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXUsuario = require('../models/ClubXUsuario')
const Pais = require('../models/Pais')
const ClubXusuario = require('../models/ClubXUsuario')
const Provincia = require('../models/Provincia')
const Usuario = require('../models/Usuario')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const Reserva = require('../models/Reservas')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const Rol = require('../models/rol')

exports.clubTodos = async (req, res) => {


  try {
    const result = await Club.findAll({
      include: [
        {
          model: Persona,
          as: 'persona',
      
        },
      {
        model: Direccion,
        as: 'direccion'
      }],   
      where: {
        activo: 1
      },
      order: [['id', 'DESC']]
    
    })

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

    res.status(200).json({message: 'club eliminado'})

  } catch (err) {
    console.log('errorr-----', err)
    res.status(400).json({'error': err.message})
  }

}



exports.crearClub = async (req, res) => {
  

 
  const t = await db.transaction()

  try {

  /*
    if(!req.file) {
      throw new Error('debe ingresar una imagen')
    }

        console.log( JSON.parse(req.body.data))
    let imagen = req.file.filename
    console.log(imagen)
*/
    const { descripcion, nombre ,logo, colorPrimario, colorTextoPrimario, colorSecundario,colorTextoSecundario, direccion, responsable , email , telefono , cuit ,instagram,facebook,twitter,nombre_visible , cp  } = JSON.parse(req.body.data)
  

    if(logo === null){
      throw new Error('debe ingresar una imagen')

    }

    const nuevaPersona = await Persona.create({ nombre: responsable.nombre, apellido: responsable.apellido, telefono: responsable.telefono, correo: responsable.correo },{ transaction: t })

    const nuevaDireccion = await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia },{ transaction: t })

     await Club.create({
     logo: logo, nombre: nombre, descripcion: descripcion, colorPrimario: colorPrimario,
      colorTextoPrimario: colorTextoPrimario, colorSecundario: colorSecundario,
      colorTextoSecundario: colorTextoSecundario, direccionId: nuevaDireccion.id, personaId: nuevaPersona.id, activo: 1 , email: email
 , telefono: telefono , cuit: cuit  ,instagram: instagram,facebook:facebook,twitter:twitter, nombre_visible: nombre_visible , cp: cp  },{ transaction: t })


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
    
    const { descripcion, nombre ,logo, colorPrimario, colorTextoPrimario, colorSecundario,colorTextoSecundario, direccion,  email , telefono , cuit ,instagram,facebook,twitter,nombre_visible , cp   } = JSON.parse(req.body.data)

    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = logo
    }

    const club = await Club.findByPk(id)

    if (club) {

    //  await Persona.update({ nombre: responsable.nombre, apellido: responsable.apellido, telefono: responsable.telefono, correo: responsable.correo } , transaction: t })

      await Direccion.update({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia }, { where: { id: club.direccionId }, transaction: t })

      await Club.update({
        logo: logo, nombre: nombre, descripcion: descripcion, colorPrimario: colorPrimario,
         colorTextoPrimario: colorTextoPrimario, colorSecundario: colorSecundario,
         colorTextoSecundario: colorTextoSecundario , email: email
    , telefono: telefono , cuit: cuit  ,instagram: instagram,facebook:facebook,twitter:twitter, nombre_visible: nombre_visible , cp: cp  }, { where: { id: club.id }, transaction: t })


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






exports.clubEstadistica = async (req, res) => {

  try {
    const id = req.params.club

    const resultUsuarios = await ClubXusuario.findAndCountAll({
      include:[{
        model: Usuario,
        as: 'usuario',
        where:{
          activo: 1
        }
      }],
      where:{
        clubId: id,
        activo: 1
      }
    })


    const resultDisciplinas = await RelDisciplinaXClub.findAndCountAll({
       include:[{
         model: Disciplina,
         as: 'disciplina',
         where:{
           activo: 1
         }
       }],
       where:{
          clubId: id,
          activo: 1
       }
    })

    const resultTurnos = await Reserva.findAndCountAll({
      include: [{
        model: RelDisciplinaXClub,
        as: 'disciplinaxclub',
        where: {
          clubId: id
        }
      }]
    })

    const resultNotificaciones = await NotXClubXUsuario.findAndCountAll({
        include: [{
          model: ClubXUsuario,
          as: 'clubxusuario',
          where:{
            clubId: id
          }
        }]
    })


    
    let obj = {
      usuarios: resultUsuarios.count,
      deportes: resultDisciplinas.count,
      turnos: resultTurnos.count,
      notificaciones: resultNotificaciones.count
    }

    res.status(200).json(obj)

  } catch (err) {
    console.log('errorr-----', err)
    res.status(400).json(err)
  
  }

}






exports.agregarAdministrador = async (req,res) => {
  
  const club = req.params.club
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
      
      const resultRoles = await Rol.findOne({
        where:{
          nombre: 'admin'
        }
      })
      
      if(!resultRoles)throw new Error('no contienes el rol admin en la base de datos')


      await ClubXUsuario.update({ rolId : resultRoles.id, rolanteriorId:result.rolId },{ where: { id: result.id }})
      
      res.status(200).json({'message': 'usuario agregado como admin'})

   }catch(err){
     res.status(400).json({'err' : err.message})
   }


}



exports.eliminarAdministrador = async (req,res) => {
  
  const club = req.params.club
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
      
     
      
  

      await ClubXUsuario.update({ rolId : result.rolanteriorId, rolanteriorId: null },{ where: { id: result.id }})
      
      res.status(200).json({'message': 'usuario eliminado desde el admin'})

   }catch(err){
     res.status(400).json({'err' : err.message})
   }


}
