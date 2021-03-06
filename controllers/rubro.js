const Rubro = require('../models/Rubro')


exports.getAll = async (req,res) => {

    try {

        
        const result =   await Rubro.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.getById = async (req,res) => {


    try {

        const id = req.params.id



        const result = await Rubro.findByOne({
            where:{
                id: id
            }
        })

        if(!result)throw new Error('el rubro no existe')
        
        res.status(200).json(result)
      
        
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}


exports.crear = async (req,res) => {


    try {

        
        const  {nombre} = req.body


        const existeRubro =  await Rubro.findOne({
            where:{
                nombre: nombre
            }
        })


        if(existeRubro)throw new Error('El rubro existe')


       await  Rubro.create({nombre:nombre})


            res.status(200).json({message: 'El rubro se creo correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}



exports.eliminar = async (req,res) => {


    try {

        
        const id =  req.params.id


        const existeRubro =  await Rubro.findOne({
            where:{
                id: id
            }
        })




        if(!existeRubro)throw new Error('El rubro no existe')


       await  Rubro.destroy({
           where:{
               id: id
           }
       })


            res.status(200).json({message: 'El rubro se elimino correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}

