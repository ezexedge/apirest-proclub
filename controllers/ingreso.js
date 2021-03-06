const Ingreso = require('../models/Ingreso')
const Reserva = require('../models/Reservas')
const Turno = require('../models/Turno')
const Espacio = require('../models/Espacio')
const Usuario =  require('../models/Usuario')
const Persona = require('../models/Persona')
const Rol = require('../models/rol')
const ClubXUsuario = require('../models/ClubXUsuario')
const moment = require('moment')
const _ = require('lodash');

const { Op, Sequelize } = require("sequelize");


exports.getAll =  async (req,res) => {

    try{

        const result = await Ingreso.findAll({
            include:[
                {
                    model: Usuario,
                    as: 'usuario',
                    include: [{
                        model: Persona,
                        as: 'persona'
                    }]
                },
                {
                model: Espacio,
                as: 'espacio'
            }]
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.getById =  async (req,res) => {

    try{

 
        

        res.status(200).json({message: 'en proceso'})

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.crear =  async (req,res) => {

    try{
//falta ponerle el id del usuario 
//agregarle la fecha

      const espacio = req.params.espacio
      const usuario = req.params.usuario
      const manager = req.params.manager


      const resultEspacio = await Espacio.findByPk(espacio)



      const resultManagerExiste = await Usuario.findByPk(manager)


      if(!resultManagerExiste)throw new Error('El usuario no existe')



      const resultManager = await ClubXUsuario.findOne({
          where: {
              usuarioId: manager
          }
      })


      if(!resultManager)throw new Error('El usuario no esta relacionado a un club')


      const resultRol = await Rol.findOne({
          where:{
              id: resultManager.rolId
          }
      })



      if(resultRol.nombre.toLowerCase() !== 'manager')throw new Error('El id de manager no corresponde a su rol')
      

      if(!resultEspacio)throw new Error('El espacio no existe')

      const hora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')

     
   
         await Ingreso.create({espacioId: espacio,usuarioId: usuario,hora:hora,managerId:manager})

        res.status(200).json({message:'se creo  un ingreso'})

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}




exports.getByUser =  async (req,res) => {

    try{



        const usuario = req.params.userId


        const resultUsuario = await Usuario.findByPk(usuario)

        if(!resultUsuario)throw new Error('El usuario no existe')
        
        const result = await Ingreso.findAll({
            include:[{
                model: Espacio,
                as: 'espacio'
            },{
                model: Usuario,
                as: 'manager'
            }
        ],
            where:{
                usuarioId: usuario
            }
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}

exports.getByEspacio =  async (req,res) => {

    try{

        const espacio = req.params.espacio

        const resultEspacio = await Espacio.findByPk(espacio)

        if(!resultEspacio)throw new Error('el id del espacio no existe')

        
        const result = await Ingreso.findAll({
            include:[    {
                model: Usuario,
                as: 'usuario',
                attributes: ['id'],

                include: [{
                    model: Persona,
                    as: 'persona'
                }]
            }],
            where: { espacioId: espacio },
            order: [['id', 'DESC']]
        })

        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}




exports.getFiltro =  async (req,res) => {

    try{


        const desde = req.params.desde
        const hasta = req.params.hasta
        const manager = req.params.manager
        const usuario = req.params.usuario
        const espacio = req.params.espacio

        console.log('..////////////////',desde,hasta,manager,espacio,usuario)
       

        const desdeFilter =  desde !== 'null' ?  `${desde} 00:00:00` : moment().weekday(-3).format("YYYY-MM-DD HH:mm:ss")
        const hastaFilter =  hasta !== 'null' ? ` ${hasta} 00:00:00` : moment().format("YYYY-MM-DD HH:mm:ss")



       let result = await Ingreso.findAll({
            where: { 
                fecha : { [Op.between] : [ `${desdeFilter}` , `${hastaFilter}` ]}
               
        },
            order: [['id', 'DESC']]            
            
        })


        if(espacio !== 'null'){
            result = _.filter(result, {'espacioId': Number(espacio)})
      
        }

        if(usuario !== 'null'){
            result = _.filter(result, {'usuarioId': Number(usuario)})
           
        }

        if(manager !== 'null'){
             
            result = _.filter(result, {'managerId': Number(manager)})
           
        }

      


       
        
       
   
        res.status(200).json(result)

     }catch(error){

        res.status(400).json({'error': error.message})
        
    }

}