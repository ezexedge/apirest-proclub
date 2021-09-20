const Ingreso = require('../models/Ingreso')
const Reserva = require('../models/Reservas')
const Turno = require('../models/Turno')
const Espacio = require('../models/Espacio')
const Usuario =  require('../models/Usuario')
const Persona = require('../models/Persona')
const moment = require('moment')
exports.getAll =  async (req,res) => {

    try{

        const result = await Ingreso.findAll({
            include:[
                {
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                },
                {
                model: Reserva,
                as: 'reserva',
                include:[{
                    model: Turno,
                    as: 'turno',
                    include:[{
                        model : Espacio,
                        as: 'espacio'
                    }]
                }]
            }]
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.getById =  async (req,res) => {

    try{

        const id = req.params.id
        
        const result = await Ingreso.findOne({
            include:[
                {
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                },
                {
                model: Reserva,
                as: 'reserva',
                include:[{
                    model: Turno,
                    as: 'turno',
                    include:[{
                        model : Espacio,
                        as: 'espacio'
                    }]
                }]
            }],
            where: {id: id}
        })

        if(!result)throw new Error('el ingreso no existe')
        

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.crear =  async (req,res) => {

    try{

      const espacio = req.params.espacio
      const usuario = req.auth.userId


      const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')

     
   
        const result = await Ingreso.create({espacioId: espacio,usuarioId: usuario,hora:hora})

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}




exports.getByUser =  async (req,res) => {

    try{

        const id = req.params.userId


        const resultUsuario =  await Usuario.findByPk(id)

        if(!resultUsuario)throw new Error('no existe el usuario')


        const result = await Ingreso.findAll({
            include:[    {
                model: Usuario,
                as: 'usuario',
                include: [{
                    model: Persona,
                    as: 'persona'
                }]
            },{
                model: Reserva,
                as: 'reserva',
                include:[{
                    model: Turno,
                    as: 'turno',
                    include:[{
                        model : Espacio,
                        as: 'espacio'
                    }]
                }]
            }],
            where: { usuarioId: id },
            order: [['id', 'DESC']]
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.getByReserva =  async (req,res) => {

    try{

        const reserva = req.params.reserva


        const resultReserva =  await Reserva.findByPk(reserva)

        if(!resultReserva)throw new Error('el id de la reserva no existe')

        
        const result = await Ingreso.findAll({
            include:[    {
                model: Usuario,
                as: 'usuario',
                attributes: ['id'],

                include: [{
                    model: Persona,
                    as: 'persona'
                }]
            }],
            where: { reservaId: reserva },
            order: [['id', 'DESC']]
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}