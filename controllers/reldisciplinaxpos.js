const Posicion = require('../models/Posicion')
const Disciplina = require('../models/Disciplina')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')

exports.getDisciplinaxpos = async (req,res) => {
    
    try{

        const disciplinaId = req.params.disciplina


        const disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


        const result = await RelDisciplinaXPos.findAll({
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



exports.agregarPosicionEnDisciplina = async (req,res) => {
    
    try{

        const disciplinaId = req.params.disciplina
        const nombre =  req.body.nombre.toLowerCase() 




        const disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')

        const nombreResult = await RelDisciplinaXPos.findOne({
            where: {nombre: nombre,disciplinaId:disciplinaId}
        })
        
        if(nombreResult)throw new Error('La posicion existe en la disciplina elegida')

       await RelDisciplinaXPos.create({nombre: nombre, disciplinaId: disciplinaId})
    
     

        res.status(200).json({message: 'poscion agregada'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}