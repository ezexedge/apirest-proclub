const Usuario = require('../models/Usuario')
const db = require('../config/db')
const ClubXusuario = require('../models/ClubXUsuario')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const Rol = require('../models/rol')
const Provincia = require('../models/Provincia')
const Pais = require('../models/Pais')

exports.usuarioListado = async (req,res) =>{


    try {
        
        
     const  result = await db.query(`
     
     SELECT personas.id, clubxusuarios.usuarioId as 'IdUsuario', personas.correo AS 'usuario' , personas.nombre AS 'nombre' , personas.apellido AS 'apellido' , personas.documento AS 'documento' , rols.nombre AS 'rol'   FROM  usuarios , personas , rols,clubxusuarios 
            WHERE usuarios.id = clubxusuarios.usuarioId AND personas.id = usuarios.personaId AND rols.id = usuarios.rolId AND clubxusuarios.activo =1 AND clubxusuarios.clubId = ${req.params.club}  ORDER BY id DESC

     `)
  
      
      res.status(200).send(result[0])
    
  } catch (err) {
      res.status(400).json(err)
  }
  
  }


exports.usuarioById = async (req,res) =>{


    try {
    console.log(req.params)
    const clubParams = req.params.club
    const usuarioParams = req.params.usuario
  

const result = await  ClubXusuario.findAll({
    include: [
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
              
            },{
                model: Rol,
                as: 'rol'
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

        
        if(result.length === 0){
            throw new Error('el usuario no existe o no esta activo')
        }
            
      res.status(200).json(result)
    
  } catch (err) {
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