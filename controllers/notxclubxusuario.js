const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')
const NotificacionXClub = require('../models/NotificacionXClub')
const Persona = require('../models/Persona')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const Usuario = require('../models/Usuario')
exports.crear = async (req,res)=> {

    try{


        const notxclub = req.params.notxclub
        const clubxusuario = req.params.clubxusuario

        const resultNotXClub = await NotificacionXClub.findOne({
            where: {
                id: notxclub,
                activo: 1
            }
        })

        if(!resultNotXClub)throw new Error('el id de la notifcacion x club no existe')

        const resultClubxusuario = await ClubXUsuario.findOne({
            where: {
                id: clubxusuario,
                activo: 1
            }
        })

        if(!resultClubxusuario)throw new Error('el id de club x usuario no existe')

        
        const result = await NotXClubXUsuario.create({ notificacionxclubId : Number(notxclub),clubxusuarioId: Number(clubxusuario)})
        

        res.status(200).json(result)

    }catch(err){

        res.status(400).json({error: err.message})
    
    }
}



exports.getAllByClubByUser = async (req,res) => {
    try{

        const notificacion = req.params.notificacion
       
      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
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
                model: NotificacionXClub,
                as: 'club',
                where: { notificacionId: notificacion },
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                },{
                    model: Club,
                    as: 'club'
                }]
                }   
            ],
            order: [['id', 'DESC']]

        })


        let arr = []
        for(let val of resp){
    
          arr.push(val.clubxusuario)
        }
    

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}


exports.getById = async (req,res) => {
    try{

        const id = req.params.id
      


        const result = await NotXClubXUsuario.findOne({
            where: {
                activo: 1,
                id: id
            }
        })

        if(!result)throw new Error('el id no existe')

        result.visto+=1




        await result.save()
       
        
        
        res.status(200).json(result)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}






exports.getNotificacionByUser = async (req,res) => {
    try{

        const user = req.params.userId
       

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                include: [{
                  model: Usuario,
                  as: 'usuario',
                  where:{id: user},
                  include: [{
                      model: Persona,
                      as: 'persona'
                  }]
                }]
                },
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            order: [['id', 'DESC']]

        })



        let arr = []

        for(let val of resp){

            let obj = {
                id: val.id,
                activo: val.activo,
                clubxusuario: val.clubxusuario,
                notificacionxclubId: val.notificacionxclubId,
                clubxusuarioId: val.clubxusuarioId,
                usuarioId: val.usuarioId,
                notificacion: val.club.notificacion,
                enviadoPor: `${val.usuario.persona.nombre} ${val.usuario.persona.apellido}`

            }

            arr.push(obj)


        }

        res.status(200).json(arr)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}





exports.getNotificacionEnviadaPor = async (req,res) => {
    try{

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                }   
            ],
            where:{usuarioId: req.auth.userId},
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




exports.getNotificacionByUserByClub = async (req,res) => {
    try{

        const user = req.params.user
        const club = req.params.club

        const usuarioExiste =  await  Usuario.findByPk(Number(user))

        if(!usuarioExiste)throw new Error('el usuario no existe')


        const clubExiste = await Club.findByPk(Number(club))

        if(!clubExiste)throw new Error('el club no existe')


      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                 where:{
                     clubId: club,
                     usuarioId: user
                 },
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
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion',
                    where:{
                        activo: 1
                    }
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            where:{
                activo: 1
            },
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}




exports.getAllNotificacionUser = async (req,res) => {
    try{

        const user = req.params.user
      

        const usuarioExiste =  await  Usuario.findByPk(user)

        if(!usuarioExiste)throw new Error('el usuario no existe')


  

      
        const resp =  await NotXClubXUsuario.findAll({
            include:[
                {
                 model: ClubXUsuario,
                 as: 'clubxusuario',
                 where:{
                     usuarioId: user
                 },
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
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion',
                    where:{
                        activo: 1
                    }
                }]
                },{
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                }  
            ],
            where:{
                activo: 1
            },
            order: [['id', 'DESC']]

        })




        res.status(200).json(resp)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}

//getNotificacionByUserByClub





[
    {
      "id": 4181,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 863,
      "clubxusuarioId": 1295,
      "usuarioId": 945,
      "estadonotificacionId": null,
      "clubxusuario": {
        "id": 1295,
        "activo": 1,
        "clubId": 585,
        "rolId": 3,
        "rolanteriorId": null,
        "usuarioId": 1225,
        "estadoId": 1,
        "usuario": {
          "id": 1225,
          "idFirebase": "Xl1Z2QI2wkakPvmhvY0uintxFRm2",
          "idDevice": null,
          "ultimoIngreso": null,
          "activo": 1,
          "personaId": 1925,
          "persona": {
            "id": 1925,
            "nombre": "Mariano",
            "apellido": "Mascarelli",
            "documento": "33389683",
            "sexo": "masculino",
            "avatar": null,
            "correo": "marianogabriel.gm@gmail.com",
            "telefono": "3517575555",
            "fechaNacimiento": "1987-11-11T23:38:06.919-00:00",
            "direccionPersonaId": 1965,
            "tipoDocumentId": 1
          }
        }
      },
      "club": {
        "id": 863,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2364,
        "notificacion": {
          "id": 2364,
          "titulo": "prueba noti juan",
          "descripcion": "prueba noti juan",
          "descripcion_corta": null,
          "fecha": "2021-11-02",
          "hora": "14:51:12",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 945,
        "idFirebase": "lSvQKv7phXONvo2obCUIf48r1PM2",
        "idDevice": null,
        "ultimoIngreso": "135",
        "activo": 1,
        "personaId": 1585,
        "persona": {
          "id": 1585,
          "nombre": "Tito",
          "apellido": "Forns",
          "documento": "3205854632",
          "sexo": "masculino",
          "avatar": null,
          "correo": "titoforns@gmail.com",
          "telefono": "12345656562",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1535,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4180,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 863,
      "clubxusuarioId": 1535,
      "usuarioId": 945,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 863,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2364,
        "notificacion": {
          "id": 2364,
          "titulo": "prueba noti juan",
          "descripcion": "prueba noti juan",
          "descripcion_corta": null,
          "fecha": "2021-11-02",
          "hora": "14:51:12",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 945,
        "idFirebase": "lSvQKv7phXONvo2obCUIf48r1PM2",
        "idDevice": null,
        "ultimoIngreso": "135",
        "activo": 1,
        "personaId": 1585,
        "persona": {
          "id": 1585,
          "nombre": "Tito",
          "apellido": "Forns",
          "documento": "3205854632",
          "sexo": "masculino",
          "avatar": null,
          "correo": "titoforns@gmail.com",
          "telefono": "12345656562",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1535,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4179,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 863,
      "clubxusuarioId": 1625,
      "usuarioId": 945,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 863,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2364,
        "notificacion": {
          "id": 2364,
          "titulo": "prueba noti juan",
          "descripcion": "prueba noti juan",
          "descripcion_corta": null,
          "fecha": "2021-11-02",
          "hora": "14:51:12",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 945,
        "idFirebase": "lSvQKv7phXONvo2obCUIf48r1PM2",
        "idDevice": null,
        "ultimoIngreso": "135",
        "activo": 1,
        "personaId": 1585,
        "persona": {
          "id": 1585,
          "nombre": "Tito",
          "apellido": "Forns",
          "documento": "3205854632",
          "sexo": "masculino",
          "avatar": null,
          "correo": "titoforns@gmail.com",
          "telefono": "12345656562",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1535,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4178,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 862,
      "clubxusuarioId": 1295,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": {
        "id": 1295,
        "activo": 1,
        "clubId": 585,
        "rolId": 3,
        "rolanteriorId": null,
        "usuarioId": 1225,
        "estadoId": 1,
        "usuario": {
          "id": 1225,
          "idFirebase": "Xl1Z2QI2wkakPvmhvY0uintxFRm2",
          "idDevice": null,
          "ultimoIngreso": null,
          "activo": 1,
          "personaId": 1925,
          "persona": {
            "id": 1925,
            "nombre": "Mariano",
            "apellido": "Mascarelli",
            "documento": "33389683",
            "sexo": "masculino",
            "avatar": null,
            "correo": "marianogabriel.gm@gmail.com",
            "telefono": "3517575555",
            "fechaNacimiento": "1987-11-11T23:38:06.919-00:00",
            "direccionPersonaId": 1965,
            "tipoDocumentId": 1
          }
        }
      },
      "club": {
        "id": 862,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2363,
        "notificacion": {
          "id": 2363,
          "titulo": "prueba",
          "descripcion": "aa",
          "descripcion_corta": "<p>aa</p>",
          "fecha": "2021-11-01",
          "hora": "06:46:53",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4177,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 862,
      "clubxusuarioId": 1535,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 862,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2363,
        "notificacion": {
          "id": 2363,
          "titulo": "prueba",
          "descripcion": "aa",
          "descripcion_corta": "<p>aa</p>",
          "fecha": "2021-11-01",
          "hora": "06:46:53",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4176,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 862,
      "clubxusuarioId": 1625,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 862,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2363,
        "notificacion": {
          "id": 2363,
          "titulo": "prueba",
          "descripcion": "aa",
          "descripcion_corta": "<p>aa</p>",
          "fecha": "2021-11-01",
          "hora": "06:46:53",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4175,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 861,
      "clubxusuarioId": 925,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 861,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2362,
        "notificacion": {
          "id": 2362,
          "titulo": "ss",
          "descripcion": "ss",
          "descripcion_corta": "<p>sss</p>",
          "fecha": "2021-11-01",
          "hora": "19:33:28",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4174,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 861,
      "clubxusuarioId": 1535,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 861,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2362,
        "notificacion": {
          "id": 2362,
          "titulo": "ss",
          "descripcion": "ss",
          "descripcion_corta": "<p>sss</p>",
          "fecha": "2021-11-01",
          "hora": "19:33:28",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4173,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 861,
      "clubxusuarioId": 1625,
      "usuarioId": 75,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 861,
        "activo": 1,
        "clubId": 585,
        "notificacionId": 2362,
        "notificacion": {
          "id": 2362,
          "titulo": "ss",
          "descripcion": "ss",
          "descripcion_corta": "<p>sss</p>",
          "fecha": "2021-11-01",
          "hora": "19:33:28",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 75,
        "idFirebase": "NBzbQ986mbg0o7FSjBd9SOikQT73",
        "idDevice": null,
        "ultimoIngreso": "1",
        "activo": 1,
        "personaId": 105,
        "persona": {
          "id": 105,
          "nombre": "nicolas ",
          "apellido": "quintana",
          "documento": "123445",
          "sexo": "masculino",
          "avatar": null,
          "correo": "nuevo333@gmail.com",
          "telefono": "3517575555",
          "fechaNacimiento": "1987-05-10T22:43:11.908-00:00",
          "direccionPersonaId": 1965,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4172,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 860,
      "clubxusuarioId": 705,
      "usuarioId": 685,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 860,
        "activo": 1,
        "clubId": 135,
        "notificacionId": 2360,
        "notificacion": {
          "id": 2360,
          "titulo": "prueba",
          "descripcion": "aa",
          "descripcion_corta": "<p>aqaa</p>",
          "fecha": "2021-11-01",
          "hora": "19:07:06",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 685,
        "idFirebase": "SzOB7MtYgbaTZOkuLoK4yFVC42p1",
        "idDevice": "eRxxooyGRTOtKocqW70DaZ:APA91bF7SmXBc_0GGwHSj06xaZER5_OVicFuFO8ZjGpLlmjhhVE79VsHR9kxC3gmyAhKoe7Lfj_t0cTIY_UpZ03nIIzizN9E2E39v4vNb_LbuITNf9P-q98EL55kc_are-2dHkkKcoSF",
        "ultimoIngreso": "135",
        "activo": 1,
        "personaId": 1195,
        "persona": {
          "id": 1195,
          "nombre": "ezequiel",
          "apellido": "gallardo",
          "documento": "36596244",
          "sexo": "masculino",
          "avatar": "tdsZuMvR2.png",
          "correo": "ezeedge@gmail.com",
          "telefono": "1161477517",
          "fechaNacimiento": "2021-08-19T01:23:14.000Z",
          "direccionPersonaId": 1065,
          "tipoDocumentId": 1
        }
      }
    },
    {
      "id": 4171,
      "visto": 0,
      "activo": 1,
      "notificacionxclubId": 860,
      "clubxusuarioId": 925,
      "usuarioId": 685,
      "estadonotificacionId": null,
      "clubxusuario": null,
      "club": {
        "id": 860,
        "activo": 1,
        "clubId": 135,
        "notificacionId": 2360,
        "notificacion": {
          "id": 2360,
          "titulo": "prueba",
          "descripcion": "aa",
          "descripcion_corta": "<p>aqaa</p>",
          "fecha": "2021-11-01",
          "hora": "19:07:06",
          "activo": 1,
          "usuarioId": 945
        }
      },
      "usuario": {
        "id": 685,
        "idFirebase": "SzOB7MtYgbaTZOkuLoK4yFVC42p1",
        "idDevice": "eRxxooyGRTOtKocqW70DaZ:APA91bF7SmXBc_0GGwHSj06xaZER5_OVicFuFO8ZjGpLlmjhhVE79VsHR9kxC3gmyAhKoe7Lfj_t0cTIY_UpZ03nIIzizN9E2E39v4vNb_LbuITNf9P-q98EL55kc_are-2dHkkKcoSF",
        "ultimoIngreso": "135",
        "activo": 1,
        "personaId": 1195,
        "persona": {
          "id": 1195,
          "nombre": "ezequiel",
          "apellido": "gallardo",
          "documento": "36596244",
          "sexo": "masculino",
          "avatar": "tdsZuMvR2.png",
          "correo": "ezeedge@gmail.com",
          "telefono": "1161477517",
          "fechaNacimiento": "2021-08-19T01:23:14.000Z",
          "direccionPersonaId": 1065,
          "tipoDocumentId": 1
        }
      }
    }
  ]