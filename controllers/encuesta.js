const Encuesta = require('../models/Encuesta')
const Destinatario = require('../models/Destinatario')
exports.crear = async(req,res) => {
    try{


        const result  =  await Encuesta.create(req.body)
      //  const result = await Notificacion.bulkCreate(req.body)

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    try{

        const id = req.params.id

        const result = await Encuesta.findOne({
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

        const result = await Encuesta.findAll({
            where: {
                activo: 1
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

        const result =  await Encuesta.findByPk(id)

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

        const result =  await Encuesta.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        await Encuesta.update({titulo:titulo,descripcion:descripcion},{where: {id: result.id}})

        res.status(200).json({message: 'modificacion correcta'})
        
    }catch(err){

        res.status(400).json({error: err.message})


    }

}




exports.getEnviadoPor = async(req,res) => {
    try{

        const usuario = req.auth.userId

        const result = await Destinatario.findAll({
            include:[{
                model: Encuesta,
                as: 'encuesta'
            }],
            where: {
                enviadoporId: usuario
            },
            order: [['id', 'DESC']]

        })
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



//getEncuestaPorUsuario



exports.getEncuestaPorUsuario = async(req,res) => {
    try{

        const usuario = req.params.userId

        const result = await Destinatario.findAll({
            include:[{
                model: Encuesta,
                as: 'encuesta'
            }],
            where: {
                usuarioId: usuario
            },
            order: [['id', 'DESC']]

        })
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}