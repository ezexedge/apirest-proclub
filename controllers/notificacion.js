const Notificacion = require('../models/Notificacion')
const  firebase  = require('./../firebase')
const { getMessaging, getToken } = require("firebase/messaging")
const fetch =  require('isomorphic-fetch')
const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const ClubXUsuario = require('../models/ClubXUsuario')
const ClubXusuario = require('../models/ClubXUsuario')
const EncuestaXClub = require('../models/EncuestaXClub')
const Destinatario = require('../models/Destinatario')
const Pregunta = require('../models/Pregunta')
const Respuesta = require('../models/Respuesta')
const Club = require('../models/Club')
const Usuario = require('../models/Usuario')
const Persona = require('../models/Persona')
const Rol  = require('../models/rol')
const NotificacionXTematica = require('../models/NotificacionXTematica')
const NotificacionXClub = require('../models/NotificacionXClub')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const Encuesta = require('../models/Encuesta')
const NotificacionVistasXUsuarios = require('../models/NotificacionVistasXUsuarios')
const db = require('../config/db')
const admin = require('firebase-admin')
const moment = require('moment')

exports.crear = async(req,res) => {
    try{

        const {titulo,descripcion,fecha} = req.body

        let usuario =  req.auth.userId


        const result  =  await Notificacion.create({titulo:titulo,descripcion:descripcion,fecha:fecha,usuarioId:usuario})
      //  const result = await Notificacion.bulkCreate(req.body)

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    try{

       
        const currentUser = req.auth.userId



        const id = req.params.id

        const result = await Notificacion.findOne({
            include:[{
                model: Usuario,
                as: 'usuario',
                include:[{
                    model: Persona,
                    as: 'persona'
                }]
            }],
            where: {
                id:id,
                activo: 1
            }
        })


  

            let obj = {
                id: result.id,
                titulo: result.titulo,
                descripcion: result.descripcion,
                descripcion_corta: result.descripcion_corta,
                fecha: result.fecha,
                hora: result.hora,
                activo: result.activo,
                enviadoPor: `${result.usuario.persona.nombre} ${result.usuario.persona.apellido}`
            }

       
        
        

        if(!result)throw new Error(`el id ${id} no existe`)

        const visto = await NotificacionVistasXUsuarios.findOne({
            where: {
                usuarioId: currentUser,
                notificacionId: id
            }
        })

        if(!visto){
            await NotificacionVistasXUsuarios.create({ usuarioId: currentUser, notificacionId: id})
        }
        
        res.status(200).json(obj)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}




exports.getAll = async(req,res) => {
    try{

        const result = await Notificacion.findAll({
            include:[{
                model: Rol,
                as: 'rol'
            }],
            where: {
                activo: 1
            },
            order: [['id', 'DESC']]
        })



        let arr = []
        for(let val of result){



            const resultCantidad = await NotXClubXUsuario.findAndCountAll({
                include:[{
                    model: NotificacionXClub,
                    as: 'club',
                    where:{
                        notificacionId: val.id
                    }
                }]
            })

            let obj = {
                activo: val.activo,
                descripcion: val.descripcion,
                descripcion_corta: val.descripcion_corta,
                fecha: val.fecha,
                hora: val.hora,
                rol: val.rol ? val.rol : null,
                rolId: val.rolId,
                titulo: val.titulo,
                cantidad: resultCantidad.count
            }

            arr.push(obj)

        }

        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.eliminar = async (req,res) => {


    try{

        const id = req.params.id

        const result =  await Notificacion.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}

exports.modificar = async (req,res)=> {

    try{

        const id = req.params.id

        const {titulo,descripcion,fecha} = req.body

        const result =  await Notificacion.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        await Notificacion.update({titulo:titulo,descripcion:descripcion,fecha:fecha},{where: {id: result.id}})

        res.status(200).json({message: 'modificacion correcta'})
        
    }catch(err){

        res.status(400).json({error: err.message})


    }

}


exports.sendNotificacion = async (req,res) => {


    const t = await db.transaction()

    try{



        const enviadoPor = req.auth.userId
        const {usuarios,encuesta}  = req.body
        

        console.log('req bodyy',req.body)
        
        const encuestaExiste = await Encuesta.findOne({
            where: {id: encuesta}
        })

        if(!encuestaExiste)throw new Error('La encuesta no existe')
//val
       let arr = []
        let arrDevice = []

    
            for(let usuario of usuarios){
                
                if(usuario.usuario.idDevice !== null && usuario.usuario.idDevice !== ''){
                    arrDevice.push(usuario.usuario.idDevice)
                }
            
                let user = {
                    encuestId: encuesta,
                    usuarioId:  usuario.usuarioId,
                    enviadoporId: enviadoPor
                }
                arr.push(user)
            
                

                
            }

            console.log('el array',arr)
            const destino  = await Destinatario.bulkCreate(arr)
                res.status(200).json({message: 'Encuesta creada'})


                const notification_options = {
                    priority: "high",
                    timeToLive: 60 * 60 * 24
                };
            
            
            
                const message_notification = {
                    notification: {
                        title:  encuestaExiste.titulo ,
                        body: encuestaExiste.descripcion
                    }
                };


                if(arrDevice.length > 0){
                for(let val of arrDevice){
                    const result = await admin.messaging().sendToDevice(val, message_notification, notification_options)
                    console.log('estado de envio de notificacion',result)
            
                }
            }
        
      


    }catch(err){

        await t.rollback();

        res.status(400).json({error: err.message})

    }
   

        /*
        var notification = {
            'title' : 'es un texto',
            'text' : 'es un texto 2'
        }

        var fcm_tokens = []

        var notification_body = {
            'notificacion': notification,
            'registration_ids': fcm_tokens
        }

        fetch('',{
            'method':'POST',
            'headers': {
                'Authorization':'key='+'AAAAgPqhk9E:APA91bEfXPb41WxXUAdH1o16PlS2NoUvnWPFup4qgW72vI6ZoC0bRKDp1N8KUny_VCMRFry-_4sz9z2sd5MrgnVhUBOaWX8LX4LZDQXgvO9CDTnvwcLkab8y95fovD7RqMbgIxffgGUR',
                'Content-Type':'application/json'
            },
            'body': JSON.stringify(notification_body)

        }).then(()=>{
            res.status(200).send('notificacion enviada')
        }).catch((err) =>{
            res.status(400).send(err.message)
      
        })
 

    */
}


exports.getTokenFirebase = async (req,res)=>{
  
    try{

        var registrationToken = 'AIzaSyCNHMaLDTWgvQYzpAcrEXSwKDNAWllFm_A'
        var payload = {
            notification: {
              title: "This is a Notification",
              body: "This is the body of the notification message."
            }
          };
          
           var options = {
            priority: "high",
            timeToLive: 60 * 60 *24
          };

          const result = admin.messaging().sendToDevice(registrationToken, payload, options)

          res.status(200).json(result)

    }catch(err){

        res.status(400).json({error: err.message})


    }
}

//'

exports.crearSuperadmin = async(req,res) => {
    
    const t = await db.transaction()
    try{

     

        let usuario =  req.auth.userId
        
        const {notificacion,usuarios} = req.body



        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


       

        console.log('aqui notificacion',notificacion)
        console.log('aquii usuarios',usuarios)
        const resultNotificacion  =  await Notificacion.create({titulo:notificacion.titulo,descripcion:notificacion.descripcion,descripcion_corta:notificacion.descripcion_corta,hora:hora,usuarioId:usuario},{ transaction: t })
      
        //  const result = await Notificacion.bulkCreate(req.body)

        if(notificacion.tematica){
        let arrTematica = []
        if(notificacion.tematica.length > 0){
            for(let val of notificacion.tematica){
                let obj = {
                    notificacionId: resultNotificacion.id,
                    tematicaId: val.id
                }

                arrTematica.push(obj)
            }
        }
        
        await NotificacionXTematica.bulkCreate(arrTematica,{ transaction: t })
     
    }


        let arrDevices = []

        let arrFinal = []
        let flag = 0
        let result
        for(let val of usuarios){
        if(flag === 0){
          result = await NotificacionXClub.create({clubId: val.clubId,notificacionId: resultNotificacion.id},{ transaction: t })
         flag = 1
        }
        let obj = {
            notificacionxclubId: result.id,
            clubxusuarioId: val.id,
            usuarioId: req.auth.userId
        }


        arrFinal.push(obj)

        if(val.usuario !== null && val.usuario.idDevice !== null &&  val.usuario.idDevice !== '' ){
            arrDevices.push(val.usuario.idDevice)
        }

    }


    console.log('arrrfinal',arrFinal)


    console.log('aca los iddevices',arrDevices)



    

    await NotXClubXUsuario.bulkCreate(arrFinal,{ transaction: t })
      


    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };



    const message_notification = {
        notification: {
            title:  notificacion.titulo ,
            body: notificacion.descripcion
        }
    };

    for(let val of  arrDevices) {

       const result = await admin.messaging().sendToDevice(val, message_notification, notification_options)
        console.log('estado de envio de notificacion',result)

    }
        


      await t.commit();

        res.status(200).json({message: 'enviadooo',notificacionId: resultNotificacion})


    }catch(err){

       await t.rollback();

        res.status(400).json({error: err.message})
    }
}


exports.getNotificacionVistas = async(req,res) => {
    try{

       
        const id = req.params.id


        const notificacion = await Notificacion.findByPk(id)

        if(!notificacion)throw new Error('La notificacion no existe')

        const result = await NotificacionVistasXUsuarios.findAll({
            include : [{
                model: Usuario,
                as: 'usuario',
                include: [{
                    model: Persona,
                    as: 'persona'
                }]
            }],
            where: {
                notificacionId : id
            }
        })

        
        
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



exports.getNotificacionLeida = async(req,res) => {
    try{

       
        const id = req.params.notificacion
        const user = req.auth.userId

        const notificacion = await Notificacion.findByPk(id)

        if(!notificacion)throw new Error('La notificacion no existe')

        const result = await NotificacionVistasXUsuarios.findOne({
            where: {
                usuarioId: user,
                notificacionId: id
            }
        })

        let respuesta = false
        if(result){
            respuesta = true
        }
        
        res.status(200).json({message : respuesta})

    }catch(err){
        res.status(400).json({error: err.message})
    }
}





exports.sendEncuesta = async (req,res) => {


  //  const t = await db.transaction()

    try{


        const club = req.params.club
        const enviadoPor = req.auth.userId
        const {titulo,descripcion,preguntasRespuesta,usuarios}  = req.body
        

        console.log('req bodyy',req.body)


        const clubExist = Club.findOne({
            where: {
                id: club
            }
        })

        if(!clubExist)throw new Error('El club no existe')


        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


        const resultEncuesta  =  await Encuesta.create({titulo:titulo,descripcion:descripcion,activo:1,hora:hora})

        for(let val of preguntasRespuesta){

            if(val.respuestas.length > 0){
                
                const resultPregunta  =  await Pregunta.create({titulo: val.pregunta , encuestaId: resultEncuesta.id,activo: 1})

                    let arr = []

                    for(let val2 of val.respuestas){
                        let obj = {
                            titulo: val2.pregunta,
                            activo:1,
                            preguntaId: resultPregunta.id
                        }
                        arr.push(obj)
                    }

                    //bulkcreate de la respuesta
                     await Respuesta.bulkCreate(arr)



           
            }


        }



 
//val
       let arr = []
        let arrDevice = []

    
            for(let usuario of usuarios){
                
                if(usuario.usuario.idDevice !== null && usuario.usuario.idDevice !== ''){
                    arrDevice.push(usuario.usuario.idDevice)
                }
            
                let user = {
                    encuestId: resultEncuesta.id,
                    usuarioId:  usuario.usuarioId,
                    enviadoporId: enviadoPor
                }
                arr.push(user)
            
                

                
            }

            console.log('el array',arr)
            const destino  = await Destinatario.bulkCreate(arr)
                res.status(200).json(resultEncuesta)

                await EncuestaXClub.create({clubId:club,encuestaId: resultEncuesta.id})
//dddd

                const notification_options = {
                    priority: "high",
                    timeToLive: 60 * 60 * 24
                };
            
            
            
                const message_notification = {
                    notification: {
                        title:  titulo ,
                        body: descripcion
                    }
                };


                if(arrDevice.length > 0){
                for(let val of arrDevice){
                    const result = await admin.messaging().sendToDevice(val, message_notification, notification_options)
                    console.log('estado de envio de notificacion',result)
            
                }
            }
        
      


    }catch(err){

     //   await t.rollback();

        res.status(400).json({error: err.message})

    }
   


}



exports.sendEncuestaSuperadmin = async (req,res) => {


    //  const t = await db.transaction()
  
      try{
  
  
  
          const enviadoPor = req.auth.userId
          const {titulo,descripcion,preguntasRespuesta,usuarios}  = req.body
          
  
          console.log('req bodyy',req.body)
  
          const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')

          const resultEncuesta  =  await Encuesta.create({titulo:titulo,descripcion:descripcion,activo:1,hora:hora})
  
          for(let val of preguntasRespuesta){
  
              if(val.respuestas.length > 0){
                  
                  const resultPregunta  =  await Pregunta.create({titulo: val.pregunta , encuestaId: resultEncuesta.id,activo: 1})
  
                      let arr = []
  
                      for(let val2 of val.respuestas){
                          let obj = {
                              titulo: val2.pregunta,
                              activo:1,
                              preguntaId: resultPregunta.id
                          }
                          arr.push(obj)
                      }
  
                      //bulkcreate de la respuesta
                       await Respuesta.bulkCreate(arr)
  
  
  
             
              }
  
  
          }
  
  
  
   
  //val
         let arr = []
          let arrDevice = []
  
      
              for(let usuario of usuarios){
                  
                  if(usuario.usuario.idDevice !== null && usuario.usuario.idDevice !== ''){
                      arrDevice.push(usuario.usuario.idDevice)
                  }
              
                  let user = {
                      encuestId: resultEncuesta.id,
                      usuarioId:  usuario.usuarioId,
                      enviadoporId: enviadoPor
                  }
                  arr.push(user)
              
                  
  
                  
              }
  
              console.log('el array',arr)
              const destino  = await Destinatario.bulkCreate(arr)
                  res.status(200).json({message: 'Encuesta creada'})
  
  
                  const notification_options = {
                      priority: "high",
                      timeToLive: 60 * 60 * 24
                  };
              
              
              
                  const message_notification = {
                      notification: {
                          title:  titulo ,
                          body: descripcion
                      }
                  };
  
  
                  if(arrDevice.length > 0){
                  for(let val of arrDevice){
                      const result = await admin.messaging().sendToDevice(val, message_notification, notification_options)
                      console.log('estado de envio de notificacion',result)
              
                  }
              }
          
        
  
  
      }catch(err){
  
       //   await t.rollback();
  
          res.status(400).json({error: err.message})
  
      }
     
  
  
  }
  