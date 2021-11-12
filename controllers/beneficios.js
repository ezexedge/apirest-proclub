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

exports.crear = async (req, res) => {
  

 
 
  const t = await db.transaction()

  try {

    if(!req.file) {
      throw new Error('debe ingresar una imagen')
    }

    const { nombre , descripcion , telefono , web ,instagram , correo , rubro } = JSON.parse(req.body.data)
   
   

      
      let imagen = req.file.filename
      console.log(imagen)
 

    const resultBeneficio = await Beneficios.create({ nombre: nombre, descripcion: descripcion, telefono: telefono , web : web , instagram: instagram , correo: correo, pathImage : imagen },{ transaction: t })

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


      const result = await Beneficios.findByPk(beneficiosId)

      if(!result) throw new Error('el beneficio no existe')


      const { nombre , descripcion , telefono , web ,instagram , correo , rubro } = JSON.parse(req.body.data)
   
    
     
      let imagen
      if(req.file) {
       imagen = req.file.filename
     
      }else{
        imagen = pathImage
      } 
   

      await Beneficios.update({ nombre: nombre, descripcion: descripcion, telefono: telefono , web : web , instagram: instagram , correo: correo, rubroId: rubro , pathImage : imagen },{where: {id: result.id}, transaction: t })
  
    
      await t.commit();
  
      res.status(200).json({'message': 'beneficio modificado'})
  
    } catch (err) {
      console.log('error', err)
  
      await t.rollback();
  
      res.status(400).json({ "error": err.message })
  
    }
  
  }

  exports.eliminar = async(req,res) => {

    try{

      const id = req.params.id

      const result = await Beneficios.findByPk(id)

      if(result){
          
          result.activo = 0

          await result.save()
          res.status(200).json(result)
        
          
      }else{
          throw new Error('El beneficio no existe')
      }

  }catch(error){


 res.status(400).json({'error': error.message})
   
  }

  }

  exports.getAll = async (req,res) => {



    try {

      const result =  await Beneficios.findAll({

        where: {
          activo: 1
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
          rubro: resultRubros
        }


        arr.push(obj)
        

      }

      

      res.status(200).json(arr)

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

      if(!result)throw new Error('el beneficio no existe')



      let resultRubros = await RubroXBeneficio.findAll({
        include:[{
          model: Rubro,
          as: 'rubro'
        }],
        where:{
          beneficioId: val.id
        }
      })


      let copia =   _.clone(result)

      copia.rubro = resultRubros
       



    res.status(200).json(copia)

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

exports.getBeneficioXClubByClub = async (req,res) => {
  try{

    const club = req.params.club


    const resultClub =  await Club.findByPk(club)

    if(!resultClub)throw new Error('el id del club no existe')

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
        clubId: club
      }
    })

    res.status(200).json(result)

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


    const resp = await ClubXusuario.findOne({
      where:{
        clubId: club,
        usuarioId: usuario
      }
    })

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
        usuarioId: usuario
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



