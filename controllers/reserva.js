const Reservas =  require('../models/Reservas')
const Usuario = require('../models/Usuario')
const Turno = require('../models/Turno')
const QRCode = require('qrcode')
const Espacio = require('../models/Espacio')
const RelPosXUsuarioXDivXDep = require('../models/RelPosXUsarioXDiviXDep')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const ClubXUsuario = require('../models/ClubXUsuario')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const EstadoReserva = require('../models/EstadoReserva')
const Disciplina = require('../models/Disciplina')
const moment = require('moment')
const { Op, Sequelize } = require("sequelize");
const _ = require('lodash');


exports.getAll = async (req,res) => {


    try{

        const result  = await Reservas.findAll({
            where:{
                activo: 1
            }
        })
        res.status(200).json(result)
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}


exports.getbyId = async (req,res) => {


    try{

        const id = req.params.id
       const result =  await Reservas.findOne({
           where: {
               activo: 1,
               id: id
           }
       })
       if(!result)throw new Error('el id no existe en la base de datos')

        res.status(200).json(result)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}


exports.getbyUserId = async (req,res) => {


    try{

        const usuario = req.params.usuario
      

        const result = await Reservas.findAll({
            include:[{
                model: Espacio,
                as: 'espacio'
            },
            {
                model: EstadoReserva,
                as: 'estadoreserva'
            }
        ],
            where:{
                usuarioId: usuario,
                activo: 1
            }
        })

        



        res.status(200).json(result)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}


exports.crear = async(req,res) => {
    try{


        
        const usuario = req.auth.userId


        const estado = await EstadoReserva.findOne({
            where:{
                nombre: 'aprobado'
            }
        })



       
        if(!estado)throw new Error('el estado pendiente no existe en la base de datos')

 
        const resultEspacio = await Espacio.findByPk(req.body.espacioId)
 
        if(!resultEspacio)throw new Error('el espacio ingresado no existe')

        const resultDisciplinaXClub = await RelDisciplinaXClub.findByPk(req.body.disciplinaxclubId)
       
        if(!resultDisciplinaXClub)throw new Error('el id de  disciplinaxclub no existe')



        
        const result  =  await Reservas.create({usuarioId: Number(usuario),estadoreservaId: estado.id , desde: req.body.desde, hasta: req.body.hasta ,fechaInicio: req.body.fechaInicio , fechaFin: req.body.fechaFin , nombre : req.body.nombre ,espacioId: req.body.espacioId,disciplinaxclubId: req.body.disciplinaxclubId })

        
        res.status(200).json({message: 'reserva creada correctamente'})


    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.eliminar = async (req,res) => {


    try{

        const id = req.params.id

        const result =  await Reservas.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}



exports.modificiarEstado = async (req,res) => {


    try{

        const id = req.params.id
        const estado = req.params.estado

        const estadoResult = await EstadoReserva.findByPk(estado)

        if(!estadoResult)throw new Error('el id del estado no existe en la base de datos')


        const result =  await Reservas.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.estadoreservaId = estado

        await result.save()
        res.status(200).json({message: 'estado modificado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}




exports.getByEstado = async (req,res) => {


    try{

        const usuario = req.params.userId
        const estado = req.params.estado



      

        const usuarioResult = await Usuario.findOne({
            where:{
                id: usuario,
                activo: 1
            }
        })

        if(!usuarioResult) throw new Error('el usuario no existe')

        const result =  await Reservas.findAll({

          include:[{
              model: RelDisciplinaXClub,
              as: "disciplinaxclub",
              include:[{
                model: Disciplina,
                as: "disciplina"
              }]
          }],
           where:{
               usuarioId: usuario,
               estadoreservaId: estado,
               activo:1
           }
       })





        res.status(200).json(result)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}



exports.getBloqueados = async (req,res) => {


    try{

        
        const espacio = req.params.espacio


      

        const result = await Reservas.findAll({
            where:{
                espacioId: espacio,
                activo: 1,
                bloqueo: 1
            }
        })



        res.status(200).json(result)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}





exports.getFiltroXEspacioXDia = async (req,res) => {


    try{

        
        const espacio = req.params.espacio


        const fechaInicio = req.params.fecha

        const fechaFin = req.params.fechafin




        const resultEspacio = await Espacio.findByPk(espacio)

        if(!resultEspacio)throw new Error('El id del espacio no existe')

        const fechaFilterInicio =  fechaInicio !== 'null' ? ` ${fechaInicio} 00:00:00` : moment().format("YYYY-MM-DD HH:mm:ss")



        console.log('/////',fechaFilterInicio)
   

       let result =  await Reservas.findAll({
        where: { 
            fechaInicio : fechaFilterInicio
           
    },
       order: [['id', 'DESC']]            
            
       })



    result = _.filter(result,{'espacioId': Number(espacio)})




        res.status(200).json(result)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}
