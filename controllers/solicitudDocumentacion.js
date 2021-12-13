const SolicitudDocumento = require("../models/SolicitudDocumento")
const moment = require('moment')
const DestinatarioDocumentacion = require("../models/DestinatarioDocumentacion")
const admin = require('firebase-admin')
const db = require('../config/db')
const Documentacion = require('../models/Documentacion')
const EstadoDocumento = require("../models/EstadoDocumento")
const Usuario = require("../models/Usuario")
const Persona = require("../models/Persona")
const Club = require('../models/Club')


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
        let usuario =  req.params.usuario
        


        if(!req.file)throw new Error('La imagen es obligatoria')



          let imagen = req.file.filename


          const solicitudExist = await SolicitudDocumento.findOne({
              where:{
                  id: idSolicitud
              }
          })

          if(!solicitudExist)throw new Error('la solicitud no existe')

          

          const usuarioExist = await Usuario.findOne({
              where:{
                  id: usuario
              }
          })


          if(!usuarioExist)throw new Error('el usuario no existe')

          const resultDocumento = await Documentacion.create({pathFile: `https://api.klubo.club/api/documento/${imagen}`})
          

          await DestinatarioDocumentacion.update({documentacionId:resultDocumento.id,estadodocumentacionId:2},{ where: { solicituddocumentoId: idSolicitud ,usuarioId: usuario} })


     
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
        const usuario =  req.params.usuario

        const result = await EstadoDocumento.findOne({
            where:{
                id: espacio
            }
        })

    
    
        if(!result) throw new Error('el estado ingresado no existe')

        const usuarioExist =  await Usuario.findOne({
            where:{
                id: usuario
            }
        })


        if(!usuarioExist)throw new Error('el usuario no existe')


        const clubExist =  await Club.findOne({
            where:{
                id:club
            }
        })

        if(!clubExist)throw new Error('el club no existe')


        const respuesta  = await DestinatarioDocumentacion.findAll({
            include:[{
                model: SolicitudDocumento,
                as: 'solicituddocumento',
                include:[{
                    model: Usuario,
                    as: 'enviadopor',
                    include:[{
                        model: Persona,
                        as: 'persona'
                    }]
                }]
            }
        ],
            where:{
                clubId: club,
                estadodocumentacionId: espacio,
                usuarioId: usuario
            }
        })

        
   

        res.status(200).json(respuesta)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



exports.getSolicitudById = async(req,res) => {
    try{


   const id = req.params.id


   const resultExist =  await SolicitudDocumento.findOne({
       where:{
           id: id
       }
   })
        
   

   if(!resultExist)throw new Error('el documento no existe')

        res.status(200).json(resultExist)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.eliminarDocumento = async(req,res) => {
    try{


   const solicitud = req.params.solicitud
   const usuario =  req.params.usuario
   const club = req.params.club
    


   const usuarioExist =  await Usuario.findOne({
    where:{
        id: usuario
    }
})


if(!usuarioExist)throw new Error('el usuario no existe')


const clubExist =  await Club.findOne({
    where:{
        id:club
    }
})

if(!clubExist)throw new Error('el club no existe')



    const documentacionExist =  await DestinatarioDocumentacion.findOne({
        where:{
            solicituddocumentoId: solicitud
        }
    })

    if(!documentacionExist)throw new Error('la documentacion no existe')


    


         await DestinatarioDocumentacion.update({documentacionId:null ,estadodocumentacionId: 1},{ where: { solicituddocumentoId: solicitud , usuarioId: usuario , clubId: club} })

        res.status(200).json({message: 'documento eliminado'})

    }catch(err){
        res.status(400).json({error: err.message})
    }
}




exports.getEstados = async(req,res) => {
    try{



        const result =  await EstadoDocumento.findAll()
 


        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}