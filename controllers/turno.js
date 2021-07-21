const Turno = require('../models/Turno')
const EstadoTurno = require('../models/EstadoTurno')
const moment = require('moment')

exports.getById = async(req,res) => {
    try{

        const id = req.params.id

        const result = await Turno.findOne({
            where: {
                id:id,
                activo: 1
            }
        })
        if(!result)throw new Error(`el id:${id} no existe`)

        let date =   moment(new Date(`${result.fecha} ${result.horaHasta}:00`))
        let now  = moment()
        if (now > date) {
                
            console.log('inactivo')
        const proceso =   await Turno.update({activo: 0}, { where: { id: result.id }})

        if(proceso)throw new Error('el turno esta inactivo')
        console.log('proceso',proceso)
        } 




   






        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getAll = async(req,res) => {
    try{

        const result = await Turno.findAll({
            where: {
                activo: 1
            }
        })

        for await (let val of result){

          let date =   moment(new Date(`${val.fecha} ${val.horaHasta}:00`))
           let now  = moment()

            if (now > date) {
                
                console.log('inactivo')
                await Turno.update({activo: 0}, { where: { id: val.id }})
            } 
        }



                 

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getAllInactivo = async(req,res) => {
    try{

        const result = await Turno.findAll({
            where: {
                activo: 0
            }
        })
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.crear = async(req,res) =>{
    try{


        const estado = req.params.estado
        const espacio =  req.params.espacio

        const { fecha,horaDesde,horaHasta,precio,cupo } = req.body

        const resp = await Turno.create({fecha:fecha,horaDesde:horaDesde,horaHasta:horaHasta,precio:precio,cupo:cupo,estadoturnoId:estado , espacioId: espacio})

        res.status(200).json(resp)


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}

exports.eliminar = async (req,res) => {


    try{

        const id = req.params.id

        const result =  await Turno.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}
