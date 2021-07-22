const RelDivXClubXDis = require('../models/RelDivXClubXDis')
const Club = require('../models/Club')
const Disciplina = require('../models/Disciplina')

exports.getByClubByDis = async(req,res) =>{

    try{

        const club =  req.params.club
        const disciplina = req.params.disciplina

        const resultClub = await  Club.findByPk(club)

        if(!resultClub)throw new Error('El club no existe')

        const resultDisciplina = await  Disciplina.findByPk(disciplina)

        if(!resultDisciplina)throw new Error('la disciplina  no existe')



        const result = await  RelDivXClubXDis.findAll({
            where: {
                clubId: club,
                disciplinaId: disciplina
            }
        })



        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})

    }
}