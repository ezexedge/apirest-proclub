const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const Club = require('../models/Club')
const DisciplinaXClubXPos  = require('../models/DisciplinaXClubXPos')




exports.getAll = async (req,res) => {
    
    try{
        

        const club = req.params.club
        const disciplina = req.params.disciplina


        const result =  await DisciplinaXClubXPos.findAll({

            include: [{
                model: RelDisciplinaXClub,
                as: 'disxclub',
                where:{
                    clubId: club,
                    disciplinaId: disciplina
                }
            },{
                model:  RelDisXClubXDiv,
                as: 'disciplinaxclubxdiv'

            },{
                model: RelDisciplinaXPos,
                as: 'disciplinaxpos'
            }
        ]

        })


        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}
