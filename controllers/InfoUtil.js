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
      rubro: resultRubros
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

    if(!result)throw new Error('la info no existe')



    await InfoUtil.update({activo: 0},{where:{id:id}})

    res.status(200).json({'message': 'info util eliminado'})
        
       

}catch(error){


res.status(400).json({'error': error.message})
 
}

}