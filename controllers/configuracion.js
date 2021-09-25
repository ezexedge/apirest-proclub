const ConfiguracionDiasHs = require("../models/ConfiguracionDiasHs")
const Espacio = require("../models/Espacio")



exports.getByEspacioId = async(req,res) => {
    try{

        const id = req.params.espacio
    


        const resultEspacio = await Espacio.findByPk(id)


        if(!resultEspacio)throw new Error('El espacio no existe')


        const result = await ConfiguracionDiasHs.findAll({
            where: {
                espacioId: id
            }
        })


       res.status(200).json(result)

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}

exports.eliminarConfiguracion = async(req,res) => {
    try{

       
       const id = req.params.id

       await ConfiguracionDiasHs.destroy({where:{id:id}})
        

       res.status(200).json({message: 'configuracion eliminada correctamente'})

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}