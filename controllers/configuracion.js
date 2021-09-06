const ConfiguracionDiasHs = require("../models/ConfiguracionDiasHs")



exports.getByEspacioId = async(req,res) => {
    try{

        const id = req.params.espacio
    


        const result = await ConfiguracionDiasHs.findOne({
            where: {
                espacioId: id
            }
        })


       res.status(200).json(result)

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}