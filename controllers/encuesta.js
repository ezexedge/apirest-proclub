const Encuesta = require('../models/Encuesta')
const Destinatario = require('../models/Destinatario')
const EncuestaXClub = require('../models/EncuestaXClub')
const Club = require('../models/Club')
const ClubXusuario = require('../models/ClubXUsuario')
const Rol = require('../models/rol')
const Pregunta = require('../models/Pregunta')
const Respuesta = require('../models/Respuesta')
const RespuestaUsuario = require('../models/RespuestaUsuario')
const Usuario = require('../models/Usuario')
const Persona = require('../models/Persona')
const moment = require('moment')
const _ = require('lodash')


exports.crear = async(req,res) => {
    try{



        const {titulo,descripcion} = req.body

        const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')


        const result  =  await Encuesta.create({titulo: titulo,descripcion:descripcion,hora:hora })


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

        const usuario = req.params.userId
        const club =  req.params.clubId



        const existeUsuario =  await Usuario.findOne({
            where:{
                id: usuario
            }
        })

        if(!existeUsuario)throw new Error('el usuario no existe')


        const result = await Destinatario.findAll({
            include:[{
                model: Encuesta,
                as: 'encuesta'
            }],
            where: {
                enviadoporId: Number(usuario),
                clubId:club
            },
            order: [['id', 'DESC']]

        })


        let arr = []
        for(let val of result){

            const encontrado = arr.find(user => user.encuestId === val.encuestId && Number(usuario) === val.enviadoporId);
            
            if(!encontrado){

                let obj = {
                    id: val.id,
                    encuestId: val.encuestId,
                    enviadoporId: val.enviadoporId,
                    clubId: val.clubId,
                    encuesta: val.encuesta
                }


              arr.push(obj)
            }
            
    }
        




        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}



//getEncuestaPorUsuario



exports.getEncuestaPorUsuario = async(req,res) => {
    try{

        const usuario = req.params.userId
        const club = req.params.clubId


        const usuarioExiste = await Usuario.findOne({
            where:{
                id: Number(usuario)
            }
        })

        if(!usuarioExiste)throw new Error('El usuario no existe')


       const clubExiste =  await Club.findOne({
           where: {
               id: Number(club)
           }
       })

    if(!clubExiste)throw new Error('el club no existe')


        const result = await Destinatario.findAll({
            include:[{
                model: Encuesta,
                as: 'encuesta'
            }],
            where: {
                usuarioId: usuario,
                clubId: club
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



            if(!resultRespuesta){

                let obj = {
                    id: val.id,
                    encuestId: val.encuestId,
                    usuarioId: val.usuarioId,
                    clubId: val.clubId,
                    enviadoporId: val.enviadoporId,
                    encuesta: val.encuesta
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
                as: 'encuesta',
                where:{
                    superadmin: 0
                }
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
                include:[{
                    model: Usuario,
                    as: 'enviadoPor',
                    include:[{
                        model: Persona,
                        as: 'persona'
                    }]
                }], 

                where:{
                    encuestId: val.encuestaId
                }
            })


       

            let cantidadEnviados = await Destinatario.findAndCountAll({
                where:{
                    encuestId:val.encuestaId
                }
            })

//agregar el enviado por luego
            let obj = {
                id: val.id,
                encuestaId: val.encuestaId,
                titulo: val.encuesta.titulo,
                descripcion: val.encuesta.descripcion,
                fecha: val.encuesta.fecha,
                hora: val.encuesta.hora,
                enviadoPor: resultDestinatario && resultDestinatario.enviadoPor && resultDestinatario.enviadoPor.persona && `${resultDestinatario.enviadoPor.persona.nombre} ${resultDestinatario.enviadoPor.persona.apellido}`,
                cantidadEnviados: cantidadEnviados.count
            }
            arr.push(obj)


        }


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}






exports.getBySuperAdmin = async(req,res) => {
    try{

       
        const result = await Encuesta.findAll({
            where: {
                superadmin: 1,
                activo: 1
            },
            order: [['id', 'DESC']]
        })
///aca

        let arr = []
        for(let val of result){


     

       

            let cantidadEnviados = await Destinatario.findAndCountAll({
                where:{
                    encuestId:val.id
                }
            })

//agregar el enviado por luego
            let obj = {
                id: val.id,
                titulo: val.titulo,
                descripcion: val.descripcion,
                fecha: val.fecha,
                hora: val.hora,
                enviadoPor: 'superadmin',
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



        let cantidadEnviadosCount = await Destinatario.findAndCountAll({
            where:{
                encuestId:encuesta
            }
        })

        let cantidadEnviados = await Destinatario.findAll({
            include:[{
                model: Usuario,
                as: 'usuario',
                include:[{
                    model: Persona,
                    as: 'persona'
                }]
            }],
            where:{
                encuestId:encuesta
            }
        })


        let arrUsuarios = []
        for(let val of cantidadEnviados){
            let obj = {
                nombre: val.usuario && val.usuario.persona && `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`,
                dni: val.usuario && val.usuario.persona && val.usuario.persona.documento,
                telefono: val.usuario && val.usuario.persona && val.usuario.persona.telefono,
                estado: val.usuario && val.usuario.activo === 1 ? 'activo' : 'eliminado'
 
             }
             arrUsuarios.push(obj)
        }


        const resultRespuesta =  await Respuesta.findAll({})

        let arr = []
        for(let val of resultPregunta){

            const result = resultRespuesta.filter(valor => valor.preguntaId === val.id )

            let obj = {
                encuesta: encuestaExist,
                pregunta: val,
                respuesta: result,
                usuario: arrUsuarios,
                cantidadEnviados: cantidadEnviadosCount.count


            }

            arr.push(obj)


        }
     


        res.status(200).json(arr)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


