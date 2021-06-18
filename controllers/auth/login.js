const Persona = require('../../models/Persona')
const Usuario = require('../../models/Usuario')
const Rol = require('../../models/rol')
const ClubXUsuario = require('../../models/ClubXUsuario')
const admin = require('firebase-admin')
const db = require('../../config/db')
const firebase = require('../../firebase')
const RelDisciplinaXClub = require('../../models/RelDisciplinaXClub')
const RelUsuarioXDis = require('../../models/RelUsuarioXDis')
const Estados = require('../../models/Estados')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

            
exports.signup = async(req,res)=>{

    const t = await db.transaction()

   
    try{

        const {email,nombre,apellido,password,deporte,club,documento} = req.body
        const result = await Persona.findOne({where:{correo:email}})

        const disciplinaxclub = await RelDisciplinaXClub.findOne({where:{
            clubId: club,
            disciplinaId: deporte
        }})

        if(!disciplinaxclub){
            throw new Error('El club con la disciplina no coincide')
        }



        console.log(disciplinaxclub)        
        
        const rol = await Rol.findOne({where:{ nombre : 'socio' }})

        if(!rol){
            throw new Error('el rol de socio no existe en la tabla')
        }
        
        if(result){
           throw new Error('el usuario ya esta registrado') 
        }else{

           const resultFirebase =  await admin.auth().createUser({
                email: email,
                password: password                 
              })

              console.log(resultFirebase)


              const pendiente = await Estados.findOne({where:{ nombre : 'pendiente' }})
              if(!pendiente){
                throw new Error('no existe el estado pendiente en la base de datos')
              }
          
              const nuevaPersona = await Persona.create({ nombre: nombre, apellido: apellido,correo: email, tipoDocumentId: 1,  documento: documento },{ transaction: t })
            
              const nuevoUsuario = await Usuario.create({  personaId: nuevaPersona.id , activo: 1 ,idFirebase: resultFirebase.uid ,  ultimoIngreso: disciplinaxclub.clubId  },{ transaction: t })
          
             const clubxusuario =  await ClubXUsuario.create({ clubId: club, usuarioId: nuevoUsuario.id , activo: 1 , estadoId: pendiente.id,rolId: rol.id },{ transaction: t })

             console.log(clubxusuario.id,disciplinaxclub.id)


                await RelUsuarioXDis.create({ clubxusuarioId: clubxusuario.id , disciplinaxclubId: disciplinaxclub.id },{transaction: t})
            

               await t.commit();


              res.status(200).json({'message': 'creado correctamente'})
            

        }

    }catch(error){

        await t.rollback();
   
        res.status(400).json({'message': error.message})
    }
}

exports.signin = async (req,res)=>{
    try{
    


        const {email,password} = req.body
        const resultFirebase = await  firebase.auth().signInWithEmailAndPassword(email, password)

        console.log('tokken',resultFirebase)
        let token = ''
        if(resultFirebase){

            const persona = await Persona.findOne({where:{correo: email}})

            if(!persona){
                throw new Error('no esta registrado')
            }

            const usuario = await Usuario.findOne({where: {personaId : persona.id} })


            if(!usuario){
                throw new Error('no esta registrado')
            }

            const clubxusuario =  await ClubXUsuario.findOne({where: { usuarioId: usuario.id }})

            if(!clubxusuario){
                throw new Error('error al encontrar usuario en clubXusuario')
            }

            const pendiente = await Estados.findOne({where:{ nombre : 'pendiente' }})
            if(!pendiente){
            throw new Error('no existe el estado pendiente en la base de datos')
            }

            if(pendiente.id === clubxusuario.estadoId){
                throw new Error('su estado esta pendiente no puede ingresar')
            }
            const desaprobado = await Estados.findOne({where:{ nombre : 'desaprobado' }})
            

            if(desaprobado.id === clubxusuario.estadoId){
                throw new Error('no esta aprobado no puede ingresar')
            }


            const rol = await Rol.findByPk(clubxusuario.rolId)


            if(!rol){
                throw new Error('no esta registrado')
            }

            console.log(rol)

             token = jwt.sign({userId: usuario.id , rol : rol.nombre , clubId: clubxusuario.clubId }, process.env.JWT_SECRET)

            res.cookie("t",token,{expire: new Date() + 9999 })
            
       
        }

        res.status(200).json({token : token})

        


    }catch(error){
        res.status(400).json({'error': error.message})
    }
}

exports.registrarEnFirebase = async(req,res)=>{
    
    try{


    const {email,password} = req.body

    const result = await Usuario.findOne({
        include: [
            {
                model: Persona,
                as: 'persona',
                where: {
                    correo: email
                }
            }
        ]
    })

    if(!result){
        throw new Error('el usuario no existe')
        
    }

    if(result && result.idFirebase !== null) {
        throw new Error('el usuario ya esta registrado en firebase')
    }

    

        const resultFirebase =  await admin.auth().createUser({
            email: email,
            password: password                 
          })

    
      await Usuario.update({idFirebase: resultFirebase.uid }, {where: { id : result.id }})    

    res.status(200).json(resultFirebase)

    }catch(error){


        res.status(400).json({'message': error.message})

    }
}



exports.resetPassword = async(req,res)=> {
    try{

        const {email} = req.body

        const resp = await admin.auth().listUsers()

        console.log(resp)

        const encontrado = resp.users.find(obj => obj.email === email)
        
        if(!encontrado){
            throw new Error('El email no esta registrado')
        }

         await firebase.auth().sendPasswordResetEmail(email);


        res.status(200).json({'message': 'revise su bandeja de entrada'})

    }catch(error){

        res.status(400).json({'message': error.message})

    }
}



exports.cambiarClave = async (req,res) => {


    try{

        const {claveActual,nuevaClave,repetirClave} = req.body


        const result = await Usuario.findByPk(req.auth.userId)

        if(!result)throw new Error('no existe el usuario registrado')

        console.log(result.idFirebase)        

        if(nuevaClave !== repetirClave){
            throw new Error('Los password no son identicos')
        }
      
    const resp =   await   admin.auth().updateUser(result.idFirebase, {
          
          password: nuevaClave,
          disabled: false,
        })
    
        console.log('soy la resp')
    

        if(!resp) throw new Error('error en la operacion')


        res.status(200).json({message: resp})


    }catch(err){

        console.log(err)
        res.status(400).json({error : err.message})

    }

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });