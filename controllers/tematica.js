const Tematica = require('../models/Tematica')



exports.getAll = async(req,res) => {

    try{

        const result = await Tematica.findAll()

        res.status(200).json(result)


    }catch(err){
        res.status(400).json({message:err})
    }
}