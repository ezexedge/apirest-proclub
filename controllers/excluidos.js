const Excluidos = require('../models/Excluidos')
const ClubXusuario = require('../models/ClubXUsuario')
const FCM = require('fcm-node')
const admin = require('firebase-admin')

exports.getAll = async (req,res) =>{
    try{


        const result = await Excluidos.findAll({})
    
        res.status(200).json(result)    
    
    
        }catch(error){
    
            res.status(400).json({'error': error.message})
        }
}


exports.getById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await ClubXusuario.findByPk(id)
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('el excluido no existe')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.crear = async(req,res) =>{
    try{


        const id = req.params.id

        const result = await ClubXusuario.findByPk(id)
        
        
        if(!result) throw new Error('el excluido no existe')
        

        const resp = await Excluidos.create({clubxusuarioId: result.id})

        res.status(200).json(resp)


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.test = async(req,res) =>{


    try{

    
        var condition = "'falcons' in topics || 'patriots' in topics";

// Define the message payload
var payload = {
  notification: {
    title: "Super Bowl LI: Falcons vs. Patriots",
    body: "Your team is Super Bowl bound! Get the inside scoop on the big game."
  }
};

// Send a message to the condition with the provided payload
   //admin.messaging.sendToCondition(condition, payload)
    const result = await  admin.messaging().sendToCondition(condition,payload)

    res.status(200).json(result)
    

    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}
