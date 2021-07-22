const Posicion = require('../models/Posicion')
const Disciplina = require('../models/Disciplina')

exports.getDisciplinaxpos = async (req,res) => {
    
    try{

        const disciplinaId = req.params.disciplina


        const disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


        const result = await Posicion.findAll({
            where: {    
              
                disciplinaId: disciplinaId,
                activo: 1
            }
        })

     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}