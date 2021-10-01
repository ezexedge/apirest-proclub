const Pregunta = require('../models/Pregunta')
const Respuesta = require('../models/Respuesta')
const RespuestaUsuario = require('../models/RespuestaUsuario')
const db = require('../config/db')

exports.crear = async(req,res) => {
    try{


        const pregunta =  req.params.pregunta
        const {titulo} = req.body

        const resultPregunta = await Pregunta.findByPk(pregunta)
        if(!resultPregunta)throw new Error('la pregunta no existe')
        const result  =  await Respuesta.create({titulo: titulo , preguntaId: pregunta})

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    try{

        const id = req.params.id

        const result = await Respuesta.findOne({
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

        const pregunta = req.params.pregunta

        const result = await Respuesta.findAll({
            
            where: {
                activo: 1,
                preguntaId: pregunta
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

        const result =  await Respuesta.findByPk(id)

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

        const result =  await Respuesta.findByPk(id)

        if(!result)throw new Error(`el id:${id} no existe`)

        await Respuesta.update({titulo:titulo},{where: {id: result.id}})

        res.status(200).json({message: 'modificacion correcta'})
        
    }catch(err){

        res.status(400).json({error: err.message})


    }

}






exports.crearRespuestaUsuario = async(req,res) => {


    const t = await db.transaction()

   
    try{


        const {respuesta} =  req.body
        const usuario = req.auth.userId



        let arr = []
        for(let val of respuesta){

          let obj = {
              usuarioId: usuario,
              respuestaId: val.respuesta
          }

          arr.push(obj)

        }

        await RespuestaUsuario.bulkCreate(arr,{transaction: t})

        for(let val of respuesta){

            const resultRespuesta =  awit Respuesta.findOne({
                where:{
                    id: val.respuesta
                }
            })

      let contador = resultRespuesta.contadorDeRespuestas + 1
        await  Respuesta.update({contadorDeRespuestas: contador  },{where: {id: resultRespuesta.id}, transaction: t })



        }   

      

   await t.commit();


        res.status(200).json({message: 'respuesta seleccionada correctamente'})


    }catch(err){

            await t.rollback();

        res.status(400).json({error: err.message})
    }
}



exports.eliminarRespuestaUsuario = async (req,res)=> {

    try{


        const respuesta =  req.params.respuestaId
        const usuario = req.auth.userId




        const result =  await Respuesta.findOne({
            where: {
                id: respuesta
            }
        })

        if(!result)throw new Error(`La respuesta no existe`)

        const respuestaResult = await RespuestaUsuario.findOne({
            where: {
                usuarioId: usuario,
                respuestaId: respuesta
            }
        })


        if(!respuestaResult)throw new Error('la relacion entre respuesta y usuario no existe en la base de datos')

        await RespuestaUsuario.update({activo: 0 },{where: {id: respuestaResult.id}})

        const contador = result.contadorDeRespuestas - 1

        await  Respuesta.update({contadorDeRespuestas: contador  },{where: {id: result.id}})


        res.status(200).json({message: 'modificacion correcta'})
        
    }catch(err){

        res.status(400).json({error: err.message})


    }

}


//dd