const Persona = require('../models/Persona')
const Usuario = require('../models/Usuario')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXusuario = require('../models/ClubXUsuario')
const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const db = require('../config/db')
const admin = require("firebase-admin")
const Estados = require('../models/Estados')

exports.personaTodos = async (req, res) => {


  try {
    const result = await Persona.findAll()

    res.status(200).json(result)

  } catch (error) {
    console.log(error);
  }

}


exports.personaById = async (req, res) => {


  try {



    const id = req.params.id

    const result = await Persona.findByPk(id)

    res.status(200).json(result)

  } catch (error) {
    console.log(error);
  }


}

exports.personaWhitDireccionById = async (req, res) => {


  try {


    const id = req.params.id
    console.log(id);
    const persona = await Persona.findByPk(id, {
      include: [
        {
          model: TipoDocumento, as: "tipoDocument"
        },
        {
          model: Direccion, as: "direccionPersona"
        }
      ]
    })

    res.status(200).json(persona)

  } catch (error) {
    res.status(500).send("Hubo un error");
    console.log(error);
  }


}


exports.crearPersona = async (req, res) => {

  const t = await db.transaction()

  try {

  if(!req.file) {
      throw new Error('debe ingresar una imagen')
    }
  


    let valores = JSON.parse(req.body.data)
    const { nombre, apellido, telefono, correo, fechaNacimiento, idClub, rol, documento, tipoDocumentId, sexo, direccion,    deporte,categoria  , cp} = valores

     console.log('////////////ss',nombre,apellido,rol)
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = ''
    }

    
    const aprobado = await Estados.findOne({where:{ nombre : 'aprobado' }})
    if(!aprobado){
      throw new Error('no existe el estado aprobado en la base de datos')
    }


    const nuevaDireccion = await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia ,cp: cp },{ transaction: t })

    const nuevaPersona = await Persona.create({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumentId, direccionPersonaId: nuevaDireccion.id, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: documento ,avatar : imagen },{ transaction: t })
  
    const nuevoUsuario = await Usuario.create({ personaId: nuevaPersona.id , activo: 1, ultimoIngreso: idClub },{ transaction: t })

    const clubxusuarioId =  await ClubXusuario.create({  rolId: rol, clubId: idClub, usuarioId: nuevoUsuario.id , activo: 1, estadoId: aprobado.id  },{ transaction: t })

     await RelUsuarioXDis.create({disciplinaxclubId:deporte , clubxusuarioId: clubxusuarioId.id},{ transaction: t })

    //await RelUsuarioXCatXDis.create({disxclubxcatId: categoria,clubxusuarioId:clubxusuarioId.id},{ transaction: t })
    

    /*  const rta = await admin.auth().createUser({
        email: 'desarrollo@texdinamo.com',
        password: 'admin123'                 
      })
      console.log(rta);

      await admin.auth().setCustomUserClaims(rta.uid, { role: 'SuperAdmin' }) */

    await t.commit();

   
  res.status(200).json({ "message": 'agregado correctamente' })

  } catch (err) {
    
    await t.rollback();
    
    
    res.status(400).json({ "error": err.message })

  }

};




exports.ModificarPersona = async (req, res) => {


  const t = await db.transaction()

  try {

    const clubParams = req.params.club
    const usuarioParams = req.params.usuario
  
    const result = await ClubXusuario.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          include : [
            {
              model: Persona,
              as: 'persona'
            }
          ]
        }
      ],

      where: {
          usuarioId: usuarioParams,
          clubId: clubParams
        }  
    })

    if(result.length === 0){
      throw new Error('el usuario no existe')
    }

console.log('sssssss',JSON.parse(req.body.data))



    const { nombre, apellido, telefono, correo, fechaNacimiento, rol, numeroDocumento, tipoDocumento, sexo, direccion ,avatar } = JSON.parse(req.body.data)
    
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = avatar
    } 
    
    await Persona.update({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumento, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: numeroDocumento ,avatar : imagen },{where: {id: result[0].usuario.personaId},  transaction: t})

  await Direccion.update({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia },{where: {id: result[0].usuario.persona.direccionPersonaId},  transaction: t})

  await Usuario.update({ rolId: rol, personaId: result[0].usuario.personaId  },{ where: { id: result[0].usuarioId }, transaction: t })
   

    /*  const rta = await admin.auth().createUser({
        email: 'desarrollo@texdinamo.com',
        password: 'admin123'                 
      })
      console.log(rta);

      await admin.auth().setCustomUserClaims(rta.uid, { role: 'SuperAdmin' }) */

   // res.status(200).json({ "message": 'agregado correctamente' })

   await t.commit();

   res.status(200).json({ "message": "modificado con exito" })

  } catch (err) {
    console.log('error', err)

    await t.rollback();
    res.status(400).json({ "error": err.message })

  }

};