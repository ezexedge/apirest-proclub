const Estados = require('../models/Estados')


exports.getAll = async (req,res)=>{
    try{

        const result =   await Estados.findAll() 
      
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}




exports.getById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await Estados.findByPk(id)
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el excluido no existe')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}