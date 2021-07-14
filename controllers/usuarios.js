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
   


  
      
      res.status(200).send(result)
    
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
  
      res.status(200).json(result[0])
  
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
          activo:1
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