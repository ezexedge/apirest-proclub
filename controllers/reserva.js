const Reservas =  require('../models/Reservas')
const EstadoReserva = require('../models/EstadoReserva')
const Usuario = require('../models/Usuario')
const Turno = require('../models/Turno')
const QRCode = require('qrcode')
const Espacio = require('../models/Espacio')
const RelPosXUsuarioXDivXDep = require('../models/RelPosXUsarioXDiviXDep')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const ClubXUsuario = require('../models/ClubXUsuario')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
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

        const club = req.params.club


        


        const usuarioResult = await Usuario.findOne({
            where:{
                id: usuario,
                activo: 1
            }
        })

        if(!usuarioResult) throw new Error('el usuario no existe')


        const resultclubxusuario = await ClubXUsuario.findOne({
            where: {clubId: club,usuarioId: usuario,activo:1}
        })

        if(!resultclubxusuario)throw new Error('la relacion entre el usuario y el club no existe')


        //RelPosXUsuarioXDivXDep

        const usuarioFinal = await  RelPosXUsuarioXDivXDep.findOne({
            include: [{
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv'
            },
           {
            model: DisciplinaXClubXPos,
            as: 'disciplinaxclubxpos',
                include: [{
                    model: RelDisciplinaXPos,
                    as: 'disciplinaxpos'

                }]
           }
        ],
            where: {clubxusuarioId: resultclubxusuario.id}
        }) 

        
       


        const result =  await Reservas.findAll({
            
            include: [{
                model: Turno,
                as: 'turno',
                include: [{
                    model: Espacio,
                    as: 'espacio'
                }]
            }],
           where:{
               usuarioId: usuario,
               activo:1
           }
       })


       let arr = []
       for(let val of result){
            const obj = {
                division: usuarioFinal.disxclubxdiv.nombre,
                posicion: usuarioFinal.disciplinaxclubxpos.disciplinaxpos.nombre,
                espacio: val.turno.espacio.nombre
            }

            arr.push(obj)
       }


        res.status(200).json(arr)
      
    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}

exports.crear = async(req,res) => {
    try{


        
        const usuario = req.params.usuario
        const turno = req.params.turno


        const estado = await EstadoReserva.findOne({
            where:{
                nombre: 'pendiente'
            }
        })

       
        if(!estado)throw new Error('el estado pendiente no existe en la base de datos')


        const result  =  await Reservas.create({turnoId: Number(turno) , usuarioId: Number(usuario),estadoreservaId: estado.id , qr: qr})

        res.status(200).json(result)


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