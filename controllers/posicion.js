const Posicion = require('../models/Posicion')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Club  = require('../models/Club')
const Disciplina = require('../models/Disciplina')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')


exports.getPosicion = async(req,res) => {
     try{

        const clubId = req.params.club
        const disciplinaId = req.params.disciplina

        const result = await Posicion.findAll({
            include : [{

                model: RelDisciplinaXClub,
                as: 'disciplinaxclub',
                include: [{
                    model: Club,
                    as: 'club'
                }
                
                ,
                {
                   model: Disciplina,
                   as: 'disciplina'
                }

            ],
            where : {
                clubId: clubId,
                disciplinaId: disciplinaId
            }
        }],
        where: {
            activo : 1
        }
    
        })

        if(!result){
            throw new  Error('error al encontrar una posicion')
        }

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'message': error.message})

     }
}




exports.crearPosicion = async(req,res) => {
    try{

       const clubId = req.params.club
       const disciplinaId = req.params.disciplina

       const {nombre} =  req.body

       const result = await RelDisciplinaXClub.findOne({where : {
           clubId: clubId,
           disciplinaId: disciplinaId
       }})


       if(!result){
           throw new  Error('error al agregar una posicion')
       }

      const posicion = await Posicion.create({nombre:  nombre , disciplinaxclubId: result.id})


       res.status(200).json(posicion)

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}


exports.modificarPosicion = async(req,res) => {
    try{

        const id = req.params.id
       const {nombre} =  req.body

       const result = Posicion.findByPk(id)


       if(!result){
           throw new  Error('la posicion no existe')
       }

      await Posicion.update({nombre:  nombre },{where: {id:id}})
      


       res.status(200).json({'message': 'modificado correctamente'})

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}

exports.getPosicionById = async(req,res) => {
    try{

        const id = req.params.id
    

       const result = await Posicion.findByPk(id)


       if(!result){
           throw new  Error('la posicion no existe')
       }

       res.status(200).json(result)

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}


exports.eliminarPosicion = async(req,res) => {
    try{

        const id = req.params.id
    

       const result = Posicion.findByPk(id)


       if(!result){
           throw new  Error('la posicion no existe')
       }

      await Posicion.update({activo:  0 },{where: {id:id}})
      


       res.status(200).json({'message': 'eliminado correctamente'})

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}


exports.crearPosicionAdmin = async(req,res) => {
    try{

       const clubId = req.params.club
       const disciplinaId = req.params.disciplina
       const divisionId = req.params.division

        const posiciones = req.body.posiciones


        const resultDivision = await RelDisXClubXDiv.findByPk(divisionId)

        if(!resultDivision)throw new Error('la division ingresada no existe')

       const result = await RelDisciplinaXClub.findOne({where : {
           clubId: clubId,
           disciplinaId: disciplinaId
       }})


       if(!result)throw new  Error('la relacion discipplina x club no existe')
       

       for(let val of posiciones){

        let resultPosicion = await RelDisciplinaXPos.create({nombre:  val.nombre ,disciplinaId: disciplinaId})
        await  DisciplinaXClubXPos.create({disxclubId: result.id,disciplinaxposId:resultPosicion.id,disciplinaxclubxdivxId: divisionId })
       }



     

       res.status(200).json({message: 'creado correctamente'})

    }catch(error){

       res.status(400).json({'message': error.message})

    }
}