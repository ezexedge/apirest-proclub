const Pais = require('../models/Pais')


exports.paisTodos = async (req,res) => {

    try {

        
        const result =   await Pais.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.paisById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await Pais.findByPk(id)

        if(result){
            res.status(200).json(result)
      
        }
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}

