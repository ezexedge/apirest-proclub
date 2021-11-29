const Categoria = require('../models/Categoria')
const CategoriaDocumentacion = require('../models/CategoriaDocumentacion')


exports.getAll = async (req,res) => {

    try {

        
        const result =   await CategoriaDocumentacion.findAll() 
      
        res.status(200).json(result)
      
    } catch (error) {
        console.log(error);
    }

}


exports.getById = async (req,res) => {


    try {

        const id = req.params.id



        const result = await CategoriaDocumentacion.findByOne({
            where:{
                id: id
            }
        })

        if(!result)throw new Error('la categoria no existe')
        
        res.status(200).json(result)
      
        
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}


exports.crear = async (req,res) => {


    try {

        
        const  {nombre} = req.body


        const existeRubro =  await CategoriaDocumentacion.findOne({
            where:{
                nombre: nombre
            }
        })


        if(existeRubro)throw new Error('la categoria existe')


       await  CategoriaDocumentacion.create({nombre:nombre})


            res.status(200).json({message: 'creado correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}



exports.eliminar = async (req,res) => {


    try {

        
        const id =  req.params.id


        const existeRubro =  await CategoriaDocumentacion.findOne({
            where:{
                id: id
            }
        })




        if(!existeRubro)throw new Error('la categoria existe')


       await  CategoriaDocumentacion.destroy({
           where:{
               id: id
           }
       })


            res.status(200).json({message: 'eliminado correctamente'})


        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}

