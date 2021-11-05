const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const NotificacionVistasXUsuarios = require('../models/NotificacionVistasXUsuarios')
const Usuario = require('../models/Usuario')
const _ = require('lodash')
exports.crear = async (req,res)=> {

    try{


        const notxclub = req.params.notxclub
        const clubxusuario = req.params.clubxusuario

        const resultNotXClub = await NotificacionXClub.findOne({
            where: {
                id: notxclub,
                activo: 1
            }
        })

        if(!resultNotXClub)throw new Error('el id de la notifcacion x club no existe')

        const resultClubxusuario = await ClubXUsuario.findOne({
            where: {
                id: clubxusuario,
                activo: 1
            }
        })

        if(!resultClubxusuario)throw new Error('el id de club x usuario no existe')

        
        const result = await NotXClubXUsuario.create({ notificacionxclubId : Number(notxclub),clubxusuarioId: Number(clubxusuario)})
        

        res.status(200).json(result)

    }catch(err){

        res.status(400).json({error: err.message})
    
    }
}



exports.getAllByClubByUser = async (req,res) => {
    try{

        const notificacion = req.params.notificacion
       
      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                where: { notificacionId: notificacion },
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                },{
                    model: Club,
                    as: 'club'
                }]
                }   
            ],
            order: [['id', 'DESC']]

        })


        let arr = []
        for(let val of resp){
    
          arr.push(val.clubxusuario)
        }
    

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}


exports.getById = async (req,res) => {
    try{

        const id = req.params.id
      


        const result = await NotXClubXUsuario.findOne({
            where: {
                activo: 1,
                id: id
            }
        })

        if(!result)throw new Error('el id no existe')

        result.visto+=1




        await result.save()
       
        
        
        res.status(200).json(result)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}






exports.getNotificacionByUser = async (req,res) => {
    try{

        const user = req.params.userId
       

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


        const resultVisto = await NotificacionVistasXUsuarios.findAll({})


        

        console.log('array visto',resultVisto)

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  where:{id: user},
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            order: [['id', 'DESC']]

        })



        let arr = []

  
        for (let val of resp){



          
            let encontrado = _.find(resultVisto, { 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id });
          //    console.log({ 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id })

            //  let encontrado = _.find(resultVisto, function(o) { return o.usuarioId === Number(user) && o.notificacionId ===  val.club.notificacion.id ; });
              let leido 
              if(encontrado){
                  leido = 1
              }else{
                  leido = 0
              }
    
  
    

            let obj = {
                id: val.id,
                activo: val.activo,
                clubxusuario: val.clubxusuario,
                notificacionxclubId: val.notificacionxclubId,
                clubxusuarioId: val.clubxusuarioId,
                usuarioId: val.usuarioId,
                notificacion: val.club.notificacion,
                leido: leido,
               enviadoPor: `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`

            }

            arr.push(obj)


        }

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}





exports.getNotificacionEnviadaPor = async (req,res) => {
    try{

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                }   
            ],
            where:{usuarioId: req.auth.userId},
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




exports.getNotificacionByUserByClub = async (req,res) => {
    try{

        const user = req.params.user
        const club = req.params.club

        const usuarioExiste =  await  Usuario.findByPk(Number(user))

        if(!usuarioExiste)throw new Error('el usuario no existe')


        const clubExiste = await Club.findByPk(Number(club))

        if(!clubExiste)throw new Error('el club no existe')


      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                 where:{
                     clubId: club,
                     usuarioId: user
                 },
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion',
                    where:{
                        activo: 1
                    }
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            where:{
                activo: 1
            },
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




exports.getAllNotificacionUser = async (req,res) => {
    try{

        const user = req.params.user
      

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


  

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                 where:{
                     usuarioId: user
                 },
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion',
                    where:{
                        activo: 1
                    }
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            where:{
                activo: 1
            },
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}

//getNotificacionByUserByClub








exports.getNotificacionNoLeidos = async (req,res) => {
    try{

        const user = req.params.userId
       

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


        const resultVisto = await NotificacionVistasXUsuarios.findAll({})


        

        console.log('array visto',resultVisto)

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  where:{id: user},
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            order: [['id', 'DESC']]

        })



        let arr = []

  
        for (let val of resp){



          
            let encontrado = _.find(resultVisto, { 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id });
          //    console.log({ 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id })

            //  let encontrado = _.find(resultVisto, function(o) { return o.usuarioId === Number(user) && o.notificacionId ===  val.club.notificacion.id ; });
              if(!encontrado){
           

                let obj = {
                    id: val.id,
                    activo: val.activo,
                    clubxusuario: val.clubxusuario,
                    notificacionxclubId: val.notificacionxclubId,
                    clubxusuarioId: val.clubxusuarioId,
                    usuarioId: val.usuarioId,
                    notificacion: val.club.notificacion,
                   enviadoPor: `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`
    
                }
    
                arr.push(obj)




              }
    
  
    

    


        }

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




exports.getNotificacionesLeidas = async (req,res) => {
    try{

        const user = req.params.userId
       

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


        const resultVisto = await NotificacionVistasXUsuarios.findAll({})


        

        console.log('array visto',resultVisto)

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  where:{id: user},
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            order: [['id', 'DESC']]

        })



        let arr = []

  
        for (let val of resp){



          
            let encontrado = _.find(resultVisto, { 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id });
          //    console.log({ 'usuarioId': Number(user), 'notificacionId': val.club.notificacion.id })

            //  let encontrado = _.find(resultVisto, function(o) { return o.usuarioId === Number(user) && o.notificacionId ===  val.club.notificacion.id ; });
              if(encontrado){
           

                let obj = {
                    id: val.id,
                    activo: val.activo,
                    clubxusuario: val.clubxusuario,
                    notificacionxclubId: val.notificacionxclubId,
                    clubxusuarioId: val.clubxusuarioId,
                    usuarioId: val.usuarioId,
                    notificacion: val.club.notificacion,
                   enviadoPor: `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`
    
                }
    
                arr.push(obj)




              }
    
  
    

    


        }

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}