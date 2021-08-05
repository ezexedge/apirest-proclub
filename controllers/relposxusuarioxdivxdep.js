const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')


exports.getAll = async (req,res) => {
    
    try{

     

        const result = await RelPosXUsarioXDiviXDep.findAll({})
        
     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}