const RelPosXUsarioXDiviXDep = require('../models/RelPosXUsarioXDiviXDep')
const ClubXUsuario = require('../models/ClubXUsuario')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Usuario = require('../models/Usuario')
const Persona = require('../models/Persona')
const Disciplina = require('../models/Disciplina')
const Rol = require('../models/rol')
const Club = require('../models/Club')
const db = require('../config/db')

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
        ],
        where:{
            activo: 1
        }
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


        const resultFinal =arr.filter((v,i) => {
            return arr.map((val)=> val.nombre).indexOf(v.nombre) == i
          })
       
        res.status(200).json(resultFinal)

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
                 as: 'disciplinaxclub',
                 include:[{
                     model: Disciplina,
                     as: 'disciplina'
                 }]
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
        ],
        where:{
            activo:1
        }
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



            
        const resultFinal =arr.filter((v,i) => {
            return arr.map((val)=> val.clubxusuarioId).indexOf(v.clubxusuarioId) == i
          })
       

        res.status(200).json(resultFinal)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}



exports.filterClubPosicion = async (req,res) => {
    
    try{

    




     const club = req.params.club


    const resultFinal = await DisciplinaXClubXPos.findAll({
        include:[{
            model: RelDisciplinaXPos,
            as: 'disciplinaxpos'
        }],
        where: {
            disxclubId: club,

        }
    })

         let arr = []
         for(let val of resultFinal){
            let obj = {
                posicion: val.disciplinaxpos.nombre,
                disciplinaxclubxpos: val.id
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
/////MOBILE



exports.filterUsuarioPorClub = async (req,res) => {
    
    try{

    




    const id = req.params.club



        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: {clubId: id},
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
                 as: 'disciplinaxclub',
                 include:[{
                    model: Disciplina,
                    as: 'disciplina'
                }]
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
        ],
        where:{
            activo: 1
        }
        })


        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}



exports.filterUsuarioPorClubPorDeporte = async (req,res) => {
    
    try{

    




    const id = req.params.club
    const deporte = req.params.disxclub

console.log('//////////////',deporte)
    const result = await RelPosXUsarioXDiviXDep.findAll({
        include: [{
            model: ClubXUsuario,
            as: 'clubxusuario',
            where: {clubId: id},
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
        },{
            model: RelDisciplinaXClub,
            as: 'disciplinaxclub', 
        }
    ],
    where:{
        disciplinaxclubId: deporte
    }
    })


    let arr = []
      for(let val of result){

        arr.push(val.clubxusuario)
      }


        res.status(200).json(arr)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}



exports.filterUsuarioPorClubPorDeportePorDivision = async (req,res) => {
    
    try{

    




    const id = req.params.club
    const deporte = req.params.disxclub
    const division = req.params.disxclubxdiv

console.log('//////////////',deporte)
    const result = await RelPosXUsarioXDiviXDep.findAll({
        where:{disxclubxdivId:division},
        include: [{
            model: ClubXUsuario,
            as: 'clubxusuario',
            where: {clubId: id},
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
            where: {disciplinaxclubId: deporte},
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
    ],
    where:{
        activo: 1
    }


    })

    let arr = []
    for(let val of result){

      arr.push(val.clubxusuario)
    }




        res.status(200).json(arr)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}


exports.filterUsuarioPorClubPorDeportePorDivisionPorPosicion = async (req,res) => {
    
    try{

    




    const id = req.params.club
    const deporte = req.params.disxclub
    const division = req.params.disxclubxdiv
    const posicion = req.params.disciplinaxclubxpos

console.log('//////////////',deporte)
    const result = await RelPosXUsarioXDiviXDep.findAll({
        where:{
            disxclubxdivId:division,
            disciplinaxclubxposId: posicion
        },
        include: [{
            model: ClubXUsuario,
            as: 'clubxusuario',
            where: {clubId: id},
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
            where: {disciplinaxclubId: deporte},
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
    ],

    where:{
        activo: 1
    }

    })


    let arr = []
    for(let val of result){

      arr.push(val.clubxusuario)
    }

        res.status(200).json(arr)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}





exports.getDeportes = async (req,res) => {
    
    try{

        
        const user = req.params.userId
        const club = req.params.club
 



        const resultClubXUsuario = await ClubXUsuario.findOne({
            where:{
                clubId: club,
                usuarioId: user,
                activo: 1
            }
        })

       

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [
                {
                    model: RelDisciplinaXClub,
                    as: 'disciplinaxclub',
                    where: {
                        activo: 1
                    },
                    include: [{
                        model: Disciplina,
                        as: 'disciplina',
                        where: {
                            activo: 1
                        }
                    }]
                },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub',
                 include:[{
                     model: Disciplina,
                     as: 'disciplina',
                     where: {activo:1}
                 }]
                
                }]  
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
             include: [{
                 model: RelDisciplinaXPos,
                 as: 'disciplinaxpos',
                 where: {activo:1}
             }]
            }
        ],
        
            where:{
                clubxusuarioId: resultClubXUsuario.id,
                activo: 1
            }
        })

     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}







exports.crearDeportesEnUsuarioPerfil = async (req,res) => {
    

    
    try{

        
        const user = req.params.userId
        const club = req.params.club
        const disciplina = req.params.disciplina
        const  div = req.params.div
        const pos = req.params.pos
 


        //clubxusuario
        const resultClubXUsuario = await ClubXUsuario.findOne({
            where:{
                clubId: club,
                usuarioId: user,
                activo: 1
            }
        })

        if(!resultClubXUsuario)throw new Error('el usuario no esta realacionado con el club')

       




        const resultDisciplinaXClub = await RelDisciplinaXClub.findOne({
            where:{
                clubId: club,
                disciplinaId: disciplina,
                activo: 1
            }
        })


        if(!resultDisciplinaXClub)throw new Error('la disciplina no esta relacionada con el club')

  
        
        const validarSiExiste = await RelPosXUsarioXDiviXDep.findOne({
            where:{
                clubxusuarioId: resultClubXUsuario.id,
                disciplinaxclubId: resultDisciplinaXClub.id,
                activo: 1
            }
        })
  

        if(validarSiExiste)throw new Error('El deporte ya esta agregado')
  
        //disxclubxdiv
        const resultDisXClubXDiv = await RelDisXClubXDiv.findOne({
            where: {
                id: div            }
        })

        let divisionFinal = null

        if(resultDisXClubXDiv && resultDisXClubXDiv.id){
            divisionFinal = resultDisXClubXDiv.id
        }

        //disciplinaxclubxpos
        const resultDisXClubXPos = await DisciplinaXClubXPos.findOne({
            where:{
                disciplinaxposId: pos
            }
        })

        let posicionFinal = null
        if(resultDisXClubXPos && resultDisXClubXPos.id){
            posicionFinal = resultDisXClubXPos.id
        }



         


         await RelPosXUsarioXDiviXDep.create({clubxusuarioId: resultClubXUsuario.id ,disxclubxdivId: divisionFinal , disciplinaxclubxposId: posicionFinal, disciplinaxclubId: resultDisciplinaXClub.id })

     

        res.status(200).json({message: 'creado correctamente'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}







exports.eliminarDeporteByUsuario = async (req,res) => {
    
    try{

        
        const user = req.params.usuario
        const club = req.params.club
        const id =  req.params.id
 



        const resultClubXUsuario = await ClubXUsuario.findOne({
            where:{
                clubId: club,
                usuarioId: user,
                activo: 1
            }
        })

        if(!resultClubXUsuario)throw new Error('el usuario no esta relacionado al club')

        
        const existe = await RelPosXUsarioXDiviXDep.findOne({
            where:{
                id: id
            }
        })

        if(!existe)throw new Error('el deporte no esta relacionado al usuario')
        
        

         await RelPosXUsarioXDiviXDep.update({
             activo: 0
         },{
             where: {
                clubxusuarioId: resultClubXUsuario.id,
                id: id
             }
         })


        res.status(200).json({message: 'modificado correcto'})

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}

exports.usuarioDeportes = async (req,res) => {
    
    try{

     

        const usuario = req.params.usuario


        const existe = await Usuario.findByPk(usuario)

        if(!existe)throw new Error('el usuario no existe')

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [
                {
                    model: RelDisciplinaXClub,
                    as: 'disciplinaxclub',
                    where:{
                        activo:1
                    },
                    include: [{
                        model: Disciplina,
                        as: 'disciplina',
                        where:{
                            activo: 1
                        }
                     
                    },
                    {
                        model: Club,
                        as: 'club',
                        where:{
                            activo: 1
                        }   
                     }
                ]
                },
                {
                model: ClubXUsuario,
                as: 'clubxusuario',
                where:{
                    usuarioId: usuario
                },
                include: [{
                    model: Usuario,
                    as: 'usuario'
                  
                }]
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
              
                include:[{
                 model: RelDisciplinaXClub,
                 as: 'disciplinaxclub',
         
                }]  
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
             
             include: [{
                 model: RelDisciplinaXPos,
                 as: 'disciplinaxpos',
             
             }]
            }
           
        ],
        where:{
            activo: 1
        }
        })

     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}



exports.listaDeUsuariosXDeporte = async (req,res) => {
    
    try{

     

        const disciplina = req.params.disciplina


        const existe = await Disciplina.findByPk(disciplina)

        if(!existe)throw new Error('la disciplina no existe')

        const result = await RelPosXUsarioXDiviXDep.findAll({
            include: [
                {
                    model: RelDisciplinaXClub,
                    as: 'disciplinaxclub',
                    where:{
                        activo:1
                    },
                    include: [{
                        model: Disciplina,
                        as: 'disciplina',
                        where:{
                            id: disciplina,
                            activo: 1
                        }
                     
                    },
                    {
                        model: Club,
                        as: 'club',
                        where:{
                            activo: 1
                        }   
                     }
                ]
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
                    },
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                  
                },{
                    model: Rol,
                    as: 'rol'
                }]
            },
            {
                model: RelDisXClubXDiv,
                as: 'disxclubxdiv',
              
            
            },
            {
             model: DisciplinaXClubXPos,
             as:   'disciplinaxclubxpos',
        
            }
           
        ],
        where:{
            activo: 1
        }
        })

     

        res.status(200).json(result)

    }catch(error){
        res.status(400).json({'error': error.message})
    }
}