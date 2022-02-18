const Espacio = require('../models/Espacio')
const EspacioXDisciplinaXClub = require('../models/EspacioXDisciplinaXClub')
const db = require('../config/db')
const EstadoEspacio = require('../models/EstadoEspacio')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const ConfiguracionDiasHs = require('../models/ConfiguracionDiasHs')
const RelDisiciplinaXClub = require('../models/RelDisciplinaXClub')
const Disiciplina = require('../models/Disciplina')
const Reserva = require('../models/Reservas')
const Beneficios = require('../models/Beneficios')
const Club =  require('../models/Club')
const { Op } = require("sequelize");

exports.crearEspacio =  async (req,res) => {
 
 
 
    const t = await db.transaction()

    try{


    const {nombre,image,descripcion,clubId,tiempoDeAnticipacion,maxReservasDia,maxReservasMes,maxReservasSem,maxReservasAno,deporte,intervaloEntreTurnos,DuracionDeTurnos} = JSON.parse(req.body.data)
    
    console.log( JSON.parse(req.body.data))

    if(req.file){
        let imagen = req.file.filename
        console.log(imagen)

    }
        //el let imagen lo vamos usar cuando migremos a digital ocean


    const result = await Espacio.create({nombre: nombre,image:image, descripcion: descripcion , clubId:clubId, estadoespacioId:1,tiempoDeAnticipacion: tiempoDeAnticipacion,intervaloEntreTurnos: intervaloEntreTurnos,DuracionDeTurnos:DuracionDeTurnos,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem,maxReservasMes:maxReservasMes},{ transaction: t })
    
    await ConfiguracionDiasHs.create({espacioId:result.id},{ transaction: t })
    
    await  EspacioXDisciplinaXClub.create({espacioId:result.id,disciplinaxclubId:deporte,activo: 1},{ transaction: t })

    

    await t.commit();

    res.status(200).json({message: 'espacio creado'})    


    }catch(error){


        await t.rollback();

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacio =  async (req,res) => {

    try{


    const result = await Espacio.findAll({
        where: {activo: 1}
    })

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacioByClubId =  async (req,res) => {
    

    try{


        const id = req.params.id

        const result = await Espacio.findOne({
            where: {id: id}
        })
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el espacio no existe ')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.updateEspacio =  async (req,res) => {

    try{

    const id = req.params.id

    const { descripcion,valor,maxReservasDia, maxReservasMes,maxReservasSem,maxReservasAno,  DuracionDeTurnos,tiempoDeAnticipacion,intervaloEntreTurnos , lunes , martes , miercoles , jueves , viernes , sabado , domingo , multiplesReservasEnUnHorario ,  LimitarAUnSoloEventoAprobado, ProhibirMasDeUnaReservaPendiente , ReservaAmpliada  , reservas ,config} = req.body

    console.log('el uppdate',req.body)

    let configuracion = await ConfiguracionDiasHs.findOne({
        where:{
            espacioId: id
        }
    })


    if(!configuracion){
      configuracion =    await ConfiguracionDiasHs.create({espacioId:id})
    
    }

    
    const result = await Espacio.findByPk(id)

    if(result){

        await Espacio.update({ descripcion: descripcion , tiempoDeAnticipacion: tiempoDeAnticipacion,DuracionDeTurnos: DuracionDeTurnos,intervaloEntreTurnos: intervaloEntreTurnos,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem, maxReservasMes:  maxReservasMes ,valor: valor,multiplesReservasEnUnHorario: multiplesReservasEnUnHorario , LimitarAUnSoloEventoAprobado: LimitarAUnSoloEventoAprobado, ProhibirMasDeUnaReservaPendiente: ProhibirMasDeUnaReservaPendiente, ReservaAmpliada: ReservaAmpliada}, { where: { id: id }})


        

     await ConfiguracionDiasHs.update({lunes: lunes, martes: martes, miercoles: miercoles, jueves: jueves, viernes: viernes, sabado: sabado,domingo: domingo },{ where: { id: configuracion.id }})
     //   const result = await Espacio.create({nombre: nombre,image:image, descripcion: descripcion , clubId:clubId, estadoespacioId:1,tiempoDeAnticipacion: tiempoDeAnticipacion,tiempoDeCancelacion: tiempoDeCancelacion,horasPrevia:horasPrevia,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem},{ transaction: t })
    
        


     if(reservas.length > 0 ){
        let arr = []

     for(let val of reservas){

        if(val.id){

            await Reserva.update({desde:val.desde,hasta:val.hasta,nombre:val.nombre,fechaInicio:val.fechaInicio,fechaFin: val.fechaFin},{where:{id: val.id}})

        }


        if(!val.id){
            const obj = {
                usuarioId: req.auth.userId,
                nombre: val.nombre !== '' || val.nombre !== null ? val.nombre : 'No ingreso nombre',
                espacioId: id,
                desde: val.desde,
                hasta: val.hasta,
                fechaInicio: val.fechaInicio,
                fechaFin: val.fechaFin,
                estadoreservaId: 1,
                bloqueo: 1
             }
    
                arr.push(obj)
    
        }
     
      

     }

     


        await Reserva.bulkCreate(arr)

    }





     let arrConfiguracion  = []
    if(config.length > 0){

        for(let val of config){

            if(val.id > 0 ){
                await ConfiguracionDiasHs.update({
                    pertenece: val.pertenece,
                    lunes: val.lunes,
                    martes: val.martes,
                    miercoles: val.miercoles,
                    jueves: val.jueves,
                    viernes: val.viernes,
                    sabado: val.sabado,
                    domingo: val.domingo,
                    desde: val.desde,
                    hasta: val.hasta,
                    espacioId: val.espacioI

                },{where:{id: val.id}})
            }

        } 




        for(let val of config){

            if(val.id < 0){
            const obj = {
                pertenece: val.pertenece,
                lunes: val.lunes,
                martes: val.martes,
                miercoles: val.miercoles,
                jueves: val.jueves,
                viernes: val.viernes,
                sabado: val.sabado,
                domingo: val.domingo,
                desde: val.desde,
                hasta: val.hasta,
                espacioId: val.espacioId
            }
    
            arrConfiguracion.push(obj)
        }
    
         }

         console.log('esto es toda la configuracion...../// ',arrConfiguracion)
         await ConfiguracionDiasHs.bulkCreate(arrConfiguracion)
    
    

    }
 
        res.status(200).json({'message': 'modificado correctamente'})    
    
    }else{
        throw new Error('el Espacio no existe')
    }


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.eliminarEspacio =  async (req,res) => {

    try{

        const id = req.params.id

        const result = await Espacio.findByPk(id)

        if(!result)throw new Error('el espacio no existe.')

      
            
            result.activo = 0

            await result.save()
          
          
            res.status(200).json({message: 'eliminado'})
          
            
       

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}



exports.activarEspacio =  async (req,res) => {

    try{

        const id = req.params.id

        const result = await Espacio.findByPk(id)

        if(!result)throw new Error('el espacio no existe.')

      
            
            result.activo = 1

            await result.save()
          
          
            res.status(200).json({message: 'Espacio activado'})
          
            
       

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}


exports.getEspacioByClubId =  async (req,res) => {

    try{


        const club = req.params.club

        if(!club)throw new Error('el club no existe')

        const result = await Espacio.findAll({
            where: {
           
            clubId: club

                },
                order: [['id', 'DESC']]

        })
        
//hacer un pasarle el espacio en el where y cargarlo en un nuevo json
//fijarme que en el front se manipula el json hace diferente la 
//respuesta del json que trae el back


        
        
        
        let arr = []
        for(let val of result){
            const disciplinas = await EspacioXDisciplinaXClub.findAll({
                include:[{
                    model: RelDisiciplinaXClub,
                    as: 'disciplinaxclub',
                    where:{
                        activo: 1
                    },
                    include:[{
                        model: Disciplina,
                        as: 'disciplina'
                    }],
                }],
                where:{
                    espacioId: val.id
                }
            })



        

           

                let obj = {
                id:val.id ,
                nombre: val.nombre,
                descripcion: val.descripcion,
                maxReservasDia: val.maxReservasDia,
                maxReservasMes: val.maxReservasMes,
                maxReservasSem: val.maxReservasSem,
                maxReservasAno: val.maxReservasAno,
                intervaloEntreTurnos: val.intervaloEntreTurnos,
                image: val.image,
                tiempoDeAnticipacion: val.tiempoDeAnticipacion,
                DuracionDeTurnos: val.DuracionDeTurnos,
                valor: val.valor,
                activo: val.activo,
                visibilidad: val.visibilidad,
                multiplesReservasEnUnHorario: val.multiplesReservasEnUnHorario,
                LimitarAUnSoloEventoAprobado: val.LimitarAUnSoloEventoAprobado,
                ProhibirMasDeUnaReservaPendiente: val.ProhibirMasDeUnaReservaPendiente,
                ReservaAmpliada: val.ReservaAmpliada,
                clubId: val.clubId,
                estadoespacioId: val.estadoespacioId,
                deportes: disciplinas ? disciplinas : []
                }

                arr.push(obj)
           



        }

            res.status(200).json(arr)    
        
       


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}
//getEspacioByClubId



exports.getEspacio =  async (req,res) => {

    try{


    const result = await Espacio.findAll({
        where: {activo: 1}
    })

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}





exports.getEspacioById =  async (req,res) => {

    try{


    const id = req.params.id

    const espacioResult = await Espacio.findOne({
        include: [{
          model: EstadoEspacio,
          as: 'estadoespacio'
        }],
        where: {
            id: id
        }
    })
    
    if(!espacioResult)throw new Error('el id del espacio no existe')



    res.status(200).json(espacioResult)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}



exports.getEspacioByDisciplinaXClub =  async (req,res) => {

    try{


    const espacio = req.params.espacio

    const club = req.params.club

    const result = await EspacioXDisciplinaXClub.findAll({
        include:[{
        model: RelDisciplinaXClub,
        as: 'disciplinaxclub',
        where: { clubId: club },
        include:[{
            model: Disciplina,
            as: 'disciplina'
        }]
        }],
        where: {
            activo: 1,
            espacioId: espacio
        }
    })
    


    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}




exports.relacionarEspacioConDisciplinaXClub =  async (req,res) => {
 

    try{


        const espacio = req.params.espacio
    
        const disciplinaxclub = req.params.disciplinaxclubId
    
        const result = await EspacioXDisciplinaXClub.findOne({
  
            where: {
                activo: 1,
                espacioId: espacio,
                disciplinaxclubId: disciplinaxclub
            }
        })

        if(result)throw new Error('el deporte ya se vinculado al espacio')
        
    

        await  EspacioXDisciplinaXClub.create({espacioId:espacio,disciplinaxclubId:disciplinaxclub,activo: 1})
    
        res.status(200).json({message: 'operacion exitosa'})    
    
    
        }catch(error){
    
            res.status(400).json({'error': error.message})
            
        }
 
 


}





exports.getEspacioByDisciplina =  async (req,res) => {

    try{


    const id = req.params.disciplina

    const resultDisiciplina = await RelDisiciplinaXClub.findByPk(id)

    if(!resultDisiciplina)throw new Error('la disciplinaxlcub no  existe')
    

    const espacioResult = await EspacioXDisciplinaXClub.findAll({
        include: [{
            model: Espacio,
            as: 'espacio'
        }],
        where:{
            disciplinaxclubId: id,
            activo: 1,
            espacioId: {
                [Op.ne]: null
              }
        }
        
    })
    


    


    res.status(200).json(espacioResult)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


//eliminarEspacioXDisciplina



exports.eliminarEspacioXDisciplina =  async (req,res) => {
 

    try{


    
        const id = req.params.id
    
        const result = await EspacioXDisciplinaXClub.findOne({
  
            where: {
                activo: 1,
                id: id
            }
        })

        if(!result)throw new Error('el deporte no esta vinculado a este espacio')
        
    

        await  EspacioXDisciplinaXClub.update({activo: 0},{where: {id: id} })
    
        res.status(200).json({message: 'deporte eliminado'})    
    
    
        }catch(error){
    
            res.status(400).json({'error': error.message})
            
        }
 
 


}




exports.updateEspacioNombre =  async (req,res) => {

    try{

    const id = req.params.id
    

    const {nombre} = req.body

  

    
    const result = await Espacio.findByPk(id)

    if(!result)throw new Error('el espacio no existe')

    await Espacio.update({nombre:nombre}, { where: { id: id }})

 
 
        res.status(200).json({'message': 'nombre modificado correctamente'})    
    
   


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}




exports.updateImagen =  async (req,res) => {

    try{

    const id = req.params.id
    

    const {image} = req.body

  

    
    const result = await Espacio.findByPk(id)

    if(!result)throw new Error('el espacio no existe')

    await Espacio.update({image:image}, { where: { id: id }})

 
 
        res.status(200).json({'message': 'imagen modificado correctamente'})    
    
   


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}







exports.modificarImagenes = async (req, res) => {


  const t = await db.transaction()

  try {

    const usuarioParams = req.params.espacio
  



    const result  = await Espacio.findOne({
        where:{
            id: usuarioParams,
            activo:1
        }
    })

    if(!result)throw new Error('el espacio no existe')



    
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }
    
    await Espacio.update({ image : `https://api.klubo.club/api/image/${imagen}` },{where: {id: result.id},  transaction: t})


 


   await t.commit();
 
   res.status(200).json({ "message": "modificado con exito" })

  } catch (err) {
    console.log('error', err)

    await t.rollback();
    res.status(400).json({ "error": err.message })

  }

};





exports.modificarImagenesClub = async (req, res) => {


    const t = await db.transaction()
  
    try {
  
      const club  = req.params.club
    
  
  
        const result =  await Club.findOne({
            where:{
                id: club
            }
        })
  
        if(!result)throw new Error('el club no existe')
  
      
      let imagen
      if(req.file) {
       imagen =  `https://api.klubo.club/api/image/${req.file.filename}`
       
       
     
      }else{
        imagen = result.image
      } 
      
      await Club.update({ logo : imagen },{where: {id: club},  transaction: t})
  
  
   
  
  
     await t.commit();
   
     res.status(200).json({ "message": "modificado con exito" })
  
    } catch (err) {
      console.log('error', err)
  
      await t.rollback();
      res.status(400).json({ "error": err.message })
  
    }
  
  };
  
  



exports.subirImagenes = (req, res) => {


 
  
    try {
  
      
  
  
    
     
     

      if(!req.file)throw new Error('No se agrego una imagen')
  
      let imagen
      imagen = req.file.filename
    
   

   
     res.status(200).json(imagen)
  
    } catch (err) {
      console.log('error', err)
  
      res.status(400).json({ "error": err.message })
  
    }
  
  };
  