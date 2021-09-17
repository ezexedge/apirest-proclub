const Notificacion = require('../models/Notificacion')
const  firebase  = require('./../firebase')
const { getMessaging, getToken } = require("firebase/messaging")
const fetch =  require('isomorphic-fetch')
const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const ClubXUsuario = require('../models/ClubXUsuario')
const ClubXusuario = require('../models/ClubXUsuario')
const Destinatario = require('../models/Destinatario')
const Usuario = require('../models/Usuario')
const Persona = require('../models/Persona')
const NotificacionXTematica = require('../models/NotificacionXTematica')
const NotificacionXClub = require('../models/NotificacionXClub')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const NotificacionVistasXUsuarios = require('../models/NotificacionVistasXUsuarios')
const db = require('../config/db')
const admin = require('firebase-admin')

exports.crear = async(req,res) => {
    try{

        const {titulo,descripcion,fecha} = req.body

        const result  =  await Notificacion.create({titulo:titulo,descripcion:descripcion,fecha:fecha})
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
            where: {
                id:id,
                activo: 1
            }
        })

        if(!result)throw new Error(`el id:${id} no existe`)

        const visto = await NotificacionVistasXUsuarios.findOne({
            where: {
                usuarioId: currentUser,
                notificacionId: id
            }
        })

        if(!visto){
            await NotificacionVistasXUsuarios.create({ usuarioId: currentUser, notificacionId: id})
        }
        
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}




exports.getAll = async(req,res) => {
    try{

        const result = await Notificacion.findAll({
            where: {
                activo: 1
            },
            order: [['id', 'DESC']]
        })
        res.status(200).json(result)

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

    try{



        const enviadoPor = req.auth.userId
        const {usuarios,encuesta}  = req.body

//val
       let arr = []


    
            for(let usuario of usuarios){
                
                let user = {
                    encuestId: encuesta,
                    usuarioId:  usuario.usuarioId,
                    enviadoporId: enviadoPor
                }
                arr.push(user)

                

                
            }

            const destino  = await Destinatario.bulkCreate(arr)
                res.status(200).json(destino)


        
      


    }catch(err){

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

     

        const {notificacion,usuarios} = req.body




        

        console.log('aqui notificacion',notificacion)
        console.log('aquii usuarios',usuarios)
        const resultNotificacion  =  await Notificacion.create({titulo:notificacion.titulo,descripcion:notificacion.descripcion,descripcion_corta:notificacion.descripcion_corta},{ transaction: t })
      
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




