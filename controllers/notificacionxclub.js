const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
exports.crear = async(req,res) => {
    try{

        const notificacion = req.params.notificacion
        const club = req.params.club
     //   const usuario = req.params.usuario

        const resultNotificacion = await Notificacion.findOne({
            where:{
                id: notificacion,
                activo: 1
            }
        })


        if(!resultNotificacion)throw new Error('El id de la notificacion no existe')



        const resultClub = await Club.findOne({
            where:{
                id: club,
                activo: 1
            }
        })

        console.log('clubbb',resultClub)
        if(!resultClub)throw new Error('El id del club no existe')

/*
        const resultClubXUsuario = await ClubXUsuario.findOne({
            where:{
                clubId: club,
                usuarioId: usuario,
                activo: 1
            }
        })

        if(!resultClubXUsuario)throw new Error('el usuario no se encuentra registrado en el club')
*/
        const result = await NotificacionXClub.create({clubId:club,notificacionId:notificacion,creadorUsuarioId:resultClub.personaId})

        res.status(200).json(result)

      
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    try{

        const id = req.params.id

        const result = await NotificacionXClub.findOne({
            include: [{
                model: Club,
                as: 'club',
                include: [{
                    model: Persona,
                    as: 'persona'
                }]

            },
            {
                model: Notificacion,
                as: 'notificacion'
            },
           
        ],
            where: {
                activo: 1,
                id: id
            }
        })


        if(!result)throw new Error('el id no existe')

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getByClub = async(req,res) => {
    try{


        const club = req.params.club

        const resultClub = await Club.findOne({
            where:{
                id: club,
                activo: 1
            }
        })

        if(!resultClub) throw new Error('el club no existe')

        const result = await NotificacionXClub.findAll({
            include: [{
                model: Club,
                as: 'club',
                include: [{
                    model: Persona,
                    as: 'persona'
                }]

            },
            {
                model: Notificacion,
                as: 'notificacion'
            },
           
        ],
            where: {
                activo: 1,
                clubId: club
            }
        })
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.eliminar = async (req,res) => {


    try{

        const id = req.params.id

        const result =  await NotificacionXClub.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}

