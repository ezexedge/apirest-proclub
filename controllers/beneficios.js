const db = require('../config/db')
const Beneficios = require('../models/Beneficios')
const Rubro = require('../models/Rubro')
const Usuario = require('../models/Usuario')
const Club = require('../models/Club')
const BeneficioXClub = require('../models/BeneficioXClub')
const ClubXUsuario = require('../models/ClubXUsuario')
const ClubXusuario = require('../models/ClubXUsuario')
const Persona = require('../models/Persona')
const RubroXBeneficio = require('../models/RubroXBeneficio')
const _ = require('lodash')
const { Op } = require("sequelize");

exports.crear = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {

    if(!req.file) {
      throw new Error('La imagen es obligatoria')
    }

    const { nombre , descripcion , telefono , web ,instagram , correo , rubro } = JSON.parse(req.body.data)
   
   
    if(rubro.length === 0) throw new Error('Es obligatorio seleccionar al menos 1 rubro')

      
      let imagen = req.file.filename
      console.log(imagen)
 

    const resultBeneficio = await Beneficios.create({ nombre: nombre, descripcion: descripcion, telefono: telefono , web : web , instagram: instagram , correo: correo, pathImage : `https://api.klubo.club/api/image/${imagen}` , pertenece_superadmin: 1, created: new Date()},{ transaction: t })
    
     await  BeneficioXClub.create({ beneficioId: resultBeneficio.id,pertenece_superadmin: 1},{ transaction: t })
    
    if(rubro.length > 0 ){

      for(let val of rubro){
          await RubroXBeneficio.create({beneficioId: resultBeneficio.id , rubroId: val },{ transaction: t })
      }

     }
     //ss
  

    await t.commit();

    res.status(200).json({'message': 'beneficio creado'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}



  exports.editar = async (req, res) => {
  

 
 
    const t = await db.transaction()
  
    try {
  

      const beneficiosId = req.params.id


      const result = await Beneficios.findOne({
        where:{
          id: beneficiosId
        }
      })



      if(!result) throw new Error('el beneficio no existe')


      const { nombre , descripcion , telefono , web ,instagram , correo , rubro } = JSON.parse(req.body.data)
   
    
     
      let imagen
      if(req.file) {
       imagen = req.file.filename
     
      }else{
        imagen = result.pathImage
      } 
   

      await Beneficios.update({ nombre: nombre, descripcion: descripcion, telefono: telefono , web : web , instagram: instagram , correo: correo  , pathImage : `https://api.klubo.club/api/image/${imagen}` },{where: {id: result.id}, transaction: t })
      

      if( rubro.length > 0){

        const result = await  RubroXBeneficio.findAll({
          where:{
            beneficioId:beneficiosId
          }
        })


        for(let val2 of result){

          await  RubroXBeneficio.destroy({
            where:{
                id: val2.id
            }
        },{ transaction: t })

               


        }



        for(let val of rubro){

          await RubroXBeneficio.create({beneficioId: beneficiosId, rubroId: val },{ transaction: t })
//sss
      

        }
       
      }
    
   

      await t.commit();
  
      res.status(200).json({'message': 'Beneficio actualizado correctamente'})
  
    } catch (err) {
      console.log('error', err)
  
      await t.rollback();
  
      res.status(400).json({ "error": err.message })
  
    }
  
  }

  exports.eliminar = async(req,res) => {

    try{

      const id = req.params.id

      const result = await Beneficios.findOne({
        where:{
          id: id,
          activo: 1
        }
      })

      if(!result)throw new Error('El beneficio no existe')



      await Beneficios.update({activo: 0},{where:{id:id}})

      res.status(200).json({'message': 'Beneficio eliminado correctamente'})
          
         

  }catch(error){


 res.status(400).json({'error': error.message})
   
  }

  }

  exports.getAll = async (req,res) => {



    try {
    
      let limit = 9
      let offset = 0 



      const cantidad = await Beneficios.findAndCountAll({
        where: {
          activo: 1,
          pertenece_superadmin: 1
        }
      })

      let page = Number(req.params.page)

      let pages = Math.ceil(cantidad.count / limit)

      offset = limit * (page - 1)



      const result =  await Beneficios.findAll({
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
        where: {
          activo: 1,
          pertenece_superadmin: 1
        },
        order: [['id', 'DESC']]
      })






      let arr = []
      for(let val of result){


        let resultRubros = await RubroXBeneficio.findAll({
          include:[{
            model: Rubro,
            as: 'rubro'
          }],
          where:{
            beneficioId: val.id
          }
        })

        let  obj = {
          id: val.id,
          nombre: val.nombre,
          descripcion: val.descripcion,
          telefono: val.telefono,
          web: val.web,
          instagram: val.instagram,
          correo: val.correo,
          pathImage: val.pathImage,
          activo: val.activo,
          rubro: resultRubros,
          pertenece_superadmin: val.pertenece_superadmin
        }


        arr.push(obj)
        

      }

      




      res.status(200).json({'result': arr,'count': cantidad.count,'pages':pages})

    }catch(err){

      res.status(400).json({error : err.message})

    }

  }


  exports.getById  = async (req,res) => {

    try{

      const id =  req.params.id

      const result = await Beneficios.findOne({
        where: {
          activo : 1,
          id: id
        }
      })

      if(!result)throw new Error('el beneficio no existe o fue eliminado')



      let resultRubros = await RubroXBeneficio.findAll({
        include:[{
          model: Rubro,
          as: 'rubro'
        }],
        where:{
          beneficioId: result.id
        }
      })


      let obj = {
        id: result.id,
        nombre: result.nombre,
        descripcion: result.descripcion,
        telefono: result.telefono,
        web: result.web,
        instagram: result.instagram,
        correo: result.correo,
        pathImage: result.pathImage,
        activo: result.activo,
        rubro: resultRubros
      }
       



    res.status(200).json(obj)

    }catch(err){

      res.status(400).json({error : err.message})

    }
  }


exports.crearBeneficioXClub  = async (req,res) => {

    try{

      
    const beneficio =  req.params.beneficio
    const usuario = req.params.usuario
    const club = req.params.club

    const result = await ClubXusuario.findOne({
      where:{
        clubId: club,
        usuarioId: usuario
      }
    })

    if(!result)throw new Error('los datos ingresado del club y el usuario son incorrectos')

    const resultBeneficio =  await Beneficios.findOne({
      where :{
        activo: 1
      }
    })

    if(!resultBeneficio)throw new Error('el beneficio no existe')
    

    await BeneficioXClub.create({clubId: club , usuarioId: usuario, beneficioId: beneficio})

    res.status(200).json({message: "el beneficio se creo correctamente"})



    }catch(err){

      res.status(400).json({error  : err.message})

    }

}

//getBeneficioXClubByClubMobile
exports.getBeneficioXClubByClubMobile = async (req,res) => {
  try{







    const club = req.params.club


    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')





    const result = await BeneficioXClub.findAll({
      include:[
    
  {
    model : Beneficios,
    as: 'beneficio',
    where:{
      activo: 1
    }
},

  ],
      where : {
        activo: 1,
        clubId: club
      },
      order: [['id', 'DESC']]

    })







    let arr = []
    for(let val of result){

      const  resultRubro =  await RubroXBeneficio.findAll({
        include:[{
          model: Rubro,
          as: 'rubro'
        }],
        where:{
          beneficioId: val.beneficioId
        }
      })


      let obj = {

    id: val.id,
    activo: val.activo,
    clubId: val.clubId,
    usuarioId: val.usuarioId,
    beneficioId: val.beneficioId,
    beneficio: val.beneficio,
    rubro: resultRubro ? resultRubro : []
      }


      arr.push(obj)

    }

    res.status(200).json(arr)

  }catch(err){
    res.status(400).json({error: err.message})
  }
}


exports.getBeneficioXClubByClub = async (req,res) => {
  try{



    let limit = 9
    let offset = 0 




    const club = req.params.club


    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')

   
    const cantidad = await BeneficioXClub.findAndCountAll({
      include:[{
        model: Beneficios,
        as: "beneficio",
        where:{
          activo:1
        }
      }],
      where: {
        clubId: club
      }
    })



    let page = Number(req.params.page)

    let pages = Math.ceil(cantidad.count / limit)

    offset = limit * (page - 1)    



    const result = await BeneficioXClub.findAll({
      limit: limit,
      offset: offset,
      $sort: { id: 1 },
      include:[
    
  {
    model : Beneficios,
    as: 'beneficio',
    where:{
      activo: 1
    }
},

  ],
      where : {
        {ctivo: 1,
        [Op.or]: [
        
          {clubId: club},
          { pertenece_superadmin: 1 }
        ]

      },
      order: [['id', 'DESC']]

    })







    let arr = []
    for(let val of result){

      const  resultRubro =  await RubroXBeneficio.findAll({
        include:[{
          model: Rubro,
          as: 'rubro'
        }],
        where:{
          beneficioId: val.beneficioId
        }
      })


      let obj = {

    id: val.id,
    activo: val.activo,
    clubId: val.clubId,
    usuarioId: val.usuarioId,
    beneficioId: val.beneficioId,
    beneficio: val.beneficio,
    rubro: resultRubro ? resultRubro : []
      }


      arr.push(obj)

    }

    res.status(200).json({'result': arr,'count': cantidad.count,'pages':pages})

  }catch(err){
    res.status(400).json({error: err.message})
  }
}



exports.getBeneficioXClubXRubro = async (req,res) => {
  try{

    const club = req.params.club
    

    const rubro = req.params.rubro

    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')

    const resultRubro =  await Rubro.findByPk(rubro)

    if(!resultRubro)throw new Error('el id del rubro no existe')


    const result = await BeneficioXClub.findAll({
      include:[{
        model : Club,
        as: 'club'
    },
    {
      model : Usuario,
      as: 'usuario',
      include:[{
        model: Persona,
        as: 'persona'
      }]
  },
  {
    model : Beneficios,
    as: 'beneficio',
    where: {rubroId: rubro}
},

  ],
      where : {
        activo: 1,
        clubId: club
      }
    })

    res.status(200).json(result)

  }catch(err){
    res.status(400).json({error: err.message})
  }
}



exports.getBeneficioXClubByClubByUsario = async (req,res) => {
  try{

    const club = req.params.club
    const usuario = req.params.usuario



    if(!resp)throw new Error('el id del club o del usuario no existe')

    const result = await BeneficioXClub.findAll({
      include:[{
        model : Club,
        as: 'club'
    },
    {
      model : Usuario,
      as: 'usuario',
      include:[{
        model: Persona,
        as: 'persona'
      }]
  },
  {
    model : Beneficios,
    as: 'beneficio'
},

  ],
      where : {
        activo: 1,
        clubId: club,
      }
    })

    res.status(200).json(result)

  }catch(err){
    res.status(400).json({error: err.message})
  }
}




exports.eliminarBeneficioXUsuario = async (req,res) => {

  try{

    const club = req.params.club
    const usuario = req.params.usuario
    const beneficio = req.params.beneficio


    const resp = await ClubXusuario.findOne({
      where:{
        clubId: club,
        usuarioId: usuario
      }
    })

    if(!resp)throw new Error('el id del club o del usuario no existe')

  
    const result = await BeneficioXClub.findOne({
      where : {
        activo: 1,
        clubId: club,
        usuarioId: usuario,
        beneficioId: beneficio

      }
    })

    if(!result)throw new Error('Error al encontrar el beneficio')

        
        result.activo = 0

        await result.save()
        res.status(200).json({message: 'eliminado'})
      
        
   

}catch(error){


res.status(400).json({'error': error.message})
 
}



}





exports.crearAdmin = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {

    if(!req.file) {
      throw new Error('La imagen es obligatoria')
    }

    const { nombre , descripcion , telefono , web ,instagram , correo , rubro } = JSON.parse(req.body.data)
   
   

    if(rubro.length === 0) throw new Error('Es obligatorio seleccionar al menos 1 rubro')

      
      let imagen = req.file.filename
      console.log(imagen)
 

    const resultBeneficio = await Beneficios.create({ nombre: nombre, descripcion: descripcion, telefono: telefono , web : web , instagram: instagram , correo: correo, pathImage : `https://api.klubo.club/api/image/${imagen}` , pertenece_superadmin: 0, created: new Date()},{ transaction: t })

    await BeneficioXClub.create({activo:1,clubId:req.auth.clubId,beneficioId:resultBeneficio.id},{ transaction: t })

     if(rubro.length > 0 ){

      for(let val of rubro){
          await RubroXBeneficio.create({beneficioId: resultBeneficio.id , rubroId: val },{ transaction: t })
      }

     }
     //ss
  

    await t.commit();

    res.status(200).json({'message': 'beneficio creado'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}


exports.buscador = async (req,res) => {
  try{







    const club = req.params.club
    const buscar = req.params.buscar




    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')

   




    const result = await BeneficioXClub.findAll({

      include:[
    
  {
    model : Beneficios,
    as: 'beneficio',
    where:{
      activo: 1
    }
},

  ],
      where : {
        activo: 1,
        clubId: club
      },
      order: [['id', 'DESC']]

    })


    let  parsiado =  JSON.parse(JSON.stringify(result))


    let arrFinal = []
    for(let val of parsiado){
      let arr = []


        for(let val2 in val.beneficio){

          arr.push(val.beneficio[val2])

        if(typeof val.beneficio[val2] === 'string'){


                  if(val.beneficio[val2].toLowerCase().includes(buscar.toLowerCase()) === true){

                    let encontrado = arrFinal.find(valor => valor.id === val.id)

                    if(!encontrado){
                      arrFinal.push(val)
                    }

                  }

           
        }



        }

        


    }


    res.status(200).json(arrFinal)

  }catch(err){
    res.status(400).json({error: err.message})
  }
}
