exports.crearSolicitud = async(req,res) => {
    
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



        if( val.usuarioId !== req.auth.userId){

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

     



      

    }


    console.log('arrrfinal',arrFinal)


    console.log('aca los iddevices',arrDevices)



    

    await NotXClubXUsuario.bulkCreate(arrFinal,{ transaction: t })
      


    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    let idString = resultNotificacion.id
    let idModificado = idString.toString()

    const message_notification = {
        notification: {
            title:  notificacion.titulo ,
            body: notificacion.descripcion
        },
        data:{
            idNoti: idModificado
        }
    };

         
  



    console.log('aaaaarrr====',arrDevices)
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
