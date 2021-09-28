const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const Club = require('../models/Club')
const DisciplinaXClubXPos  = require('../models/DisciplinaXClubXPos')

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

        const resultFinal = await DisciplinaXClubXPos.findAll({
            include:[{
                model: RelDisciplinaXPos,
                as: 'disciplinaxpos'
            },
        {
            model: RelDisXClubXDiv,
            as: 'disciplinaxclubxdiv'
        }
        ],
            where: {
                disxclubId: result.disciplinaxclubId,
                disciplinaxclubxdivxId: result.id
            },
            activo: 1
        })

        let arr = []
        let flag = 0
        let division 
        for(let val of resultFinal){
            if(flag===0){
                division = val.disciplinaxclubxdiv
                flag = 1
            }
            arr.push(val.disciplinaxpos)
        }


        const obj = {
            division: division,
            posiciones: arr
        }

        res.status(200).json(obj)

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

        const {nombre,posiciones} = req.body
        const clubId = req.params.club
        const disciplinaId = req.params.disciplina

        const club = await Club.findByPk(clubId)
        console.log(req.body)

        if(!club) throw new Error('El club no existe')

        let disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


        let result = await RelDisciplinaXClub.findOne({
            where: {    
                clubId: clubId,
                disciplinaId: disciplinaId,
                activo: 1
            }
        })

        if(result)throw new Error('la disciplina ya se encuentra creada en el club')

        if(!result) {

        result  =   await RelDisciplinaXClub.create({clubId: clubId,disciplinaId:disciplinaId})

        }


        let resp = await RelDisXClubXDiv.create({ nombre: nombre, disciplinaxclubId: result.id })

        if(!resp)throw new Error('error al crear categoria')


        let arr = []

        for(let val of posiciones){
         
         

            let respuesta = await RelDisciplinaXPos.create({disciplinaId: disciplinaId,nombre:val})
         
            let obj = {

                disxclubId: result.id,
                disciplinaxposId: respuesta.id,
                disciplinaxclubxdivxId: resp.id
            }


            arr.push(obj)
        }
        
        
        await DisciplinaXClubXPos.bulkCreate(arr)


        res.status(200).json({message: 'creado correctamente'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}




exports.crearDivisionXClubXDisciplina = async (req,res) => {
    
    try{

        const {nombre} = req.body
        const clubId = req.params.club
        const disciplinaId = req.params.disciplina

        const club = await Club.findByPk(clubId)
        console.log(req.body)

        if(!club) throw new Error('El club no existe')

        let disciplina = await Disciplina.findByPk(disciplinaId)
        
        if(!disciplina) throw new Error('La disiciplina no existe')


         const resultDivision = await RelDisXClubXDiv.findOne({
             where: {
                 nombre : nombre
             }
         })


         if(resultDivision)throw new Error('ya existe una division con ese nombre')

         let result = await RelDisciplinaXClub.findOne({
            where: {    
                clubId: clubId,
                disciplinaId: disciplinaId,
                activo: 1
            }
        })


        if(!result)throw new Error('la relacion de disciplina con club no existe')

        let resp = await RelDisXClubXDiv.create({ nombre: nombre, disciplinaxclubId: result.id })

        if(!resp)throw new Error('error al crear la division')





        res.status(200).json({message: 'division creada correctamente'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}




exports.crearDivisionXClubXDisciplinaXPosicion = async (req,res) => {
    
    try{


      const {posiciones} = req.body
        const clubId = req.params.club
        const disciplinaId = req.params.disciplina


        

        res.status(200).json({message: 'division creada correctamente'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}

