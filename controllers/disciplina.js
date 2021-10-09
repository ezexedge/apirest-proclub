const Disciplina = require('../models/Disciplina')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Club = require('../models/Club')
const RelPosXUsuarioXDivXDep = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const Usuario = require('../models/Usuario')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')

exports.crearDisciplina =  async (req,res) => {

    try{
        
        const {nombre , descripcion,icono} = req.body
        
        console.log(req.body)
    const result = await Disciplina.create({nombre: nombre, descripcion: descripcion,icono:icono})
    
    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getDisciplina =  async (req,res) => {

    try{


    const result = await Disciplina.findAll({
        where: {
            activo: 1
          }
    })

    res.status(200).json(result)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.getDisciplinaById =  async (req,res) => {

    try{


        const id = req.params.id

        const result = await Disciplina.findByPk(id)
        
        
        if(result){

    
            res.status(200).json(result)    
        
        }else{
            throw new Error('la disciplina no existe')
        }
    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.updateDisciplina =  async (req,res) => {

    try{

    const id = req.params.id

    const {nombre} = req.body

    const result = await Disciplina.findByPk(id)

    if(result){

        await Disciplina.update({nombre: nombre}, { where: { id: id }})

        res.status(200).json({'message': 'modificado correctamente'})    
    
    }else{
        throw new Error('la disciplina no existe')
    }


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}


exports.eliminarDisciplina =  async (req,res) => {

    try{

        const id = req.params.id

        const result = await Disciplina.findByPk(id)

        if(result){
            
            result.activo = 0

            await result.save()
            res.status(200).json({message: 'eliminado correctamente'})
          
            
        }else{
            throw new Error('la disciplina no existe')
        }

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}




exports.getEstadistica =  async (req,res) => {

    try{

    const deporte = req.params.deporte


    const resultClub = await RelDisciplinaXClub.findAndCountAll({
        include:[{
            model: Club,
            as: 'club',
            where:{
                activo: 1
            }
        }],
        where: {
            disciplinaId: deporte,
            activo: 1
          }
    })


    const resultSocios = await RelPosXUsuarioXDivXDep.findAndCountAll({
        include:[{
            model: ClubXUsuario,
            as: 'clubxusuario',
            where:{
                activo: 1,
                rolId: 3
            },
            include: [{
                model: Usuario,
                as: 'usuario',
                where:{
                    activo: 1
                }
            }]
        },
        {
            model: RelDisXClubXDiv,
            as: 'disxclubxdiv',
            include: [{
                model: RelDisciplinaXClub,
                as: 'disciplinaxclub',
               where:{
                disciplinaId: deporte
               }
            }]
        }
    ]
    })


    const resultManager = await RelPosXUsuarioXDivXDep.findAndCountAll({
        include:[{
            model: ClubXUsuario,
            as: 'clubxusuario',
            where:{
                activo: 1,
                rolId: 4
            },
            include: [{
                model: Usuario,
                as: 'usuario',
                where:{
                    activo: 1
                }
            }]
        },
        {
            model: RelDisXClubXDiv,
            as: 'disxclubxdiv',
            include: [{
                model: RelDisciplinaXClub,
                as: 'disciplinaxclub',
               where:{
                disciplinaId: deporte
               }
            }]
        }
    ]
    })
    


    let obj = {
        club: resultClub.count,
        socios: resultSocios.count,
        manager: resultManager.count
    }

    res.status(200).json(obj)    


    }catch(error){

        res.status(400).json({'error': error.message})
        
    }
}