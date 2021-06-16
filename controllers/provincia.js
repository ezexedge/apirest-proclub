const Provincia = require('../models/Provincia')


exports.provinciaTodos = async (req,res) => {

    try {
        const result =   await Provincia.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}

exports.provinciaPorPaisById = async (req,res) => {


    try {

        const result = await Provincia.findAll({
            where: {
              countryId: req.params.id
            }
        })


        res.status(200).json(result)
        
    }catch(error){


    }

}


exports.provinciaById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await Provincia.findByPk(id)


        res.status(200).json(result)
        
    }catch(error){


    }

}