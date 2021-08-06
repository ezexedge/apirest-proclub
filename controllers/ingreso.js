const Ingreso = require('../models/Ingreso')
const Reserva = require('../models/Reservas')
const Turno = require('../models/Turno')
const Espacio = require('../models/Espacio')
const Usuario =  require('../models/Usuario')
exports.getAll =  async (req,res) => {

    try{

        const result = await Ingreso.findAll({
            include:[{
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
        
        const result = await Ingreso.findBYPk(id)

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.crear =  async (req,res) => {

    try{

        const reserva = req.params.reserva


        const reservaResult = await Reserva.findOne({
            where:{
                activo:1
            }
        })

        if(!reservaResult)throw new Error('la reserva no existe')
        
        const result = await Ingreso.create({reservaId: reserva})

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
            include:[{
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
