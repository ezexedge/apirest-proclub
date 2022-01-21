const Categoria = require('../models/Categoria')


exports.getAll = async (req,res) => {

    try {

        
        const result =   await Categoria.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.getById = async (req,res) => {


    try {

        const id = req.params.id



        const result = await Categoria.findOne({
            where:{
                id: id
            }
        })

        if(!result)throw new Error('la cateogira no existe')
        
        res.status(200).json(result)
      
        
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}


exports.crear = async (req,res) => {


    try {

        
        const  {nombre} = req.body


        const existeRubro =  await Categoria.findOne({
            where:{
                nombre: nombre
            }
        })


        if(existeRubro)throw new Error('la categoria existe')


       await  Categoria.create({nombre:nombre})


            res.status(200).json({message: 'creado correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}



exports.eliminar = async (req,res) => {


    try {

        
        const id =  req.params.id


        const existeRubro =  await Categoria.findOne({
            where:{
                id: id
            }
        })




        if(!existeRubro)throw new Error('la categoria existe')


       await  Categoria.destroy({
           where:{
               id: id
           }
       })


            res.status(200).json({message: 'La categoria se elimino correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}

