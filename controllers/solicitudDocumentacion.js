const SolicitudDocumento = require("../models/SolicitudDocumento")
const moment = require('moment')
const DestinatarioDocumentacion = require("../models/DestinatarioDocumentacion")
const admin = require('firebase-admin')
const db = require('../config/db')
const Documentacion = require('../models/Documentacion')
const EstadoDocumento = require("../models/EstadoDocumento")


exports.crearSolicitud = async(req,res) => {
    
    const t = await db.transaction()
    try{

     

        let usuario =  req.auth.userId
        
        const {solicitud,usuarios} = req.body



        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


       

        const resultNotificacion  =  await SolicitudDocumento.create({titulo:solicitud.titulo,descripcion:solicitud.descripcion,hora:hora,enviadoporId:usuario},{ transaction: t })
      
  


        let arrDevices = []

        let flag = 0
        let result
        for(let val of usuarios){
        if(flag === 0){
          result = await DestinatarioDocumentacion.create({solicituddocumentoId: resultNotificacion.id,clubId: val.clubId,usuarioId:val.usuarioId,documentacionId:null,estadodocumentacionId:1},{ transaction: t })
         flag = 1
        }



        if( val.usuarioId !== req.auth.userId){

     


            if(val.usuario !== null && val.usuario.idDevice !== null &&  val.usuario.idDevice !== '' ){
                arrDevices.push(val.usuario.idDevice)
            }

        }

     



      

    }


 
      


    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


  //  let idString = resultNotificacion.id
   // let idModificado = idString.toString()

    const message_notification = {
        notification: {
            title:  solicitud.titulo ,
            body: solicitud.descripcion
        },
        data:{
            idSolicitud: 'prueba'

           // idNoti: idModificado
        }
    };

         
  



    console.log('aaaaarrr====',arrDevices)
    for(let val of  arrDevices) {

       const result = await admin.messaging().sendToDevice(val, message_notification, notification_options)
        console.log('estado de envio de notificacion',result)

    }
        


      await t.commit();

        res.status(200).json({message: 'enviadooo'})


    }catch(err){

       await t.rollback();

        res.status(400).json({error: err.message})
    }
}



exports.cargarDocumento = async(req,res) => {
    
    try{

     

        let idSolicitud = req.params.solicitud
        


        if(!req.file)throw new Error('La imagen es obligatoria')



          let imagen = req.file.filename


          const solicitudExist = await SolicitudDocumento.findOne({
              where:{
                  id: idSolicitud
              }
          })

          if(!solicitudExist)throw new Error('la solicitud no existe')

          const resultDocumento = await Documentacion.create({pathFile: `https://api.klubo.club/api/image/${imagen}`})
          

          await DestinatarioDocumentacion.update({documentacionId:resultDocumento.id,estadodocumentacionId:2},{ where: { solicituddocumentoId: idSolicitud} })


     
        res.status(200).json({message: 'enviadooo'})


    }catch(err){

   ;

        res.status(400).json({error: err.message})
    }
}

exports.getByEstado = async(req,res) => {
    try{


        const espacio = req.params.estado
        const club = req.params.club

        const result = await EstadoDocumento.findOne({
            where:{
                id: espacio
            }
        })

    
    
        if(!result) throw new Error('el estado ingresado no existe')


        const respuesta  = await DestinatarioDocumentacion.findAll({
            where:{
                clubId: club,
                estadodocumentacionId: espacio
            }
        })

        res.status(200).json(respuesta)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}
