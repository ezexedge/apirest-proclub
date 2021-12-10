const Documentacion = require('../models/Documentacion')
const EstadoDocumento = require('../models/EstadoDocumento')
const ClubXUsuario = require('../models/ClubXUsuario')


exports.crear = async(req,res) => {
    try{

       const club =  req.params.club
       const usuario = req.params.usuario

       const result = await ClubXUsuario.findOne({
           where:{
               activo:1,
               usuarioId: usuario,
               clubId: club
           }
       })


       if(!result)throw new Error('el club o usuario no existe o no estan relacionados')


       const documentacionExist = await Documentacion.findOne({
           where:{
            usuarioId:usuario,
            clubId: club
           }
       })


       if(documentacionExist)throw new Error('El usuario ya posee un documento')


       if(!req.file) {
        throw new Error('debe ingresar un avatar para el usuario')
      }
    
      let imagen = req.file.filename

      const pendiente = await EstadoDocumento.findOne({where:{ nombre : 'pendiente' }})
    if(!pendiente){
      throw new Error('no existe el estado pendiente en la base de datos')
    }


     const resp =  await Documentacion.create({pathFile:imagen,clubxusuarioId:result.id,estadodocumentoId:pendiente.id})


       res.status(200).json(resp)

    }catch(err){
        res.status(400).json({error: err.message})
        
    }
}

exports.getAllByClub =  async (req,res) => {
    
    try{

        const club = req.params.club

        const result = await Documentacion.findAll({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: { 
                    clubId:club,
                    activo: 1
                  }
            }]
        })

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
        
    } 
}


exports.getAllByClubByUser =  async (req,res) => {
    
    try{

        const club = req.params.club
        const usuario = req.params.usuario

        const result = await Documentacion.findOne({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: { 
                    clubId:club,
                    usuarioId:usuario,
                    activo: 1
                  }
            }],
            where: {  
                activo: 1
              }
        })

        if(!result)throw new Error('no existe el club o el usuario o la relacion entre ambos')

        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error: err.message})
        
    } 
}





exports.eliminar =  async (req,res) => {

    try{

        const club = req.params.club
        const usuario = req.params.usuario

        const result = await Documentacion.findOne({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: { 
                    clubId:club,
                    usuarioId:usuario,
                
                  }
            }]
        })

        if(result){
            
            result.activo = 0

            await result.save()
            res.status(200).json(result)
          
            
        }else{
            throw new Error('la disciplina no existe')
        }

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}




exports.ModificarImagen = async (req, res) => {


    try {
  
        const club = req.params.club
        const usuario = req.params.usuario

        const result = await Documentacion.findOne({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: { 
                    clubId:club,
                    usuarioId:usuario,
                    activo: 1
                  }
            }],
            where: {  
                activo: 1
              }
        })


        let imagen
        if(req.file) {
         imagen = req.file.filename
       
        }else{
          imagen = result.pathFile
        } 

    if(!result)throw new Error('no existe el club o el usuario o la relacion entre ambos')

   
      await Documentacion.update({pathFile:imagen,clubxusuarioId:result.clubxusuarioId,estadodocumentoId:result.estadodocumentoId},{where: {id: result.id}})
  
   
  
  
     res.status(200).json({ "message": "modificado con exito" })
  
    } catch (err) {
      console.log('error', err)
  
      res.status(400).json({ "error": err.message })
  
    }
  
  };


  exports.cambiarEstado =  async (req,res) => {

    try{

        const club = req.params.club
        const usuario = req.params.usuario
        const estado = req.params.estado

        const estadoResult = await EstadoDocumento.findByPk(estado)

        if(!estadoResult)throw new Error('el id de estado no existe')


        const result = await Documentacion.findOne({
            include: [{
                model: ClubXUsuario,
                as: 'clubxusuario',
                where: { 
                    clubId:club,
                    usuarioId:usuario,
                
                  }
            }]
        })

      
        if(result){
            
            result.estadodocumentoId = estado

            await result.save()
            res.status(200).json(result)
          
            
        }else{
            throw new Error('la disciplina no existe')
        }

    }catch(error){


   res.status(400).json({'error': error.message})
     
    }
}