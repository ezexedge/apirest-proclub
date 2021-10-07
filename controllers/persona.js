const Persona = require('../models/Persona')
const Usuario = require('../models/Usuario')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXusuario = require('../models/ClubXUsuario')
const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const RelPosXUsarioXDiviXDep  = require('../models/RelPosXUsarioXDiviXDep')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const db = require('../config/db')
const admin = require("firebase-admin")
const firebase = require('../firebase')
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
    const { nombre, apellido, telefono, correo, fechaNacimiento, idClub, rol, documento, tipoDocumentId, sexo, direccion,    deporte,division,posicion  , cp} = valores

     console.log('////////////ss',nombre,apellido,rol)
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = ''
    }

    
    const resultCorreo = await Persona.findOne({
      where: {correo: correo}
    })


    if(resultCorreo)throw new Error('el correo esta registrado ingrese otro')


    const aprobado = await Estados.findOne({where:{ nombre : 'aprobado' }})
    if(!aprobado){
      throw new Error('no existe el estado aprobado en la base de datos')
    }


    const resp = await admin.auth().listUsers()

    //console.log('respuestaaaaa',resp)

    const encontrado = resp.users.find(obj => obj.email === correo)
    
    if(encontrado){
       
      throw new Error('El email esta registrado')
    
    }

    const config = {
      url: 'http://localhost:3000/#/complete-registration',
      handleCodeInApp: true
  };

const result = await firebase.default.auth().sendSignInLinkToEmail(correo,config)
 //signInWithEmailLink(correo,"http://localhost:8000/api/agregar-usuario")
    console.log('guardando respuesta',result)
              


 


    const nuevaDireccion = await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia ,cp: cp },{ transaction: t })

    const nuevaPersona = await Persona.create({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumentId, direccionPersonaId: nuevaDireccion.id, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: documento ,avatar : imagen },{ transaction: t })
  
    const nuevoUsuario = await Usuario.create({ personaId: nuevaPersona.id , activo: 1, ultimoIngreso: idClub },{ transaction: t })

    const resultclubxusuario =   await ClubXusuario.create({  rolId: rol, clubId: idClub, usuarioId: nuevoUsuario.id , activo: 1, estadoId: aprobado.id  },{ transaction: t })






    const resultDisciplinaXClub = await RelDisciplinaXClub.findOne({
      where:{
          clubId: idClub,
          disciplinaId: deporte
      }
  })


  if(!resultDisciplinaXClub)throw new Error('la disciplina no esta relacionada con el club')

  //disxclubxdiv
  const resultDisXClubXDiv = await RelDisXClubXDiv.findOne({
      where: {
          id: division            }
  })

  let divisionFinal = null

  if(resultDisXClubXDiv && resultDisXClubXDiv.id){
      divisionFinal = resultDisXClubXDiv.id
  }

  //disciplinaxclubxpos
  const resultDisXClubXPos = await DisciplinaXClubXPos.findOne({
      where:{
          disciplinaxposId: posicion
      }
  })

  let posicionFinal = null
  if(resultDisXClubXPos && resultDisXClubXPos.id){
      posicionFinal = resultDisXClubXPos.id
  }






    await RelPosXUsarioXDiviXDep.create({clubxusuarioId: resultclubxusuario.id ,disxclubxdivId: divisionFinal , disciplinaxclubxposId: posicionFinal  })





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

    

    const resultPersona = await Persona.findByPk(result.personaId)

 
   

console.log('resultpersona',resultPersona)

let valores = JSON.parse(req.body.data)

const { nombre, apellido, telefono, correo, fechaNacimiento, idClub, rol, documento, tipoDocumentId, sexo, direccion,    deporte,categoria } = valores
    
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = resultPersona.avatar
    } 
    
    await Persona.update({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumentId, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: documento ,avatar : imagen },{where: {id: result.personaId},  transaction: t})


    if(resultPersona.direccionPersonaId === null){
    const resultDireccion =   await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provinciaId , cp: direccion.cp },  {transaction: t})
      await Persona.update({ direccionPersonaId: resultDireccion.id },{where: {id: result.personaId},  transaction: t})

    }
  await Direccion.update({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provinciaId , cp: direccion.cp },{where: {id: resultPersona.direccionPersonaId},  transaction: t})

   


   await t.commit();
 
   res.status(200).json({ "message": "modificado con exito" })

  } catch (err) {
    console.log('error', err)

    await t.rollback();
    res.status(400).json({ "error": err.message })

  }

};