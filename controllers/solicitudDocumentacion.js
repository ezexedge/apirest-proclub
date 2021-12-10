const SolicitudDocumento = require("../models/SolicitudDocumento")
const moment = require('moment')
const DestinatarioDocumentacion = require("../models/DestinatarioDocumentacion")
const admin = require('firebase-admin')

exports.crearSolicitud = async(req,res) => {
    
    const t = await db.transaction()
    try{

     

        let usuario =  req.auth.userId
        
        const {notificacion,usuarios} = req.body



        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


       

        console.log('aqui notificacion',notificacion)
        console.log('aquii usuarios',usuarios)
        const resultNotificacion  =  await SolicitudDocumento.create({titulo:notificacion.titulo,descripcion:notificacion.descripcion,hora:hora,enviadoporId:usuario},{ transaction: t })
      
  


        let arrDevices = []

        let flag = 0
        let result
        for(let val of usuarios){
        if(flag === 0){
          result = await DestinatarioDocumentacion.create({solicituddocumentoId: resultNotificacion.id,clubId: val.clubId,usuarioId:val.usuarioId,documentacionId:null,estadodocumentacionId:3},{ transaction: t })
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
            title:  notificacion.titulo ,
            body: notificacion.descripcion
        },
        data:{
            idNoti: 'prueba'

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
