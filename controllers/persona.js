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
//ver luego el error
  //   await RelUsuarioXDis.create({disciplinaxclubId:deporte , clubxusuarioId: clubxusuarioId.id},{ transaction: t })

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

    const usuarioParams = req.params.usuario
  
    const result = await Usuario.findByPk(usuarioParams)
    if(!result)throw new Error('el usuario no existe')

    if(result.length === 0){
      throw new Error('el usuario no existe')
    }

    const resultPersona = await Persona.findByPk(result.personaId)

 
   

console.log('sssssss',JSON.parse(req.body.data))


let valores = JSON.parse(req.body.data)

const { nombre, apellido, telefono, correo, fechaNacimiento, idClub, rol, documento, tipoDocumentId, sexo, direccion,    deporte,categoria } = valores
    
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = resultPersona.avatar
    } 
    
    await Persona.update({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumentId, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: documento ,avatar : imagen },{where: {id: result.personaId},  transaction: t})

  await Direccion.update({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia , cp: direccion.cp },{where: {id: resultPersona.direccionPersonaId},  transaction: t})

   


   await t.commit();
 
   res.status(200).json({ "message": "modificado con exito" })

  } catch (err) {
    console.log('error', err)

    await t.rollback();
    res.status(400).json({ "error": err.message })

  }

};