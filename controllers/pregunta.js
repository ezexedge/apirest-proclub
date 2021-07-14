const Pregunta = require('../models/Pregunta')
const db = require('../config/db')

exports.crear = async(req,res) => {
    try{


        const encuesta =  req.params.encuesta
        const {titulo} = req.body
        const result  =  await Pregunta.create({titulo: titulo , encuestaId: encuesta})
      //  const result = await Notificacion.bulkCreate(req.body)

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    try{

        const id = req.params.id

        const result = await Pregunta.findOne({
            where: {
                id:id,
                activo: 1
            }
        })

        if(!result)throw new Error(`el id:${id} no existe`)

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getAll = async(req,res) => {
    try{

        const encuesta = req.params.encuesta


      

        const result = await Pregunta.findAll({
            where: {
                activo: 1,
                encuestaId: encuesta
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

        const result =  await Pregunta.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      


    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}

exports.modificar = async (req,res)=> {

    try{

        const id = req.params.id

        const {titulo,descripcion} = req.body

        const result =  await Pregunta.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        await Pregunta.update({titulo:titulo},{where: {id: result.id}})

        res.status(200).json({message: 'modificacion correcta'})
        
    }catch(err){

        res.status(400).json({error: err.message})


    }

}