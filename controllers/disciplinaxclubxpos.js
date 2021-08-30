const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const Club = require('../models/Club')
const DisciplinaXClubXPos  = require('../models/DisciplinaXClubXPos')
const db = require('../config/db')




exports.getAll = async (req,res) => {
    
    try{
        

        const club = req.params.club
        const disciplina = req.params.disciplina


        const resp = await RelDisciplinaXClub.findOne({
            where : {
                clubId: club,
                disciplinaId: disciplina,
                activo: 1  
            }
        })


        if(!resp)throw new Error('la disciplina no esta relacionada al club')



        const result =  await DisciplinaXClubXPos.findAll({

            include: [{
                model: RelDisciplinaXClub,
                as: 'disxclub',
                where:{
                    id: resp.id,
                    activo: 1
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
