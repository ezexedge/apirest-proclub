const RubroXBeneficio = require('../models/RubroXBeneficio')
const Beneficios = require('../models/Beneficios')
const Rubro = require('../models/Rubro')

exports.getBeneficioByRubro = async (req,res) => {


    try {

        const rubro = req.params.rubro


        
        const resultRubro = await Rubro.findOne({
            where:{
                id: rubro
            }
        })

        if(!resultRubro)throw new Error('El rubro no existe')



        const result = await RubroXBeneficio.findAll({
            include:[{
                model: Beneficios,
                as: 'beneficio',
                where:{
                    activo:1
                }
            }],
            where:{
                rubroId:rubro
            }
        })

        
        res.status(200).json(result)
      
        
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}
