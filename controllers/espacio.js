const Espacio = require('../models/Espacio')
const EspacioXDisciplinaXClub = require('../models/EspacioXDisciplinaXClub')
const db = require('../config/db')


exports.crearEspacio =  async (req,res) => {
 
 
 
    const t = await db.transaction()

    try{


    const {nombre,image,descripcion,clubId,tiempoDeCancelacion,tiempoDeAnticipacion,maxReservasDia,maxReservasSem,maxReservasAno,horasPrevia,deporte} = JSON.parse(req.body.data)
    
    console.log( JSON.parse(req.body.data))

    if(req.file){
        let imagen = req.file.filename
        console.log(imagen)

    }
        //el let imagen lo vamos usar cuando migremos a digital ocean


    const result = await Espacio.create({nombre: nombre,image:image, descripcion: descripcion , clubId:clubId, estadoespacioId:1,tiempoDeAnticipacion: tiempoDeAnticipacion,tiempoDeCancelacion: tiempoDeCancelacion,horasPrevia:horasPrevia,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem},{ transaction: t })
    
    await  EspacioXDisciplinaXClub.create({espacioId:result.id,disciplinaxclubId:deporte,activo: 1},{ transaction: t })

    await t.commit();

    res.status(200).json({message: 'espacio creado'})    


    }catch(error){


        await t.rollback();

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacio =  async (req,res) => {

    try{


    const result = await Espacio.findAll({
        where: {activo: 1}
    })

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacioById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await Espacio.findOne({
            where: {activo: 1, id: id}
        })
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el espacio no existe ')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.updateEspacio =  async (req,res) => {

    try{

    const id = req.params.id

    const {nombre, descripcion,clubId,estadoespacioId,tiempoDeCancelacion,tiempoDeAnticipacion,maxReservasDia,maxReservasSem,maxReservasAno,horasPrevia} = req.body

    const result = await Espacio.findByPk(id)

    if(result){

        await Espacio.update({nombre: nombre, descripcion: descripcion , clubId:clubId, estadoespacioId:estadoespacioId,tiempoDeAnticipacion: tiempoDeAnticipacion,tiempoDeCancelacion: tiempoDeCancelacion,horasPrevia:horasPrevia,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem}, { where: { id: id }})

        res.status(200).json({'message': 'modificado correctamente'})    
    
    }else{
        throw new Error('el Espacio no existe')
    }


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.eliminarEspacio =  async (req,res) => {

    try{

        const id = req.params.id

        const result = await Espacio.findByPk(id)

        if(result){
            
            result.activo = 0

            await result.save()
            res.status(200).json({message: 'eliminado'})
          
            
        }else{
            throw new Error('El espacio no existe')
        }

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}

exports.getEspacioByClubId =  async (req,res) => {

    try{


        const club = req.params.club

        if(!club)throw new Error('el club no existe')

        const result = await Espacio.findAll({
            where: {
            activo: 1,
            clubId: club

                }
        })
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el espacio no existe ')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}
//getEspacioByClubId