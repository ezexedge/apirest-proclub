const Rol = require('../models/rol')

exports.rolTodos = async (req,res) => {

    try {

        
        const result =   await Rol.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}

exports.rolById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await Rol.findByPk(id)


        res.status(200).json(result)
        
    }catch(error){


    }

}
