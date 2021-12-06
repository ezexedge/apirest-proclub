const db = require('../config/db')
const Beneficios = require('../models/Beneficios')
const Rubro = require('../models/Rubro')
const Usuario = require('../models/Usuario')
const Club = require('../models/Club')
const InfoUtil = require('../models/InfoUtil')
const BeneficioXClub = require('../models/BeneficioXClub')
const ClubXUsuario = require('../models/ClubXUsuario')
const ClubXusuario = require('../models/ClubXUsuario')
const Persona = require('../models/Persona')
const RubroXBeneficio = require('../models/RubroXBeneficio')
const CategoriaXInfo = require('../models/CategoriaXInfo')
const Categoria= require('../models/Categoria')

const _ = require('lodash')

exports.crear = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {

    if(!req.file) {
      throw new Error('debe ingresar una imagen')
    }

    const { titulo, descripcion , categoria } = JSON.parse(req.body.data)
   
   

    if(categoria.length === 0 )throw new Error('Debe seleccionar al menos una categoria')

      
      let imagen = req.file.filename
      console.log(imagen)
 

    const resultInfoUtil = await InfoUtil.create({ titulo: titulo, descripcion: descripcion,pathImage:imagen, pertenece_superadmin: 1, created: new Date()},{ transaction: t })

     if(categoria.length > 0 ){

      for(let val of categoria){
          await CategoriaXInfo.create({infoutilId: resultInfoUtil.id , categoriaId: val },{ transaction: t })
      }

     }
     //ss
  

    await t.commit();

    res.status(200).json({'message': 'informacion util creada'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}



exports.crearAdmin = async (req, res) => {
  

 
 
  const t = await db.transaction()


  try {


    const clubId = req.params.club

    if(!req.file) {
      throw new Error('debe ingresar una imagen')
    }

    const { titulo, descripcion , categoria } = JSON.parse(req.body.data)
   
   

    if(categoria.length === 0 )throw new Error('Debe seleccionar al menos una categoria')
      
      let imagen = req.file.filename
      console.log(imagen)
 

    const resultInfoUtil = await InfoUtil.create({ titulo: titulo, descripcion: descripcion,pathImage:imagen, pertenece_superadmin: 0,clubId:clubId, created: new Date()},{ transaction: t })

     if(categoria.length > 0 ){

      for(let val of categoria){
          await CategoriaXInfo.create({infoutilId: resultInfoUtil.id , categoriaId: val },{ transaction: t })
      }

     }
     //ss
  

    await t.commit();

    res.status(200).json({'message': 'informacion util creada'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}




exports.getAll = async (req,res) => {



  try {
  
    let limit = 2
    let offset = 0 



    const cantidad = await InfoUtil.findAndCountAll({
      where: {
        activo: 1,
        pertenece_superadmin: 1
      }
    })

    let page = Number(req.params.page)

    let pages = Math.ceil(cantidad.count / limit)

    offset = limit * (page - 1)



    const result =  await InfoUtil.findAll({
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


      let resultCategoria = await CategoriaXInfo.findAll({
        include:[{
          model: Categoria,
          as: 'categoria'
        }],
        where:{
          infoutilId: val.id
        }
      })

      let  obj = {
        id: val.id,
        titulo: val.titulo,
        nombre: val.nombre,
        descripcion: val.descripcion,
        pathImage: val.pathImage,
        activo: val.activo,
        pertenece_superadmin: val.pertenece_superadmin,
        categoria: resultCategoria
      }


      arr.push(obj)
      

    }

    




    res.status(200).json({'result': arr,'count': cantidad.count,'pages':pages})

  }catch(err){

    res.status(400).json({error : err.message})

  }

}




exports.getByClub = async (req,res) => {



  try {
  
    const club =  req.params.club
    let limit = 2
    let offset = 0 



    const cantidad = await InfoUtil.findAndCountAll({
      where: {
        activo: 1,
        pertenece_superadmin: 0,
        clubId: club
      }
    })

    let page = Number(req.params.page)

    let pages = Math.ceil(cantidad.count / limit)

    offset = limit * (page - 1)



    const result =  await InfoUtil.findAll({
      limit: limit,
      offset: offset,
      $sort: { id: 1 },
      where: {
        activo: 1,
        pertenece_superadmin: 0,
        clubId: club
      },
      order: [['id', 'DESC']]
    })






    let arr = []
    for(let val of result){


      let resultCategoria = await CategoriaXInfo.findAll({
        include:[{
          model: Categoria,
          as: 'categoria'
        }],
        where:{
          infoutilId: val.id
        }
      })

      let  obj = {
        id: val.id,
        nombre: val.nombre,
        titulo: val.titulo,
        descripcion: val.descripcion,
        pathImage: val.pathImage,
        activo: val.activo,
        pertenece_superadmin: val.pertenece_superadmin,
        categoria: resultCategoria
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

    const result = await InfoUtil.findOne({
      where: {
        activo : 1,
        id: id
      }
    })

    if(!result)throw new Error('la info util no existe')



    let resultRubros = await CategoriaXInfo.findAll({
      include:[{
        model: Categoria,
        as: 'categoria'
      }],
      where:{
        infoutilId: result.id
      }
    })


    let obj = {
      id: result.id,
    titulo: result.titulo,
      descripcion: result.descripcion,
      pathImage: result.pathImage,
      activo: result.activo,
      categoria: resultRubros
    }
     



  res.status(200).json(obj)

  }catch(err){

    res.status(400).json({error : err.message})

  }
}
//sss




exports.eliminar = async(req,res) => {

  try{

    const id = req.params.id

    const result = await InfoUtil.findOne({
      where:{
        id: id,
        activo: 1
      }
    })

    if(!result)throw new Error('la informacion no existe')



    await InfoUtil.update({activo: 0},{where:{id:id}})

    res.status(200).json({'message': 'info util eliminado'})
        
       

}catch(error){


res.status(400).json({'error': error.message})
 
}

}


exports.editar = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {


    const infoId = req.params.id


    const result = await InfoUtil.findOne({
      where:{
        id: infoId
      }
    })



    if(!result) throw new Error('la info util no existe')


    const { titulo , descripcion , rubro } = JSON.parse(req.body.data)
 
  
   
    let imagen
    if(req.file) {
     imagen = req.file.filename
   
    }else{
      imagen = result.pathImage
    } 
 

    await InfoUtil.update({ titulo: titulo, descripcion: descripcion,pathImage : imagen },{where: {id: result.id}, transaction: t })
    

    if( rubro.length > 0){

      const result = await  CategoriaXInfo.findAll({
        where:{
          infoutilId:infoId
        }
      })


      for(let val2 of result){

        await  CategoriaXInfo.destroy({
          where:{
              id: val2.id
          }
      },{ transaction: t })

             


      }



      for(let val of rubro){

        await CategoriaXInfo.create({infoutilId: infoId, categoriaId: val },{ transaction: t })
//sss
    

      }
     
    }
  
 

    await t.commit();

    res.status(200).json({'message': 'beneficio modificado'})

  } catch (err) {
    console.log('error', err)

    await t.rollback();

    res.status(400).json({ "error": err.message })

  }

}




exports.getInfoXClubXRubro = async (req,res) => {
  try{

    const club = req.params.club
    

    const categoria = req.params.categoria

    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')

    const resultCategoria =  await Categoria.findByPk(categoria)

    if(!resultCategoria)throw new Error('el id de la categoria no existe')


    const result = await CategoriaXInfo.findAll({
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