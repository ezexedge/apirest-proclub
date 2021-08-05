const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')


exports.getAll = async (req,res) => {
    
    try{

     

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario'
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub'
                }]  
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


exports.filterPosicion = async (req,res) => {
    
    try{

    




    const id = req.params.disxclubxdiv



        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario'
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
                where: {id: id},
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub'
                }]  
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

RelDisXClubXDiv.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})



*/