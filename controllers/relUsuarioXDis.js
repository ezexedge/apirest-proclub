const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')


//trae todo los deportes que tiene el id del usuario en el id de un club
exports.getDeportesXclub = async(req,res) => {
    try{

        const id = req.params.id
        
        const result = await RelUsuarioXDis.findAll({
            include : [{
                model:  RelDisciplinaXClub,
                as: 'disciplinaxclub',
                include: [{
                    model: Disciplina,
                    as: 'disciplina'
                }]
            }],
            where:{
                clubxusuarioId: id,
                activo:1
              }
        })

        res.status(200).json(result)

    }catch(error){

        console.log(error)

    }
}


exports.getAll = async (req,res) => {
    try{
        const resultado = await RelUsuarioXDis.findAll()
        res.status(200).json(result)
    }catch(error){
        console.log(error)
    }
}