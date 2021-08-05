const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const Club = require('../models/Club')

exports.getAll = async (req,res) => {
    
    try{

        const clubId = req.params.club
        const disciplinaId = req.params.disciplina

        const club = await Club.findByPk(clubId)

        if(!club) throw new Error('El club no existe')

        const disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


        const result = await RelDisciplinaXClub.findOne({
            where: {    
                clubId: clubId,
                disciplinaId: disciplinaId,
                activo: 1
            }
        })

        if(!result) throw new Error('la disciplinaxclub no existe')


        const resp = await RelDisXClubXDiv.findAll({
            where: {    
                disciplinaxclubId: result.id,
                activo: 1
            }
        })




        res.status(200).json(resp)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}


exports.getId = async(req,res) => {
    try{

        const id = req.params.id
        const result = await RelDisXClubXDiv.findByPk(id)

        if(!result)throw new Error('la categoria no existe')

        res.status(200).json(result)

    }catch(error){

        res.status(400).json({'error': error.message})
    }
}


exports.getByDisciplinaXClubId = async(req,res) => {
    try{

     const  club = req.params.club
     const  disciplina = req.params.disciplina
    
     const disciplinaxclub = await RelDisciplinaXClub.findOne({
         where: {
            clubId: club,
            disciplinaId: disciplina
         }
     })
    if(!disciplinaxclub)throw new Error('el club y disciplina no existe o no coinciden')

    res.status(200).json(disciplinaxclub)
     


    }catch(error){

        res.status(400).json({'error': error.message})
    }
}

exports.eliminar = async (req,res) => {
    
    try{

        const id = req.params.id

        const categoria = await RelDisXClubXDiv.findByPk(id)

        if(!categoria) throw new Error('La categoria no existe')

        categoria.activo = 0

        await categoria.save()

        res.status(200).json(categoria)
        

    }catch(error){

        res.status(400).json({'error': error.message})
    

    }
}

exports.editar = async (req,res) => {
    try{

        const id = req.params.id
        const {nombre} =  req.body

        const result = await RelDisXClubXDiv.update({nombre: nombre},{where: {id:id}})

        if(!result)throw new Error()

        res.status(200).json({'message': 'se modifico la categoria'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}


exports.crear = async (req,res) => {
    
    try{

        const {nombre} = req.body
        const clubId = req.params.club
        const disciplinaId = req.params.disciplina

        const club = await Club.findByPk(clubId)

        if(!club) throw new Error('El club no existe')

        const disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


        const result = await RelDisciplinaXClub.findOne({
            where: {    
                clubId: clubId,
                disciplinaId: disciplinaId,
                activo: 1
            }
        })

        if(!result) throw new Error('la disciplinaxclub no existe')


        const resp = await RelDisXClubXDiv.create({ nombre: nombre, disciplinaxclubId: result.id })

        if(!resp)throw new Error('error al crear categoria')


        res.status(200).json(resp)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}
