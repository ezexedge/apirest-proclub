const Disciplina = require('../models/Disciplina')



exports.crearDisciplina =  async (req,res) => {

    try{
        
        const {nombre , descripcion} = req.body
        
        console.log(req.body)
    const result = await Disciplina.create({nombre: nombre, descripcion: descripcion})
    
    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getDisciplina =  async (req,res) => {

    try{


    const result = await Disciplina.findAll({
        where: {
            activo: 1
          }
    })

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getDisciplinaById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await Disciplina.findByPk(id)
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('la disciplina no existe')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.updateDisciplina =  async (req,res) => {

    try{

    const id = req.params.id

    const {nombre,descripcion} = req.body

    const result = await Disciplina.findByPk(id)

    if(result){

        await Disciplina.update({nombre: nombre, descripcion: descripcion}, { where: { id: id }})

        res.status(200).json({'message': 'modificado correctamente'})    
    
    }else{
        throw new Error('la disciplina no existe')
    }


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.eliminarDisciplina =  async (req,res) => {

    try{

        const id = req.params.id

        const result = await Disciplina.findByPk(id)

        if(result){
            
            result.activo = 0

            await result.save()
            res.status(200).json(result)
          
            
        }else{
            throw new Error('la disciplina no existe')
        }

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}