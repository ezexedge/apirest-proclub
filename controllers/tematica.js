const Tematica = require('../models/Tematica')
const NotificacionXTematica = require('../models/NotificacionXTematica')


exports.getAll = async(req,res) => {

    try{

        const result = await Tematica.findAll()

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({message:err})
    }
}

//getByNotificacion

exports.getByNotificacion = async(req,res) => {



    try{

        const notificacion = req.params.notificacion
        
        const result = await NotificacionXTematica.findAll({
            include:[{
                model: Tematica,
                as: 'tematica'
            }],
            where: {
                notificacionId: notificacion
            }
        })

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({message:err})
    }
}