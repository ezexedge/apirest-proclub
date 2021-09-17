const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const Usuario = require('../models/Usuario')
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
            ]
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
                }   
            ]
        })




        res.status(200).json(resp)


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
            where:{usuarioId: 985}
        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




