const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Usuario = require('../models/Usuario')
const Persona = require('../models/Persona')
exports.getAll = async (req,res) => {
    
    try{

     

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }]
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


        let arr = []
        for(let val of result){
         
         let obj = {
           id: val.id,
           nombre: val.disciplinaxclubxpos.disciplinaxpos.nombre,
           disciplinaxclubxposId: val.disciplinaxclubxposId,
           disxclubxdivId: val.disxclubxdivId
         }
         arr.push(obj)
        }

        const mySet = new Set();

        for(let val of arr){
            mySet.add(val)
        }
     

        res.status(200).json(mySet)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}




exports.filterUsuario = async (req,res) => {
    
    try{

    




     const disciplinaxclubxposId = req.params.disciplinaxclubxposId
     const disxclubxdivId = req.params.disxclubxdivId



        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }]
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
                where: {id:disxclubxdivId },
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub'
                }]  
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
             where: {id:disciplinaxclubxposId},
             include: [{
                 model: RelDisciplinaXPos,
                 as: 'disciplinaxpos'
             }]
            }
        ]
        })

     
        let arr = []
        
        for(let val of result){
            const obj = {
                id: val.id,
                clubxusuarioId: val.clubxusuarioId,
                nombre: val.clubxusuario.usuario.persona.nombre,
                apellido: val.clubxusuario.usuario.persona.apellido
            
            }


            arr.push(obj)

        }


        res.status(200).json(arr)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}



/*

RelDisXClubXDiv.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})



*/