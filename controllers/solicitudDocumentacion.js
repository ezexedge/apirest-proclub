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
const Categoria = require("../models/Categoria")
const CategoriaDocumentacion = require("../models/CategoriaDocumentacion")
const SolicitudXDocumentos = require("../models/SolicitudXDocumentos")
const _ = require('lodash');


exports.crearSolicitud = async(req,res) => {
    
    const t = await db.transaction()
    try{

     

        let usuario =  req.auth.userId
        
        const {solicitud,usuarios} = req.body



        const categoriaExist = await CategoriaDocumentacion.findOne({
            where:{
                id: solicitud.categoria
            }
        })

        if(!categoriaExist)throw new Error('la categoria no existe')


        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


       

        const resultNotificacion  =  await SolicitudDocumento.create({titulo:solicitud.titulo,descripcion:solicitud.descripcion,hora:hora,enviadoporId:usuario,categoriadocumentoId: solicitud.categoria},{ transaction: t })
      
  


        let arrDevices = []

        let flag = 0
        let result
        for(let val of usuarios){
     
          result = await DestinatarioDocumentacion.create({solicituddocumentoId: resultNotificacion.id,clubId: val.clubId,usuarioId:val.usuarioId,documentacionId:null,estadodocumentacionId:1},{ transaction: t })
      



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
  
        //ss

        
        console.log('filleee',req)
        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


        if(!req.files)throw new Error('debe cargar un archivo')





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


          for(let val of req.files){

            let resultDocumento = await Documentacion.create({ titulo:val.originalname ,pathFile: `https://api.klubo.club/api/documento/${val.filename}`})
            await SolicitudXDocumentos.create({solicituddocumentoId: idSolicitud, documentacionId: resultDocumento.id , usuarioId: usuario,hora:hora })

          }

          

          await DestinatarioDocumentacion.update({estadodocumentacionId:2},{ where: { solicituddocumentoId: idSolicitud ,usuarioId: usuario} })


     
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
                usuarioId: usuario
            },
            order: [['id', 'DESC']]
        })



       let respuestaClone  = _.clone(respuesta);

        let pepa 

        if(Number(req.params.estado) === 3){


            let arr = []

            for(let val of respuestaClone){

                let encontrado = _.find(arr, { 'solicituddocumentoId': val.solicituddocumentoId });
                if(!encontrado){

                    let obj = {
                        solicituddocumentoId: val.solicituddocumentoId,
                        titulo: val && val.solicituddocumento && val.solicituddocumento.titulo,
                        descripcion: val && val.solicituddocumento && val.solicituddocumento.descripcion,
                        fecha: val && val.solicituddocumento && val.solicituddocumento.fecha,
                        hora: val && val.solicituddocumento && val.solicituddocumento.hora,
                        enviadopor: val && val.solicituddocumento && val.solicituddocumento.enviadopor && val.solicituddocumento.enviadopor.persona && `${val.solicituddocumento.enviadopor.persona.nombre} ${val.solicituddocumento.enviadopor.persona.apellido}`



                    }

                    arr.push(obj)
                }
            }

            pepa = arr

        }else{
     
            pepa = respuestaClone.filter(val => val.estadodocumentacionId ===  Number(req.params.estado) )


        }

        
   

        res.status(200).json(pepa)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



exports.getSolicitudById = async(req,res) => {
    try{


   const club = req.params.club
   const usuario = req.params.usuario
   const solicitud = req.params.solicitud





   const result =  await DestinatarioDocumentacion.findOne({
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
           },{
               model: CategoriaDocumentacion,
               as: 'categoriadocumento'
           }]
       },{
           model: Usuario,
           as: 'usuario',
           include:[{
               model: Persona,
               as: 'persona'
           }]
       },{
           model: EstadoDocumento,
           as: 'estadodocumentacion'
       }],
       where:{
        solicituddocumentoId: solicitud,
        clubId: club,
        usuarioId: usuario
       }
   })



   const resultDocumentos = await SolicitudXDocumentos.findAll({
       include: [{
           model: Documentacion,
           as: 'documentacion'
       }],
       where:{
        usuarioId: usuario,
        solicituddocumentoId: solicitud
       }
   })


   let arr = []
   for(let val of resultDocumentos){
       arr.push(val.documentacion)
   }


   let obj = {
       titulo : result && result.solicituddocumento &&  result.solicituddocumento.titulo,
       decripcion: result && result.solicituddocumento && result.solicituddocumento.descripcion,
       fecha: result && result.solicituddocumento && result.solicituddocumento.fecha,
       hora: result && result.solicituddocumento && result.solicituddocumento.hora,
       enviadopor: result && result.solicituddocumento && result.solicituddocumento.enviadopor && result.solicituddocumento.enviadopor.persona && `${result.solicituddocumento.enviadopor.persona.nombre} ${result.solicituddocumento.enviadopor.persona.apellido}`,
       categoria : result && result.solicituddocumento && result.solicituddocumento.categoriadocumento && result.solicituddocumento.categoriadocumento.nombre,
       documentacionDe: result && result.usuario && result.usuario.persona && `${result.usuario.persona.nombre} ${result.usuario.persona.apellido}`,
       estadoDocumentacion: result && result.estadodocumentacion && result.estadodocumentacion.nombre,
       documentacion: arr
    }


   
     res.status(200).json(obj)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.eliminarDocumento = async(req,res) => {
    try{


   const solicitud = req.params.solicitud
   const usuario =  req.params.usuario
   const club = req.params.club
   const documento = req.params.documento
    


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



    const resultDocumento = await Documentacion.findOne({
        where: {
            id: documento
        }
    })

    if(!resultDocumento)throw new Error('la documentacion no existe')



    await SolicitudXDocumentos.destroy({
        where:{
            documentacionId: documento
        }
    })


       await Documentacion.destroy({
           where:{
               id: documento
           }
       })


    
        const totalDocumentos = await SolicitudXDocumentos.findAndCountAll({
            where:{
                solicituddocumentoId: solicitud,
                usuarioId: usuario
            }
        })

        if(totalDocumentos.count === 0){
            await DestinatarioDocumentacion.update({estadodocumentacionId: 1},{ where: { solicituddocumentoId: solicitud , usuarioId: usuario , clubId: club} })

        }


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





exports.aprobado = async(req,res) => {
    try{


   const solicitud = req.params.solicitud
   const usuario =  req.params.usuario
    


   const usuarioExist =  await Usuario.findOne({
    where:{
        id: usuario
    }
})


if(!usuarioExist)throw new Error('el usuario no existe')





    const documentacionExist =  await DestinatarioDocumentacion.findOne({
        where:{
            solicituddocumentoId: solicitud,
            usuarioId:usuario
        }
    })

    if(!documentacionExist)throw new Error('la documentacion no existe')


    


         await DestinatarioDocumentacion.update({estadodocumentacionId: 3},{ where: { solicituddocumentoId: solicitud , usuarioId: usuario } })

        res.status(200).json({message: 'aprobado'})

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.rechazado = async(req,res) => {
    try{


   const solicitud = req.params.solicitud
   const usuario =  req.params.usuario
    


   const usuarioExist =  await Usuario.findOne({
    where:{
        id: usuario
    }
})


if(!usuarioExist)throw new Error('el usuario no existe')





    const documentacionExist =  await DestinatarioDocumentacion.findOne({
        where:{
            solicituddocumentoId: solicitud,
            usuarioId:usuario
        }
    })

    if(!documentacionExist)throw new Error('la documentacion no existe')


    


         await DestinatarioDocumentacion.update({estadodocumentacionId: 1},{ where: { solicituddocumentoId: solicitud , usuarioId: usuario } })

        res.status(200).json({message: 'rechazado'})

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



exports.getEnviadasByEstado = async(req,res) => {
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

        let arr = []


        if(espacio === null){


            const respuesta  = await DestinatarioDocumentacion.findAll({
                include:[{
                    model: SolicitudDocumento,
                    as: 'solicituddocumento',
                    include:[{
                        model: Usuario,
                        as: 'enviadopor',
                        where:{
                            id: usuario
                        },
                        include:[{
                            model: Persona,
                            as: 'persona'
                        }]
                    }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include:[{
                        model: Persona,
                        as: 'persona'
                    }]
                },{
                    model: EstadoDocumento,
                    as: 'estadodocumentacion'
                }
            ],
                where:{
                    clubId: club
                }
            })
            

            for(let respuesta1 of respuesta){

                let obj  = {
                    id: respuesta1.id,
                    solicituddocumentoId: respuesta1.solicituddocumentoId,
                    clubId: respuesta1.clubId,
                    usuarioId: respuesta1.usuarioId,
                    estadodocumentacionId: respuesta1.estadodocumentacionId,
                    titulo: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.titulo,
                    descripcion: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.descripcion,
                    fecha: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.fecha,
                    hora: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.hora,
                    enviadoA:  respuesta1 && respuesta1.usuario && respuesta1.usuario.persona && `${respuesta1.usuario.persona.nombre} ${respuesta1.usuario.persona.apellido}`,
                    estado: respuesta1 && respuesta1.estadodocumentacion && respuesta1.estadodocumentacion.nombre
        
                }   
                arr.push(obj)
    
            }


        }else{

        
        const respuesta  = await DestinatarioDocumentacion.findAll({
            include:[{
                model: SolicitudDocumento,
                as: 'solicituddocumento',
                include:[{
                    model: Usuario,
                    as: 'enviadopor',
                    where:{
                        id: usuario
                    },
                    include:[{
                        model: Persona,
                        as: 'persona'
                    }]
                }]
            },{
                model: Usuario,
                as: 'usuario',
                include:[{
                    model: Persona,
                    as: 'persona'
                }]
            },{
                model: EstadoDocumento,
                as: 'estadodocumentacion'
            }
        ],
            where:{
                clubId: club,
                estadodocumentacionId: espacio,
            }
        })


     
        for(let respuesta1 of respuesta){

            let obj  = {
                id: respuesta1.id,
                solicituddocumentoId: respuesta1.solicituddocumentoId,
                clubId: respuesta1.clubId,
                usuarioId: respuesta1.usuarioId,
                estadodocumentacionId: respuesta1.estadodocumentacionId,
                titulo: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.titulo,
                descripcion: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.descripcion,
                fecha: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.fecha,
                hora: respuesta1 && respuesta1.solicituddocumento && respuesta1.solicituddocumento.hora,
                enviadoA:  respuesta1 && respuesta1.usuario && respuesta1.usuario.persona && `${respuesta1.usuario.persona.nombre} ${respuesta1.usuario.persona.apellido}`,
                estado: respuesta1 && respuesta1.estadodocumentacion && respuesta1.estadodocumentacion.nombre
    
            }   
            arr.push(obj)

        }
    }

   
   

        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}




exports.aprobadosLista = async(req,res) => {
    try{


        const club = req.params.club
        const solicitud = req.params.solicitud


        


        const result  = await DestinatarioDocumentacion.findAll({
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
                solicituddocumentoId: solicitud,
                estadodocumentacionId: 3
            },
            order: [['id', 'DESC']]
        })

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.solicitudByClub = async(req,res) => {
    try{


        const club = req.params.club


        


        const result  = await DestinatarioDocumentacion.findAll({
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
                },{
                    model: CategoriaDocumentacion,
                    as: 'categoriadocumento'
                }]
            },{
                model: Usuario,
                as: 'usuario',
                include:[{
                    model: Persona,
                    as: 'persona'
                }]
            },{
                model: EstadoDocumento,
                as: 'estadodocumentacion'
            }
        ],
            where:{
                clubId: club,
            
            },
            order: [['id', 'DESC']]
        })

        let arr = []
        for(let val of result){
            let obj = {
                id: val && val.id,
                clubId: val && val.clubId,
                usuarioId: val && val.usuarioId,
                solicituddocumentoId: val && val.solicituddocumentoId,
                title: val && val.solicituddocumento &&  val.solicituddocumento.titulo,
                fecha: val && val.solicituddocumento &&  val.solicituddocumento.fecha,
                hora: val && val.solicituddocumento &&  val.solicituddocumento.hora,
                enviadoA: val && val.usuario && val.usuario.persona && `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`,
                avatar : val && val.usuario && val.usuario.persona && val.usuario.persona.avatar,
                estadoDocumentacion: val && val.estadodocumentacion && val.estadodocumentacion.nombre,
                categoria: val && val.solicituddocumento && val.solicituddocumento.categoriadocumento && val.solicituddocumento.categoriadocumento.nombre 
            }
            arr.push(obj)
        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}