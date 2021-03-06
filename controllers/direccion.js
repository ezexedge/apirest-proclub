const Direccion = require('../models/Direccion')


exports.direccionTodos = async (req,res) => {

    try {

        
        const result =   await Direccion.findAll() 
      
        res.status(200).json(result)
      
    } catch (err) {
        res.status(400).json(err)
    }

}


exports.direccionById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await Direccion.findByPk(id)

      if(!result)throw new Error('la direccion no existe')


      res.status(200).json(result)
       
        
    }catch(error){

        res.status(400).json({'error' : error.message})

    }

}