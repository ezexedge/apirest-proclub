const EstadoEspacio = require('../models/EstadoEspacio')


exports.getAll = async (req,res) => {

    try {

        
        const result =   await EstadoEspacio.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.getById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await EstadoEspacio.findByPk(id)

        if(result){
            res.status(200).json(result)
      
        }
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}

