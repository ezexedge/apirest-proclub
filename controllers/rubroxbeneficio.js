const RubroXBeneficio = require('../models/RubroXBeneficio')
const Beneficios = require('../models/Beneficios')
const Rubro = require('../models/Rubro')

exports.getRubroByBeneficio = async (req,res) => {


    try {

        const beneficio = req.params.beneficio


        
        const resultBeneficio = await Beneficios.findOne({
            where:{
                id: beneficio
            }
        })

        if(!resultBeneficio)throw new Error('el beneficio no existe')


        const result = await RubroXBeneficio.findAll({
            include:[{
                model: Rubro,
                as: 'rubro'
            }],
            where:{
                beneficioId: beneficio
            }
        })

        
        res.status(200).json(result)
      
        
        
    }catch(err){

        res.status(400).json({'error': err.message})

    }

}
