const Encuesta = require('../models/Encuesta')
const Destinatario = require('../models/Destinatario')
const EncuestaXClub = require('../models/EncuestaXClub')
const Club = require('../models/Club')
const ClubXusuario = require('../models/ClubXUsuario')
const Rol = require('../models/rol')
const Pregunta = require('../models/Pregunta')
const Respuesta = require('../models/Respuesta')
const RespuestaUsuario = require('../models/RespuestaUsuario')
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



        let arr = []


        for(let val of result){


            const resultRespuesta =  await RespuestaUsuario.findOne({
                where:{
                    usuarioId:  usuario,
                    encuestaId: val.encuestId
                }
            })



            if(resultRespuesta){

                let obj = {
                    id: val.id,
                    encuestId: val.encuestId,
                    usuarioId: val.usuarioId,
                    enviadoporId: val.enviadoporId,
                    encuesta: val.encuesta,
                    respondida: 1
                }

                arr.push(obj)

            }else{
                let obj = {
                    id: val.id,
                    encuestId: val.encuestId,
                    usuarioId: val.usuarioId,
                    enviadoporId: val.enviadoporId,
                    encuesta: val.encuesta,
                    respondida: 0
                }

                arr.push(obj)
            }
            
          



        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


exports.getByClub = async(req,res) => {
    try{

        const club =  req.params.club

        const clubExist = await Club.findOne({
            where:{
                id: club
            }
        })

        if(!clubExist)throw new Error('El club no existe')



        const result = await EncuestaXClub.findAll({
            include: [{
                model:  Encuesta,
                as: 'encuesta'
            }],
            where: {
                clubId: club
            },
            order: [['id', 'DESC']]
        })
///aca

        let arr = []
        for(let val of result){


            const resultDestinatario = await Destinatario.findOne({

                where:{
                    encuestId: val.encuestaId
                }
            })


            const resultClubXUsuario = await ClubXusuario.findOne({
                include:[{
                    model: Rol,
                    as: 'rol'
                }],
                where:{
                    usuarioId: resultDestinatario.enviadoporId,
                    clubId: club
                }
            })

            let cantidadEnviados = await Destinatario.findAndCountAll({
                where:{
                    encuestId:val.encuestaId
                }
            })


            let obj = {
                id: val.id,
                encuestaId: val.encuestaId,
                titulo: val.encuesta.titulo,
                descripcion: val.encuesta.descripcion,
                fecha: val.encuesta.fecha,
                hora: val.encuesta.hora,
                enviadopor:  resultClubXUsuario.rol ?  resultClubXUsuario.rol.nombre : 'superadmin',
                cantidadEnviados: cantidadEnviados.count
            }
            arr.push(obj)


        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}







exports.getEncuesta = async(req,res) => {
    try{

      
        const encuesta = req.params.encuesta

        const encuestaExist = await Encuesta.findOne({
            where:{
                id: encuesta
            }
        })

        if(!encuestaExist)throw new Error('la encuesta no existe')


        const resultPregunta =  await Pregunta.findAll({
            where:{
                encuestaId: encuestaExist.id
            }
        })

        let cantidadEnviados = await Destinatario.findAndCountAll({
            where:{
                encuestId:encuesta
            }
        })


        const resultRespuesta =  await Respuesta.findAll({})

        let arr = []
        for(let val of resultPregunta){

            const result = resultRespuesta.filter(valor => valor.preguntaId === val.id )

            let obj = {
                encuesta: encuestaExist,
                pregunta: val,
                respuesta: result,
                cantidadEnviados: cantidadEnviados.count

            }

            arr.push(obj)


        }
     


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}