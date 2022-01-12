const Usuario = require('../models/Usuario')
const db = require('../config/db')
const ClubXusuario = require('../models/ClubXUsuario')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const Rol = require('../models/rol')
const Provincia = require('../models/Provincia')
const Pais = require('../models/Pais')
const Club = require('../models/Club')
const Estados = require('../models/Estados')
const firebase = require('../firebase')
const admin = require('firebase-admin')
const RelPosXUsuarioXDivXDep  = require('../models/RelPosXUsarioXDiviXDep')
const RelDisXClubXDiv = require('../models/RelDisXClubXDiv')
const DisciplinaXClubXPos = require('../models/DisciplinaXClubXPos')
const RelDisciplinaXPos = require('../models/RelDisciplinaXPos')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const _ = require('lodash')
exports.usuarioListado = async (req,res) =>{

    try {
        
       
      const club = req.params.club
        
      const result = await  ClubXusuario.findAll({
        include: [{
          model: Usuario,
          as: 'usuario',
          include: [{
            model: Persona,
            as: 'persona'
          }]
        },
       {
         model: Rol,
         as: 'rol'
       },
      {
        model: Estados,
        as: 'estado'
      }
      ],
         where:{
           clubId: club,
           activo:1
         },
         order: [['id', 'DESC']]
       })
   
  
       
  
       let arr = []
       for(let val of result){

       
          
          

          const deportes = await RelPosXUsuarioXDivXDep.findAll({
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
                model: ClubXusuario,
                as: 'clubxusuario',
                where:{
                    id: val.id
                },
                include: [{
                    model: Usuario,
                    as: 'usuario'
                  
                }]
            }
           
        ],
        where:{
            activo: 1
        }
        })

        let arrDeportes = []
        for(let val of deportes){
          if(val && val.disciplinaxclub !== null && val.disciplinaxclub.disciplina !== null ){
            arrDeportes.push(val.disciplinaxclub.disciplina.nombre)
          }
        }




        let obj = {
          id: val.id,
          activo: val.activo,
          clubId:val.clubId,
          rolId: val.rolId,
          rolanteriorId: val.rolanteriorId,
          usuarioId: val.usuarioId,
          estadoId: val.estadoId,
          usuario: val.usuario,
          rol: val.rol,
          estado: val.estado,
          deportes: arrDeportes
        }

        arr.push(obj)


       }
      
  
      

      res.status(200).json(arr)
    
  } catch (err) {
      res.status(400).json(err)
  }
  
  }


exports.usuarioById = async (req,res) =>{

 
  console.log('/////////////',req.params)
    try {
    console.log('/////////////',req.params)
    const clubParams = req.params.club
    const usuarioParams = req.params.usuario
  


    const result = await  ClubXusuario.findOne({
      include: [
        {
          model: Rol,
          as: 'rol'
      },
          {
            
            model: Usuario,
            as: 'usuario',
            include: [
              {
                model: Persona,
              as: 'persona',
              include: [
                  {
                    model: TipoDocumento,
                  as: 'tipoDocument'
                  },
                  {
                   model: Direccion,
                    as: 'direccionPersona',
                    include: [{
                      model: Provincia,
                      as: 'provincia',
                      include : [{
                          model: Pais,
                          as: 'country'
                      }]
                    }],
  
                    }
                ],
                
              }
            ],
           
          },
        ],
        where: {
          usuarioId: usuarioParams,
          clubId: clubParams,
          activo: 1
        }
  });
        
      if(!result)throw new Error('el usuario no existe')
            
      res.status(200).json(result)
    
  } catch (err) {

    console.log('///////////////',err)
      res.status(400).json({'error': err.message})
  }
  
  }





exports.usuarioEliminar = async (req, res) => {

    try {
      
    const clubParams = req.params.club
    const usuarioParams = req.params.usuario


      const result = await ClubXusuario.findAll({
        where: {
            usuarioId: usuarioParams,
            clubId: clubParams
          }  
      })
  /*
      if(!result){
          throw new Error('el usuario no existe')
      }
      result.activo = 0
  
      await result.save()
  */

      if(result.length === 0){
        throw new Error('el usuario no existe')
      }
      result[0].activo = 0

      await result[0].save()
  
      res.status(200).json({message: 'eliminado correctamente'})
  
    } catch (err) {

      res.status(400).json({'error': err.message})
    }
  
  }

  


  exports.usuarioById = async (req,res) => {
    try{

      const id = req.params.id

      const result = await Usuario.findOne({
        include:[{
          model: Persona,
          as: 'persona',
          include:[{
            model: Direccion,
            as:'direccionPersona'
          }]
        }],
        where:{
          id:id,
         
        }
      })


     res.status(200).json(result)

      

    }catch (err) {

      res.status(400).json({'error': err.message})
    }
  }


  exports.usuarioClubs = async (req,res) => {
    try{

      const usuario = req.params.usuario



      const resultUsuario = await Usuario.findOne({
        where:{
          activo: 1,
          id: usuario
        }
      })

      if(!resultUsuario)throw new Error('el usuario no existe')



      const result = await ClubXusuario.findAll({
        include:[
          {
            model: Usuario,
            as: 'usuario',
            include:[{
              model:Persona,
              as:'persona'
            }]
          },
          {
          model: Club,
          as: 'club',
          include:[
            {
              model: Direccion,
              as: 'direccion'
            },
            {
            model: Persona,
            as: 'persona'
          }
        ]
        }],
        where:{
          usuarioId: usuario,
          activo:1
        }
      })


     res.status(200).json(result)

      

    }catch (err) {

      res.status(400).json({'error': err.message})
    }
  }


  exports.usuarioNoClubs = async (req,res) => {
    try{

      const usuario = req.params.usuario



      const resultUsuario = await Usuario.findOne({
        where:{
          activo: 1,
          id: usuario
        }
      })

      if(!resultUsuario)throw new Error('el usuario no existe')



      const resultClub = await Club.findAll({
        where:{
          activo:1
        }
      })

      const result = await ClubXusuario.findAll({
        include:[
          {
            model: Usuario,
            as: 'usuario',
            include:[{
              model:Persona,
              as:'persona'
            }]
          },
          {
          model: Club,
          as: 'club',
          include:[
            {
              model: Direccion,
              as: 'direccion'
            },
            {
            model: Persona,
            as: 'persona'
          }
        ]
        }],
        where:{
          usuarioId: usuario,
          activo:1
        }
      })


      let arr =[]
      for(let val of result){
        
        arr.push(val.clubId)
      }

      let respuestaFinal = []
      for(let val of resultClub){
        ////

        if(arr.includes(val.id) === false){
          respuestaFinal.push(val)
        }

      }

     res.status(200).json(respuestaFinal)

      

    }catch (err) {

      res.status(400).json({'error': err.message})
    }
  }



  exports.usuarioXClub = async (req,res) =>{

 
    console.log('/////////////',req.params)
      try {
      console.log('/////////////',req.params)
      const clubParams = req.params.club
      const usuarioParams = req.params.usuario
    
  
  
      const result = await  ClubXusuario.findOne({
        include: [
          {
            model: Rol,
            as: 'rol'
        },
            {
              
              model: Usuario,
              as: 'usuario',
              include: [
                {
                  model: Persona,
                as: 'persona',
                include: [
                    {
                      model: TipoDocumento,
                    as: 'tipoDocument'
                    },
                    {
                     model: Direccion,
                      as: 'direccionPersona',
                      include: [{
                        model: Provincia,
                        as: 'provincia',
                        include : [{
                            model: Pais,
                            as: 'country'
                        }]
                      }],
    
                      }
                  ],
                  
                }
              ],
             
            },
            {
              model: Estados,
              as: 'estado'
            }
          ],
          where: {
            usuarioId: usuarioParams,
            clubId: clubParams,
            activo: 1
          }
    });
          
        if(!result)throw new Error('el usuario no existe')
              
        res.status(200).json(result)
      
    } catch (err) {
  
      console.log('///////////////',err)
        res.status(400).json({'error': err.message})
    }
    
    }
  

    exports.getAllUsuarios = async (req,res) => {

      try{

        const result = await Usuario.findAll({
          include: [
            {
              model: Persona,
            as: 'persona',
            include: [
                {
                  model: TipoDocumento,
                as: 'tipoDocument'
                },
                {
                 model: Direccion,
                  as: 'direccionPersona',
                  include: [{
                    model: Provincia,
                    as: 'provincia',
                    include : [{
                        model: Pais,
                        as: 'country'
                    }]
                  }],

                  }
              ],
              
            }
          ],
          order: [['id', 'DESC']]
        })
        res.status(200).json(result)


      }catch(error){
        res.status(400).json({'error': err.message})

      }
      



    }


    exports.agregarClub = async (req,res) => {
      const usuario = req.params.usuario
      const club = req.params.club

      try{


        const result = await Usuario.findByPk(usuario)

        if(!result)throw new Error('el usuario no existe')

      const resultClub = await Club.findByPk(club)

       if(!resultClub)throw new Error('el club no existe')

      const clubUsuario = await  ClubXusuario.findOne({
        where:{
          usuarioId: usuario,
          clubId: club
        }
      })

      if(clubUsuario)throw new Error('ya se encuentra registrado')

      await ClubXusuario.create({clubId: club , usuarioId: usuario , rolId: 3 , estadoId: 3 , activo: 1})

      res.status(200).json({ "message": 'agregado correctamente' })

      

      }catch(err){
        res.status(400).json({'error': err.message})

      }
    }


    exports.crearUsuarioWeb = async (req, res) => {

      const t = await db.transaction()
    
      try {
    
    
      
        console.log('////////////ss',req.body)
    
    
        let valores = JSON.parse(req.body.data)
        
        const { nombre, apellido, telefono, correo, fechaNacimiento, idClub, rol, documento, tipoDocumentId, disciplinaxclub ,sexo, direccion,disciplinaxclubxdiv, disciplinaxpos  , cp} = valores
        

        const resultRol = await Rol.findOne({
          where: {id: rol}
        })





        if(!resultRol)throw new Error('el rol no existe')


        if(Number(rol) === 2){

          const config = {
            url: 'http://dev.texdinamo.com/klubo/#/complete-registration',
            handleCodeInApp: true
        };


        const result = await firebase.default.auth().sendSignInLinkToEmail(correo,config)
        //signInWithEmailLink(correo,"http://localhost:8000/api/agregar-usuario")
           console.log('guardando respuesta',result)
                     
       

        }



        let estado = 1
        if(resultRol.nombre === 'socio'){
          estado = 3
        }else{
          estado = 1
        }
        
        

        const resp = await admin.auth().listUsers()

        //console.log('respuestaaaaa',resp)

        const encontrado = resp.users.find(obj => obj.email === correo)
        
        if(encontrado){
           
          throw new Error('El email esta registrado')
        
        }

        //desarrollo
        //  url: 'http://localhost:3000/#/complete-registration',

        const config = {
          url: 'http://dev.texdinamo.com/klubo/#/complete-registration',
          handleCodeInApp: true
      };

    const result = await firebase.default.auth().sendSignInLinkToEmail(correo,config)
     //signInWithEmailLink(correo,"http://localhost:8000/api/agregar-usuario")
        console.log('guardando respuesta',result)
                  


        let imagen
        if(req.file) {
         imagen = req.file.filename
       
        }else{
          imagen = ''
        }
    
        const aprobado = await Estados.findOne({where:{ nombre : 'aprobado' }})
        if(!aprobado){
          throw new Error('no existe el estado aprobado en la base de datos')
        }

        const posicion = await DisciplinaXClubXPos.findOne({
          where:{
            disciplinaxposId: disciplinaxpos
          }
        })
    
    
        const nuevaDireccion = await Direccion.create({ calle: direccion.calle, numero: direccion.numero, localidad: direccion.localidad, provinciaId: direccion.provincia ,cp: cp },{ transaction: t })
    
        const nuevaPersona = await Persona.create({ nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, tipoDocumentId: tipoDocumentId, direccionPersonaId: nuevaDireccion.id, sexo: sexo, fechaNacimiento: fechaNacimiento, documento: documento ,avatar : imagen },{ transaction: t })
      
        const nuevoUsuario = await Usuario.create({ personaId: nuevaPersona.id , activo: 1, ultimoIngreso: idClub },{ transaction: t })


    
        const clubxusuarioId =  await ClubXusuario.create({  rolId: 3, clubId: idClub, usuarioId: nuevoUsuario.id , activo: 1, estadoId: estado  },{ transaction: t })
        
          await RelPosXUsuarioXDivXDep.create({clubxusuarioId:clubxusuarioId.id, disxclubxdivId: disciplinaxclubxdiv, disciplinaxclubxposId: posicion.id ,disciplinaxclubId: disciplinaxclub },{ transaction: t })

        


//disciplinaxclubxdiv
       //  await RelUsuarioXDis.create({disciplinaxclubId:deporte , clubxusuarioId: clubxusuarioId.id},{ transaction: t })
    
     //   await RelUsuarioXCatXDis.create({disxclubxcatId: categoria,clubxusuarioId:clubxusuarioId.id},{ transaction: t })
       
         
    
        /*  const rta = await admin.auth().createUser({
            email: 'desarrollo@texdinamo.com',
            password: 'admin123'                 
          })
          console.log(rta);
    
          await admin.auth().setCustomUserClaims(rta.uid, { role: 'SuperAdmin' }) */
    
        await t.commit();
    
       
      res.status(200).json({message: 'agregadoo'})
    
      } catch (err) {
        

        console.log('........',err)
        await t.rollback();
        

        
        res.status(400).json({ "error": err.message })
    
      }
    
    };
    
    


    exports.agregarUID = async (req, res) => {

    
      try {
        
        const email = req.params.email
        const firebase  = req.params.firebase

        const resultPersona = await Persona.findOne({
          where:{correo: email}
        })


        if(!resultPersona)throw new Error('el email no existe')


        const resultUsuario = await Usuario.findOne({
          where: {personaId: resultPersona.id}
        })
    
        if(!resultUsuario)throw new Error('el email no se encuentra')


        if(resultUsuario.idFirebase !== null)throw new Error('el usuario ya esta registrado')

        
        await Usuario.update({ idFirebase: firebase },{where: {id: resultUsuario.id}})



      res.status(200).json({message: 'update'})
    
      } catch (err) {
        
        
        
        res.status(400).json({ "error": err.message })
    
      }
    
    };
    
    
    //clubxUsuarioById


    exports.clubxUsuarioById = async (req,res) =>{

 
      console.log('/////////////',req.params)
        try {
        console.log('/////////////',req.params)
      

        const id = req.params.id

        
        const existe = await ClubXusuario.findByPk(id)

        if(!existe)throw new Error('el id no existe')
      
    
    
        const result = await  ClubXusuario.findOne({
          include: [
            {
              model: Rol,
              as: 'rol'
          },
              {
                
                model: Usuario,
                as: 'usuario',
                include: [
                  {
                    model: Persona,
                  as: 'persona',
                  include: [
                      {
                        model: TipoDocumento,
                      as: 'tipoDocument'
                      },
                      {
                       model: Direccion,
                        as: 'direccionPersona',
                        include: [{
                          model: Provincia,
                          as: 'provincia',
                          include : [{
                              model: Pais,
                              as: 'country'
                          }]
                        }],
      
                        }
                    ],
                    
                  }
                ],
               
              },
              {
                model: Estados,
                as: 'estado'
              }
            ],
            where: {
              id: id,
              activo: 1
            }
      });
            
          if(!result)throw new Error('el usuario no existe')
                
          res.status(200).json(result)
        
      } catch (err) {
    
        console.log('///////////////',err)
          res.status(400).json({'error': err.message})
      }
      
      }
    



      exports.clubxUsuarioAll = async (req,res) =>{

 
          try {
           
          const result = await  ClubXusuario.findAll({
            include: [
              {
                model: Rol,
                as: 'rol'
            },
                {
                  
                  model: Usuario,
                  as: 'usuario',
                  include: [
                    {
                      model: Persona,
                    as: 'persona',
                    include: [
                        {
                          model: TipoDocumento,
                        as: 'tipoDocument'
                        },
                        {
                         model: Direccion,
                          as: 'direccionPersona',
                          include: [{
                            model: Provincia,
                            as: 'provincia',
                            include : [{
                                model: Pais,
                                as: 'country'
                            }]
                          }],
        
                          }
                      ],
                      
                    }
                  ],
                 
                },
                {
                  model: Estados,
                  as: 'estado'
                }
              ],
              where: {
                activo: 1
              }
        });
              
            if(!result)throw new Error('el usuario no existe')
                  
            res.status(200).json(result)
          
        } catch (err) {
      
          console.log('///////////////',err)
            res.status(400).json({'error': err.message})
        }
        
        }
      
  



        exports.usuarioByEmail = async (req,res) => {
          try{
      
            const correo = req.params.email
      
            const result = await Usuario.findOne({
              include:[{
                model: Persona,
                as: 'persona',
               where: {correo: correo},
                include:[{
                  model: Direccion,
                  as:'direccionPersona',
                }]
              }]
            })
      

            if(!result)throw new Error('usuario no encontrado')
      
           res.status(200).json(result)
      
            
      
          }catch (err) {
      
            res.status(400).json({'error': err.message})
          }
        }


        exports.cambiarRol = async (req, res) => {

    
          try {
            
            const usuario = req.params.clubxusuario
            
            console.log('id del usuario',usuario)
            

            
    
        
            const clubxusuarioResult = await ClubXusuario.findByPk(usuario)

            if(!clubxusuarioResult)throw new Error('el usuario no existe')


            const resultRol = await Rol.findOne({
              where: {nombre: 'admin'}
            })

            
            
           await ClubXusuario.update({rolId: resultRol.id},{where: {id: clubxusuarioResult.id }})
            
    
    
    
          res.status(200).json({message: 'se cambio el rol'})
        
          } catch (err) {
            
            
            
            res.status(400).json({ "error": err.message })
        
          }
        
        };
        


  //usuarioListadoRol



  exports.usuarioListadoRol = async (req,res) =>{


    try {
        
        
      const club = req.params.club
      const rol = req.params.rol


      const resultClub = await Club.findByPk(club)
      if(!resultClub)throw new Error('el id del club no existe')
    
      const resultRol = await Rol.findByPk(rol)
      if(!resultRol)throw new Error('el id del rol no existe')


        
      const result = await  ClubXusuario.findAll({
        include: [{
          model: Usuario,
          as: 'usuario',
          include: [{
            model: Persona,
            as: 'persona'
          }]
        },
       {
         model: Rol,
         as: 'rol'
       },
      {
        model: Estados,
        as: 'estado'
      }
      ],
         where:{
           clubId: club,
          rolId: rol,
           activo:1
         },
         order: [['id', 'DESC']]
       })
   


  
      
      res.status(200).send(result)
    
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
  
  }



  exports.usuarioEliminarSuperAdmin = async (req, res) => {

    try {
      
    const usuarioParams = req.params.usuario


    const exist = await Usuario.findByPk(usuarioParams)

    if(!exist)throw new Error('el usuario no existe')


      const result = await ClubXusuario.findAll({
        where: {
            usuarioId: usuarioParams,
          }  
      })

      if(result.length > 0){
        await ClubXusuario.update({activo: 0},{where: {usuarioId: usuarioParams }})

      }


      await Usuario.update({activo: 0},{where: {id: usuarioParams}})
  
      res.status(200).json({message: 'eliminado correctamente'})
  
    } catch (err) {

      res.status(400).json({'error': err.message})
    }
  
  }


  exports.usuarioActivoSuperAdmin = async (req, res) => {

    try {
      
    const usuarioParams = req.params.usuario


    const exist = await Usuario.findByPk(usuarioParams)

    if(!exist)throw new Error('el usuario no existe')


      const result = await ClubXusuario.findAll({
        where: {
            usuarioId: usuarioParams,
          }  
      })

      if(result.length > 0){
        await ClubXusuario.update({activo: 1},{where: {usuarioId: usuarioParams }})

      }


      await Usuario.update({activo: 1},{where: {id: usuarioParams}})
  
      res.status(200).json({message: 'activo correctamente'})
  
    } catch (err) {

      res.status(400).json({'error': err.message})
    }
  
  }






  exports.getRolesByUser = async (req,res) =>{

    let usuario = req.params.usuario
 
    try {


    const exist = Usuario.findOne({
      where:{
        id: usuario
      }
    })

    if(!exist)throw new Error('el usuario no existe')


    const result = await  ClubXusuario.findAll({
      include:[{
        model: Rol,
        as: 'rol'
      },
    {
      model: Club,
      as: 'club'
    }
    ],
      where:{ 
        usuarioId: usuario
       }
    })
        
            
      res.status(200).json(result)
    
  } catch (err) {

    console.log('///////////////',err)
      res.status(400).json({'error': err.message})
  }
  
  }