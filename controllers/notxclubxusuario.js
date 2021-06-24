const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
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

        const usuario = req.params.usuario
       
      


        const result =  await ClubXUsuario.findOne({
            where: {
                activo: 1,
                usuarioId: usuario
            }
        })



        if(!result)throw new Error('el usuario no existe o no existe en el club')

        
        const resp =  await NotXClubXUsuario.findAll({
            where:{
                activo:1,
                clubxusuarioId: result.id
            }
        })

        res.status(200).json(resp)


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

exports.getNotUser = async (req,res) => {
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