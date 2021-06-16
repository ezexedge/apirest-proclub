const TipoDocumento = require('../models/TipoDocumento')


exports.tipoDocumentos = async (req,res) => {

    try {
        const result =   await TipoDocumento.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.tipoDocumentoById = async (req,res) => {


    try {

        const id = req.params.id

        const result = await TipoDocumento.findByPk(id)


        res.status(200).json(result)
        
    }catch(error){


    }

}
