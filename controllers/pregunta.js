const Pregunta = require('../models/Pregunta')
const db = require('../config/db')
const Respuesta = require('../models/Respuesta')
const Encuesta = require('../models/Encuesta')


exports.crear = async(req,res) => {
    try{


        const encuesta =  req.params.encuesta
        const {titulo} = req.body
        const result  =  await Pregunta.create({titulo: titulo , encuestaId: Number(encuesta)})
      //  const result = await Notificacion.bulkCreate(req.body)

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.getById = async(req,res) => {
    
  

    try{

        const id = req.params.id


        const existe =  await Pregunta.findByPk(id)

        if(!existe)throw new Error('no existe la pregunta')
        
        
        const result = await Pregunta.findAll({
            where: {
                activo: 1,
                id:id
            }
        })


        

        let arr = []
        for(let val of result){
            
            let valor = {id: val.id , titulo: val.titulo , activo: val.activo,encuestaId: val.encuestaId ,respuesta: []}
            arr.push(valor)
        }


        const resultRespuesta = await Respuesta.findAll(
            {
                where: {
                    activo: 1,
                    preguntaId: id
                }
            }
        )


        for(let respuesta of resultRespuesta){

            //console.log(respuesta.preguntaId)
 
        
            const val = arr.find(valor => valor.id === respuesta.preguntaId)

           if(val){

            const resp = {
                id: respuesta.id,
                titulo: respuesta.titulo,
                contadorDeRespuestas: respuesta.contadorDeRespuestas,
                activo: respuesta.activo,
                preguntaId: respuesta.preguntaId
              }


             
               val.respuesta.push(resp)
           }

        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



exports.getByEncuesta = async(req,res) => {
    


    try{

        const encuesta = req.params.encuenta


        const encuestaExiste = await Encuesta.findByPk(encuesta)

        if(!encuestaExiste)throw new Error('no existe la encuesta')
        

        const existe =  await Pregunta.findByPk(id)

        if(!existe)throw new Error('no existe la pregunta')
        
        
        const result = await Pregunta.findAll({
            where: {
                activo: 1,
                id:id
            }
        })


        

        let arr = []
        for(let val of result){
            
            let valor = {id: val.id , titulo: val.titulo , activo: val.activo,encuestaId: val.encuestaId ,respuesta: []}
            arr.push(valor)
        }


        const resultRespuesta = await Respuesta.findAll(
            {
                where: {
                    activo: 1,
                    preguntaId: id
                }
            }
        )


        for(let respuesta of resultRespuesta){

            //console.log(respuesta.preguntaId)
 
        
            const val = arr.find(valor => valor.id === respuesta.preguntaId)

           if(val){

            const resp = {
                id: respuesta.id,
                titulo: respuesta.titulo,
                contadorDeRespuestas: respuesta.contadorDeRespuestas,
                activo: respuesta.activo,
                preguntaId: respuesta.preguntaId
              }


             
               val.respuesta.push(resp)
           }

        }


        res.status(200).json(arr)

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



exports.getPreguntas = async(req,res) => {
    try{

      

        const result = await Pregunta.findAll({
            where: {
                activo: 1
            }
        })

        

        let arr = []
        for(let val of result){
            
            let valor = {id: val.id , titulo: val.titulo , activo: val.activo,encuestaId: val.encuestaId ,respuesta: []}
            arr.push(valor)
        }


        const resultRespuesta = await Respuesta.findAll(
            {
                where: {
                    activo: 1
                }
            }
        )


        for(let respuesta of resultRespuesta){

            //console.log(respuesta.preguntaId)
 
        
            const val = arr.find(valor => valor.id === respuesta.preguntaId)

           if(val){

            const resp = {
                id: respuesta.id,
                titulo: respuesta.titulo,
                contadorDeRespuestas: respuesta.contadorDeRespuestas,
                activo: respuesta.activo,
                preguntaId: respuesta.preguntaId
              }


             
               val.respuesta.push(resp)
           }

        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}