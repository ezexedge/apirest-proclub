
const db = require('../config/db')
const Persona = require('../models/Persona')
const Direccion = require('../models/Direccion')
const TipoDocumento = require('../models/TipoDocumento')
const ClubXUsuario = require('../models/ClubXUsuario')
const Pais = require('../models/Pais')
const Provincia = require('../models/Provincia')
const Notificacion = require('../models/Notificacion')
const Club = require('../models/Club')
const NotificacionXClub = require('../models/NotificacionXClub')
const NotXClubXUsuario = require('../models/NotXClubXUsuario')
const RelDisciplinaXClub = require('../models/RelDisciplinaXClub')
const Disciplina = require('../models/Disciplina')
const Reservas =  require('../models/Reservas')
const Turno = require('../models/Turno')
const EstadoTurno = require('../models/EstadoTurno')
const Espacio = require('../models/Espacio')
const EstadoReserva = require('../models/EstadoReserva')
const BeneficioXClub = require('../models/BeneficioXClub')
const Beneficios = require('../models/Beneficios')
const Rubro = require('../models/Rubro')
const Usuario = require('../models/Usuario')
const NotificacionVistasXUsuarios = require('../models/NotificacionVistasXUsuarios')
const _ = require('lodash')


exports.getAll = async (req,res) => {
    try{

      
        const club =  req.params.club
        const usuario = req.params.user



        const existeClub = await Club.findByPk(club)

        if(!existeClub)throw new Error(`el club ${club} no existe en la base de datos`)

        const existeUsuario = await Usuario.findByPk(usuario)
        if(!existeUsuario)throw new Error(`el usuario ${usuario} no existe en la base de datos`)


        const final = {
            notificaciones: [],
            disciplinaxclub: [],
            turnos: [],
            beneficios: []
        }

        const result =  await ClubXUsuario.findOne({
           
            where: {
                activo: 1,
                clubId: club,
                usuarioId:usuario
            }
        })
        

        if(!result)throw new Error('el usuario no existe o no existe en el club')

        
        console.log('clubxxx',result)

        const resultVisto = await NotificacionVistasXUsuarios.findAll({})


        const resp =  await NotXClubXUsuario.findAll({
            include:[{
                model: NotificacionXClub,
                as: 'club',
                include:[{
                    model: Notificacion,
                    as: 'notificacion'
                }]
                }   
            ],
            where:{
                activo:1,
                clubxusuarioId: result.id
            }
        })


        console.log('eeeee',resp)

        let arrNoVistas = []
        for(let val of resp){

            let encontrado = _.find(resultVisto, { 'usuarioId': Number(usuario), 'notificacionId': val.club.notificacion.id });
                console.log({ 'usuarioId': Number(usuario), 'notificacionId': val.club.notificacion.id })
  
              //  let encontrado = _.find(resultVisto, function(o) { return o.usuarioId === Number(user) && o.notificacionId ===  val.club.notificacion.id ; });
             
                if(!encontrado){
                   arrNoVistas.push(val)
                }
      


        }






    final.notificaciones = [...arrNoVistas]
    

    //RelDisciplinaXClub

    const resultDisciplina =  await RelDisciplinaXClub.findAll({
        include:[{
          
            model: Disciplina,
            as: 'disciplina',
            where: { activo: 1 },
        }],
        where: {
            activo: 1,
            clubId: club,
        }
    })

    final.disciplinaxclub = [...resultDisciplina]



    const resultReservas =  await Reservas.findAll({
        include:[
            {
                model: EstadoReserva,
            as: 'estadoreserva',   

            },
            {
                model: RelDisciplinaXClub,
                as: 'disciplinaxclub',
                where:{
                    clubId: club
                
                }
            },
            {
                model: Espacio,
                as: 'espacio'
            }
    ],
        where:{
            usuarioId: usuario,
            activo:1
        }
    })


    final.turnos = [...resultReservas]

/*
    const resultBeneficios = await BeneficioXClub.findAll({
        include:[  {
            model : Beneficios,
            as: 'beneficio',
            include:[{
                model: Rubro,
                as: 'rubro'
            }]
        }],
        where:{
            usuarioId: usuario,
            activo:1
        }
    })

    */

    final.beneficios = []



        res.status(200).json(final)


    }catch(err){

        
        res.status(400).json({error: err.message})

    }
}
