const RelUsuarioXDis = require('../models/RelUsuarioXDis')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const ClubXusuario = require('../models/ClubXUsuario')
const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')

//trae todo los deportes que tiene el id del usuario en el id de un club
exports.getDeportesXclub = async(req,res) => {
    try{

        const usuario = req.params.usuario
        const club =  req.params.club

        const clubxusuarioResp = await ClubXusuario.findOne({
            where:{
                activo: 1,
                clubId: club,
                usuarioId: usuario
            }
        })


        if(!clubxusuarioResp)throw new Error('no hay relacion entre usuario y club')

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [
                {
                    model: RelDisciplinaXClub,
                    as: 'disciplinaxclub',
                    where: {
                        activo: 1
                    },
                    include: [{
                        model: Disciplina,
                        as: 'disciplina',
                        where: {
                            activo: 1
                        }
                    }]
                }
        ],
        
            where:{
                clubxusuarioId: clubxusuarioResp.id,
                activo: 1
            }
        })
        
        
        
        res.status(200).json(result)

    }catch(error){

        console.log(error)

    }
}




exports.getAll = async (req,res) => {
    try{
        const resultado = await RelUsuarioXDis.findAll({
            include : [{
                model:  RelDisciplinaXClub,
                as: 'disciplinaxclub',
                include: [{
                    model: Disciplina,
                    as: 'disciplina'
                }]
            }]
        })
        res.status(200).json(resultado)
    }catch(error){
        console.log(error)
    }
}


/*
        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [
                {
                    model: RelDisciplinaXClub,
                    as: 'disciplinaxclub',
                    where: {
                        activo: 1
                    },
                    include: [{
                        model: Disciplina,
                        as: 'disciplina',
                        where: {
                            activo: 1
                        }
                    }]
                },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub',
                 include:[{
                     model: Disciplina,
                     as: 'disciplina',
                     where: {activo:1}
                 }]
                
                }]  
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
             include: [{
                 model: RelDisciplinaXPos,
                 as: 'disciplinaxpos',
                 where: {activo:1}
             }]
            }
        ],
        
            where:{
                clubxusuarioId: resultClubXUsuario.id,
                activo: 1
            }
        })


*/