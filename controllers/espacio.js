const Espacio = require('../models/Espacio')
const EspacioXDisciplinaXClub = require('../models/EspacioXDisciplinaXClub')
const db = require('../config/db')
const EstadoEspacio = require('../models/EstadoEspacio')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const ConfiguracionDiasHs = require('../models/ConfiguracionDiasHs')


exports.crearEspacio =  async (req,res) => {
 
 
 
    const t = await db.transaction()

    try{


    const {nombre,image,descripcion,clubId,tiempoDeAnticipacion,maxReservasDia,maxReservasSem,maxReservasAno,deporte,intervaloEntreTurnos,DuracionDeTurnos} = JSON.parse(req.body.data)
    
    console.log( JSON.parse(req.body.data))

    if(req.file){
        let imagen = req.file.filename
        console.log(imagen)

    }
        //el let imagen lo vamos usar cuando migremos a digital ocean


    const result = await Espacio.create({nombre: nombre,image:image, descripcion: descripcion , clubId:clubId, estadoespacioId:1,tiempoDeAnticipacion: tiempoDeAnticipacion,intervaloEntreTurnos: intervaloEntreTurnos,DuracionDeTurnos:DuracionDeTurnos,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem},{ transaction: t })
    
    await ConfiguracionDiasHs.create({espacioId:result.id},{ transaction: t })
    
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


exports.getEspacioByClubId =  async (req,res) => {
    

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

    const { descripcion,valor,maxReservasDia, maxReservasMes,maxReservasSem,maxReservasAno,  DuracionDeTurnos,tiempoDeAnticipacion,intervaloEntreTurnos , lunes , martes , miercoles , jueves , viernes , sabado , domingo  } = req.body

    console.log('el uppdate',req.body)

    const configuracion = await ConfiguracionDiasHs.findOne({
        where:{
            espacioId: id
        }
    })
    
    const result = await Espacio.findByPk(id)

    if(result){

        await Espacio.update({ descripcion: descripcion , tiempoDeAnticipacion: tiempoDeAnticipacion,DuracionDeTurnos: DuracionDeTurnos,intervaloEntreTurnos: intervaloEntreTurnos,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem, maxReservasMes:  maxReservasMes ,valor: valor}, { where: { id: id }})


        

     await ConfiguracionDiasHs.update({lunes: lunes, martes: martes, miercoles: miercoles, jueves: jueves, viernes: viernes, sabado: sabado,domingo: domingo },{ where: { id: configuracion.id }})
     //   const result = await Espacio.create({nombre: nombre,image:image, descripcion: descripcion , clubId:clubId, estadoespacioId:1,tiempoDeAnticipacion: tiempoDeAnticipacion,tiempoDeCancelacion: tiempoDeCancelacion,horasPrevia:horasPrevia,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem},{ transaction: t })
    
 

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

                },
                order: [['id', 'DESC']]

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

    const espacioResult = await Espacio.findOne({
        include: [{
          model: EstadoEspacio,
          as: 'estadoespacio'
        }],
        where: {
            id: id,
            activo: 1
        }
    })
    
    if(!espacioResult)throw new Error('el id del espacio no existe')



    res.status(200).json(espacioResult)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}



exports.getEspacioByDisciplinaXClub =  async (req,res) => {

    try{


    const espacio = req.params.espacio

    const club = req.params.club

    const result = await EspacioXDisciplinaXClub.findAll({
        include:[{
        model: RelDisciplinaXClub,
        as: 'disciplinaxclub',
        where: { clubId: club },
        include:[{
            model: Disciplina,
            as: 'disciplina'
        }]
        }],
        where: {
            activo: 1,
            espacioId: espacio
        }
    })
    


    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}




exports.relacionarEspacioConDisciplinaXClub =  async (req,res) => {
 

    try{


        const espacio = req.params.espacio
    
        const disciplinaxclub = req.params.disciplinaxclubId
    
        const result = await EspacioXDisciplinaXClub.findOne({
  
            where: {
                activo: 1,
                espacioId: espacio,
                disciplinaxclubId: disciplinaxclub
            }
        })

        if(result)throw new Error('el deporte ya se vinculado al espacio')
        
    

        await  EspacioXDisciplinaXClub.create({espacioId:espacio,disciplinaxclubId:disciplinaxclub,activo: 1})
    
        res.status(200).json({message: 'operacion exitosa'})    
    
    
        }catch(error){
    
            res.status(400).json({'error': error.message})
            
        }
 
 


}

