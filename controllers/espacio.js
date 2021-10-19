const Espacio = require('../models/Espacio')


exports.crearEspacio =  async (req,res) => {

    try{

        
    const {nombre, descripcion,clubId,estadoespacioId,tiempoDeCancelacion,tiempoDeAnticipacion,maxReservasDia,maxReservasSem,maxReservasAno,horasPrevia} = req.body
    



    const result = await Espacio.create({nombre: nombre, descripcion: descripcion , clubId:clubId, estadoespacioId:estadoespacioId,tiempoDeAnticipacion: tiempoDeAnticipacion,tiempoDeCancelacion: tiempoDeCancelacion,horasPrevia:horasPrevia,maxReservasAno:maxReservasAno,maxReservasDia:maxReservasDia,maxReservasSem:maxReservasSem})
    
    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacio =  async (req,res) => {

    try{


    const result = await Espacio.findAll({})

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getEspacioById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await Espacio.findByPk(id)
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el espacio no existe')
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