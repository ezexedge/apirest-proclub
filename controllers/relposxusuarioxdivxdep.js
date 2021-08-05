const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
exports.getAll = async (req,res) => {
    
    try{

     

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario'
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv'  
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
             include: [{
                 model: RelDisciplinaXPos,
                 as: 'disciplinaxpos'
             }]
            }
        ]
        })

     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}


/*
RelPosXUsuarioXDivXDep.belongsTo(ClubXUsuario,{as:"clubxusuario", foreignKey: 'clubxusuarioId'})
RelPosXUsuarioXDivXDep.belongsTo(RelDisXClubXDiv,{as:"disxclubxdiv",foreignKey: 'disxclubxdivId'})
RelPosXUsuarioXDivXDep.belongsTo(DisciplinaXClubXPos,{as:"disciplinaxclubxpos", foreignKey: 'disciplinaxclubxposId'})



DisciplinaXClubXPos.belongsTo(RelDisciplunaXClub,{as:"disxclub",foreignKey: 'disxclubId'})
DisciplinaXClubXPos.belongsTo(RelDisciplinaXPos,{as:"disciplinaxpos", foreignKey: 'disciplinaxposId'})

*/