const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Club = require('../models/Club')
const Disciplina = require('../models/Disciplina')


exports.getDeporteXClub = async (req,res)=> {

    try{

        const club = req.params.club

        const resp = await Club.findByPk(club)

        if(resp){


        const result = await RelDisciplinaXClub.findAll({
            include:[{
          
            model: Disciplina,
            as: 'disciplina',
            where: { activo: 1 },
        }],
        where: {
            clubId: club,
            activo: 1
          }  
        })

        res.status(200).json(result)

        }else{

            throw new Error('el club no existe')

        }

        


    }catch(error){

        res.status(400).json({'error': error.message})

    }

}


exports.getDeporteXClubById = async (req,res)=> {

    try{

        const club = req.params.club
        const disciplina = req.params.disciplina


        const result = await RelDisciplinaXClub.findAll({
        include: [
            {
                model:  Club,
                as: 'club'
            },
            {
                model: Disciplina,
                as: 'disciplina',
                where: {activo: 1}
            }
        ]  , 
        where: {
            clubId: club,
            disciplinaId: disciplina
          }  
        })

        if(result.length === 0){
            throw new Error('el club o la disciplina no existe')
        }else{

            res.status(200).json(result)
        }

    }catch(error){

        res.status(400).json({'error': error.message})

    }

}



exports.deleteDeporteXClub = async (req,res)=> {

    try{

        const club = req.params.club
        const disciplina = req.params.disciplina

        const result = await RelDisciplinaXClub.findAll({
            where: {
                clubId: club,
                disciplinaId: disciplina
              }  
            })

        if(result.length === 0){

            throw new Error('el club o la disciplina no existe')

        }else{

            result[0].activo = 0
            await result[0].save()
            res.status(200).json(result)

        }
    
        

    }catch(error){

        res.status(400).json({'error': error.message})
    }

}


exports.createDeporteXClub = async (req,res)=> {

    try{

        const club = req.params.club
        const disciplina = req.params.disciplina

        const resp = await RelDisciplinaXClub.findAll({
            where: {
                clubId: club,
                disciplinaId: disciplina
              }  
            })

        if(resp.length > 0){
            throw new Error('la disciplina ya se encuentra registrada')
        }


        const resultClub = await Club.findOne({
            where:{
                id: club,
                activo: 1
            }
        })

        if(!resultClub){
            throw new Error('el id del club no existe')
        }

        const resultDisciplina = await Disciplina.findOne({
            where:{
                id: club,
                activo: 1
            }
        })

        if(!resultDisciplina){
            throw new Error('el id de disciplina no existe')
        }


        const result = await RelDisciplinaXClub.create({clubId: club , disciplinaId: disciplina})
        
        if(result){
            res.status(200).json(result)
        }else{
            throw new Error('error al crear')
        }

    }catch(error){
        res.status(400).json({'message': error.message})
    }

}