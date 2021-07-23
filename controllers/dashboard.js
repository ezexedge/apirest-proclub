
const Club = require('../models/Club')
const db = require('../config/db')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXUsuario = require('../models/ClubXUsuario')
const Pais = require('../models/Pais')
const ClubXusuario = require('../models/ClubXUsuario')
const Provincia = require('../models/Provincia')
const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')

exports.getAll = async (req,res) => {
    try{

      
        const club =  req.params.club
        const usuario = req.params.usuario

        const result =  await ClubXUsuario.findOne({
           
            where: {
                activo: 1,
                clubId: club,
                usuarioId:usuario
            }
        })
        

        if(!result)throw new Error('el usuario no existe o no existe en el club')

        
        const resp =  await NotXClubXUsuario.findAll({
            include:[{
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                }   
            ],
            where:{
                activo:1,
                clubxusuarioId: clubxusario
            }
        })

        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}
