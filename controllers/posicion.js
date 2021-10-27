const Posicion = require('../models/Posicion')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Club  = require('../models/Club')
const Disciplina = require('../models/Disciplina')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const RelPosXUsuarioXDivXDep  = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const Usuario = require('../models/Usuario')


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
       const nombre =  req.body.nombre

       const result = await RelDisciplinaXPos.findOne({
           where:{
               id: id,
               activo: 1
           }
       })


       if(!result)throw new  Error('la posicion no existe')


      await RelDisciplinaXPos.update({nombre: nombre },{where: {id : result.id}})
      


       res.status(200).json({message: 'modificado correctamente'})

    }catch(error){

       res.status(400).json({error: error.message})

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
    

       const result = await RelDisciplinaXPos.findByPk(id)


       if(!result) throw new  Error('la posicion no existe')
       

      await RelDisciplinaXPos.update({activo:  0 },{where: {id:id}})
      


       res.status(200).json({message: 'eliminado correctamente'})

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

       res.status(400).json({message: error.message})

    }
}



exports.getAllPosicionesByDivision = async(req,res) => {
    try{

        const disciplina = req.params.disciplina
        const club = req.params.club
    

       const result = await RelDisciplinaXClub.findOne({
           where:{
               clubId: club,
               disciplinaId: disciplina,
               activo: 1
           }
       })




       if(!result)throw new Error('la relacion de disciplina x club no existe')
       

       const resultInfo = await DisciplinaXClubXPos.findAll({

        include: [{
            model: RelDisciplinaXPos,
            as: 'disciplinaxpos',
            where:{activo:1}
        },
        {
            model: RelDisXClubXDiv,
            as: 'disciplinaxclubxdiv'
        }
    ],
        where: {
            disxclubId: result.id,
            activo: 1
        }

       })


       let arr = []

       for(let val of resultInfo){
           if(val.disciplinaxclubxdivxId !== null && val.disciplinaxpos.activo === 1 ){

            

            const cantidadPosicion =  await RelPosXUsuarioXDivXDep.findAndCountAll({
                include:[{
                    model: DisciplinaXClubXPos,
                    as: 'disciplinaxclubxpos',
                    where:{activo:1},
                    include: [{
                        model: RelDisciplinaXPos,
                        as: 'disciplinaxpos',
                        where:{
                            activo:1,
                            id: val.disciplinaxpos.id 
                        }
                    }]
                },

                {
                    model: ClubXUsuario,
                    as: 'clubxusuario',
                    where:{
                        activo: 1
                    },
                    include: [{
                        model: Usuario,
                        as: 'usuario',
                        where:{
                            activo: 1
                        }
                      
                    }]
                }
                    
                

                ]
            })


            console.log('aca las pociones',cantidadPosicion)
            let obj = {
                id: val.disciplinaxpos.id ,
                name: val.disciplinaxpos.nombre,
                role: val.disciplinaxclubxdiv.nombre,
                cantidadUsuarios: cantidadPosicion.count
              }

              arr.push(obj)

           }
       }

       res.status(200).json(arr)

    }catch(error){

       res.status(400).json({error: error.message})

    }
}