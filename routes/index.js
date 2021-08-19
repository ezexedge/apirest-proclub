const express = require('express');
const router = express.Router();
const FCM = require('fcm-node')

const clubControllers = require('../controllers/club')
const paisControllers = require('../controllers/pais')
const provinciaControllers = require('../controllers/provincia')
const tipoDocumentoControllers = require('../controllers/tipoDocumento')
const personControllers = require('../controllers/persona')
const direccionControllers = require('../controllers/direccion')
const rolControllers = require('../controllers/rol')
const usuariosControllers = require('../controllers/usuarios')
const disciplinaControllers = require('../controllers/disciplina')
const reldisciplinaxclubControllers = require('../controllers/reldisciplinaxclub')
const authValidateControllers = require('../controllers/auth/validate')
const authSignupControllers = require('../controllers/auth/login')
const posicionControllers = require('../controllers/posicion')
const divisionControllers = require('../controllers/reldisciplinaxclubxdiv')
const imageControllers = require('../controllers/imagen')
const beneficiosControllers = require('../controllers/beneficios')
const rubroControllers = require('../controllers/rubro')
const notificacionControllers = require('../controllers/notificacion')
const notxclubControllers = require('../controllers/notificacionxclub')
const notxclubxusuario = require('../controllers/notxclubxusuario')
const encuestaControllers = require('../controllers/encuesta')
const preguntaControllers = require('../controllers/pregunta')
const respuestaControllers = require('../controllers/repuesta')
const espacioControllers = require('../controllers/espacio')
const estadoEspacioControllers = require('../controllers/estadoEspacio')
const excluidoControllers = require('../controllers/excluidos')
const estadoTurnoControllers = require('../controllers/estadoturno')
const turnoControllers = require('../controllers/turno')
const estadodocumentoControllers = require('../controllers/estadoDocumento')
const documentoControllers = require('../controllers/documentacion')
const archivoControllers = require('../controllers/archivo')
const estadoReservaControllers = require('../controllers/estadoReserva')
const reservaControllers = require('../controllers/reserva')
const ingresoControllers = require('../controllers/ingreso')
const estadoControllers = require('../controllers/estado')
const usuarioXDisciplina = require('../controllers/relUsuarioXDis')
const divControllers = require('../controllers/division')
const posicionxdisciplinaControllers = require('../controllers/reldisciplinaxpos')
const dashboardControllers = require('../controllers/dashboard')
const usuarioInformacionFinal = require('../controllers/relposxusuarioxdivxdep')
const tematicaControllers = require('../controllers/tematica')
const disciplinaAdminControllers = require('../controllers/disciplinaxclubxpos')

module.exports = function(){


/**
 * @swagger
 * components:
 *   schemas:
 *     TipoDocumento:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: dni    
 *     Rubros:
 *       type: object
 *       properties:
 *        id: 
 *         type: integer
 *        nombre: 
 *         type: string
 *       example:
 *        id: 1
 *        nombre: cines
 *     Rols:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: superadmin 
 *     Estado:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: aprobado        
 *     Pais:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: argentina  
 *     Provincia:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: la pampa
 *        countryId: 1 
 *     Direccion:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        calle:
 *          type: string
 *        numero: 
 *          type: integer
 *        localidad:
 *          type: string
 *        cp:
 *          type: string
 *        direccionId:
 *          type: integer
 *       example:
 *        id: 1
 *        calle: vedia y mitre
 *        numero: 123
 *        localidad: moreno
 *        cp: 1744
 *        direccionId: 12      
 *     Persona:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         documento:
 *           type: string
 *         sexo:
 *           type: string
 *         avatar:
 *           type: string
 *         correo:
 *           type: string
 *         telefono:
 *           type: string
 *         fechaNacimiento:
 *           type: string   
 *         tipoDocumento:
 *           type: integer
 *       example:
 *        id: 1195
 *        nombre: juan
 *        apellido: gallardo
 *        documento: 36596211
 *        sexo: masculino
 *        avatar: https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg
 *        correo: otracuentanueva@gmail.com
 *        telefono: 351575757
 *        fechaNacimiento: 2021-08-19T01:23:14.000Z
 *        direccionPersonaId: 1065
 *        tipoDocumentId: 1                  
 *     Usuarios:
 *       type: object
 *       properties:
 *         id:
 *           type: integer 
 *         idFirebase:
 *           type: string
 *         ultimoIngreso:
 *           type: string
 *         activo:
 *           type: integer
 *         personaId:
 *           type: integer
 *       example:
 *         id: 685
 *         idFirebase: SzOB7MtYgbaTZOkuLoK4yFVC42p1
 *         ultimoIngreso: 135
 *         activo: 1
 *         personaId: 1195                
 *     Clubs:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         logo:
 *           type: string
 *         colorPrimario:
 *           type: string
 *         colorTextoPrimario:
 *           type: string
 *         colorSecundario:
 *           type: string
 *         colorTextoSecundario:
 *           type: string
 *         nombre_visible:
 *           type: string
 *         activo:
 *           type: integer
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 *         cuit:
 *           type: string
 *         instagram: 
 *           type: string
 *         facebook:
 *           type: string
 *         twitter: 
 *           type: string  
 *         direccion:
 *           $ref: '#/components/schemas/Direccion'     
 *       example:
 *         id: 1
 *         nombre: club prueba
 *         descripcion: es un club
 *         logo: image1
 *         colorPrimario: #FFFF
 *         colorSecundario: #FFFF
 *         colorTextoPrimario: #FFFF
 *         colorTextoSecundario: #FFFF
 *         nombre_visible: club
 *         activo: 1
 *         email: club@gmail.com
 *         telefono: 11114533
 *         cuit: 1111030344
 *         instagram: club
 *         facebook: club
 *         twitter: club
 *         direccion: 
 *           calle: "calle falsa"
 *           numero: 123
 *           cp: '113'
 *           localidad: 'moreno'
 *           provinciaId: 1
 *     Beneficios:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *        descripcion:
 *          type: string
 *        telefono:
 *          type: string
 *        web:
 *          type: string
 *        instagram:
 *          type: string
 *        correo:
 *          type: string
 *        pathImage:
 *          type: string
 *        activo:
 *          type: integer
 *        rubroId:
 *          type: integer
 *       example: 
 *        id: 1
 *        nombre: cinemark
 *        descripcion: entradas para cine
 *        telefono: 0224213146
 *        web: https://www.cinemarkhoyts.com.ar/
 *        instagram: (arroba)cine
 *        correo: cine@gmail.com
 *        pathImage: https://oxigeno.com/images/default-source/tiendas/cinemark/logo-cinemark-min.jpg?sfvrsn=e4323cc1_8
 *        activo: 1
 *        rubro: 1
  *     Encuesta:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        titulo:
 *          type: string  
 *        descripcion:
 *          type: string
 *        activo:
 *          type: integer
 *     Pregunta:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        titulo:
 *          type: string  
 *        encuestaId:
 *          type: integer
 *        activo:
 *          type: integer
 *     Respuesta:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        titulo:
 *          type: string  
 *        contadorDeRespuestas:
 *          type: integer
 *        preguntaId:
 *          type: integer
 *        activo:
 *          type: integer    
 *     Reservas:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        fecha:
 *          type: date
 *        turnoId:
 *          type: integer
 *        usuarioId:
 *          type: integer
 *        estadoreservaId:
 *          type: integer
 *        activo:
 *          type: integer
 *       example:
 *        id: 1
 *        fecha: 2021-06-24
 *        activo: 1
 *        turnoId: 1
 *        usuarioId: 35
 *        estadoreservaId: 1
 *     Turnos:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        fecha:
 *          type: string
 *        horaDesde:
 *          type: string
 *        horaHasta:
 *          type: string
 *        precio:
 *          type: integer
 *        cupo:
 *          type: integer
 *        activo:
 *          type: integer
 *        estadoturnoId:
 *          type: integer
 *        espacioId:
 *          type: integer           
 *       example:
 *        id: 1
 *        fecha: 2021/06/30
 *        horaDesde: 09:00
 *        horaHasta: 12:00
 *        precio: 1000
 *        cupo: 11
 *        activo: 0
 *        estadoturnoId: 1
 *        espacioId: 1 
 *     EstadoEspacio:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: aprobado
 *     Espacios:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *        descripcion:
 *          type: string
 *        maxReservasDia:
 *          type: integer
 *        maxReservasSem:
 *          type: integer
 *        maxReservasAno:
 *          type: integer
 *        horasPrevia:
 *          type: string
 *        tiempoDeAnticipacion:
 *          type: string
 *        tiempoDeCancelacion:
 *          type: string
 *        estadoespacioId:
 *          type: integer
 *        clubId:
 *          type: integer
 *        activo:
 *          type: integer
 *       example:
 *        id: 1
 *        nombre: espacio 1
 *        descripcion: es un espacio de prueba
 *        maxReservasDia: 10
 *        maxReservasSem: 200
 *        maxReservasAno: 400
 *        horasPrevia: 1
 *        tiempoDeAnticipacion: 1
 *        tiempoDeCancelacion: 1
 *        activo: 1
 *        clubId: 145
 *        estadoespacioId: 1
 *     Posicion:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         activo:
 *          type: integer
 *         disciplinaId:
 *          type: integer
 *        example:
 *         id: 15
 *         nombre: delantero
 *         activo: 1
 *         disciplinaId: 185
 *     Notificaciones:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *          type: string
 *         fecha:
 *          type: string
 *         activo:
 *          type: integer
 *         descripcion_corta:
 *          type: string
 *     RelUsuarioXDis:
 *        type: object
 *        properties:
 *         id:
 *           type: integer   
 *         clubxusuarioId:
 *           type: integer
 *         disciplinaxclubId:
 *           type: integer
 *         activo:
 *           type: integer
 *        example:
 *         id: 325
 *         activo: 1
 *         disciplinaxclubId: 73
 *         clubxusuarioId: 375       
 *     BeneficioXClubs:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         clubId:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         beneficioId:
 *           type: integer
 *         actvio:
 *           type: integer
 *        example:
 *         id: 1
 *         activo: 1
 *         clubId: 4
 *         usuarioId: 35
 *         beneficioId: 2   
 *     RelPosXUsuarioXDivXDeps:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         clubxusuarioId:
 *           type: integer
 *         disxclubxdivId:
 *           type: integer
 *         disciplinaxclubxposId:
 *           type: integer
 *         activo:
 *           type: integer
 *        example:
 *         id: 75
 *         activo: 1
 *         clubxusuarioId: 705
 *         disxclubxdivId: 5
 *         disciplinaxclubxposId: 2      
 *     RelDisciplinaXClubXDiv:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         disciplinaxclubId:
 *          type: integer
 *         activo: 
 *          type: integer
 *        example:
 *          id: 5
 *          nombre: division 1
 *          activo: 1
 *          disciplinaxclubId: 72
 *     DisciplinaXClubXPos:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         disxclubId: 
 *          type: integer
 *         disciplinaxposId:
 *          type: integer
 *         activo:
 *           type: integer
 *        example:
 *         id: 1
 *         activo: 1
 *         disxclubId: 72
 *         disciplinaxposId: 2
 *     RelDisciplinaXPos:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         activo:
 *           type: integer
 *         disciplinaId:
 *           type: integer
 *        example:
 *         id: 1
 *         activo: 1
 *         disciplinaId: 1
 *         nombre: arquero
 *     Disciplinas:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         activo:
 *           type: integer
 *         icono:
 *           type: string
 *        example:
 *         id: 95
 *         nombre: tenis
 *         activo: 1
 *         icono: sports_tennis
 *     RelDisciplinaxClub:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         clubId:
 *           type: integer
 *         disciplinaId:
 *           type: integer
 *         activo:
 *           type: integer
 *        example:
 *         id: 73
 *         activo: 1
 *         clubId: 135
 *         disciplinaId: 95
 *     ClubXUsuarios:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         clubId: 
 *           type: integer
 *         rolId:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         estadoId:
 *           type: integer
 *         activo:
 *           type: integer
 *        example:
 *         id: 5
 *         activo: 1
 *         clubId: 135
 *         rolId: 3
 *         usuarioId: 75
 *         estadoId: 1
 *     Dashboard:
 *        type: object
 *        properties:
 *         notificaciones:
 *           type: array
 *         disciplinaxclub:
 *           type: array
 *         turnos:
 *           type: array
 *         beneficios:
 *           type: array
 *        example:
 *         notificaciones: []
 *         disciplinaxclub: []
 *         turnos: []
 *         beneficios: []
 *     FiltroPosicion:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *        example:
 *         id: 1
 *         nombre: delantero
 *         disciplinaxclubxposId: 1
 *         disxclubxdivId: 5
 *      
 *         
 *           
 *       
 *         
 *         
 *
 */





/**
 * @swagger
 * /api/dashboard/{club}/{usuario}:
 *   get:
 *     summary: GET dashboard trae informacion del dashboard en mobile para id del club y id del usuario
 *     tags: [Dashboard]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id del club
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: usuario
 *         description: id del usuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: posts by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/dashboard/:club/:user',dashboardControllers.getAll)

/**
 * @swagger
 * /api/clubs:
 *   get:
 *     summary: Returns all clubs
 *     tags: [Clubs]
 *     responses:
 *       200:
 *         description: trae todos los clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clubs'

 */

    router.get('/clubs',clubControllers.clubTodos)
/**
 * @swagger
 * /api/clubs/{id}:
 *   get:
 *     summary: gets clubs by id
 *     tags: [Clubs]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of post
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: posts by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clubs'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/clubs/:id',clubControllers.clubById)
    router.post('/clubs',imageControllers.subirArchivos,clubControllers.crearClub)
    router.delete('/clubs/:id',clubControllers.clubEliminar)
    router.put('/clubs/:id',imageControllers.subirArchivos, clubControllers.clubEditar)
   router.get('/lista-clubs/activos',clubControllers.listClubWithRespAndPais);


    //estado
/**
 * @swagger
 * /api/estado/{club}/{usuario}/{estado}:
 *   post:
 *     summary: Returns all estado
 *     tags: [Estado]
 *     parameters:
 *      - in: path
 *        name: club
 *        type: number
 *        description: agregar id de un club existente.
 *      - in: path
 *        name: usuario
 *        type: number
 *        description: agregar el id de un usario existente 
 *      - in: path
 *        name: estado
 *        type: number
 *        description: agregar el id de un estado existente
 *     responses:
 *       200:
 *         description: get estado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estado'

 */  

   router.post('/estado/:club/:usuario/:estado',clubControllers.estado)


   //estado
/**
 * @swagger
 * /api/estado:
 *   get:
 *     summary: Returns all estado
 *     tags: [Estado]
 *     responses:
 *       200:
 *         description: get estado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estado'

 */

   router.get('/estado',estadoControllers.getAll)

/**
 * @swagger
 * /api/estado/{id}:
 *   get:
 *     summary: get estado by id
 *     tags: [Estado]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of estado
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: estado by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estado'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

   router.get('/estado/:id',estadoControllers.getById)


   //disciplina
   router.post('/disciplina',disciplinaControllers.crearDisciplina)

/**
 * @swagger
 * /api/disciplina:
 *   get:
 *     summary: Returns all disciplina
 *     tags: [Disciplina]
 *     responses:
 *       200:
 *         description: trae todos las disciplina
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Disciplinas'

 */

   router.get('/disciplina',disciplinaControllers.getDisciplina)

/**
 * @swagger
 * /api/disciplina/{id}:
 *   get:
 *     summary: get disciplina by id
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de la disciplina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: disciplina por id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplinas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
   router.get('/disciplina/:id',disciplinaControllers.getDisciplinaById)
   router.put('/disciplina/:id',disciplinaControllers.updateDisciplina)
   router.delete('/disciplina/:id',disciplinaControllers.eliminarDisciplina)

//el id hacer referencia al id de clubxusuario 

/**
 * @swagger
 * /api/disciplina-usuario/{id}:
 *   get:
 *     summary: get de las disciplina que tiene un usuario que pertenece a un club (clubxusuarioId)
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: agregar el id del ClubXUsuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: estado by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelUsuarioXDis'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/disciplina-usuario/:id',usuarioXDisciplina.getDeportesXclub)

/**
 * @swagger
 * /api/disciplina-usuario:
 *   get:
 *     summary: get de todas las disciplinas vinculadas a los usuarios que existen en la base de datos
 *     tags: [Disciplina]
 *     responses:
 *       200:
 *         description: get 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelUsuarioXDis'

 */

    router.get('/disciplina-usuario',usuarioXDisciplina.getAll)

   //relacion  disciplina por club

/**
 * @swagger
 * /api/disciplina-club/{club}:
 *   get:
 *     summary: get disciplinas que pertenecen a un club 
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get disciplina de un club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelDisciplinaxClub'

 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/disciplina-club/:club',reldisciplinaxclubControllers.getDeporteXClub)
/**
 * @swagger
 * /api/disciplina-club/{club}/{disciplina}:
 *   get:
 *     summary: get trae toda la informacion de una disciplina que pertenece a un club
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *       - in : path
 *         name: disciplina
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get disciplina de un club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelDisciplinaxClub'

 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.getDeporteXClubById)
    router.delete('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.deleteDeporteXClub)
    router.post('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.createDeporteXClub)
     
   
   //pais


   /**
 * @swagger
 * /api/pais:
 *   get:
 *     summary: get de todos los paises
 *     tags: [Pais]
 *     responses:
 *       200:
 *         description: get all pais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pais'

 */

    router.get('/pais',paisControllers.paisTodos)

    /**
 * @swagger
 * /api/pais/{id}:
 *   get:
 *     summary: get pais por id
 *     tags: [Pais]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get pais by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: pais by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pais'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
    router.get('/pais/:id',paisControllers.paisById)

    //provinci

        /**
 * @swagger
 * /api/provincias/pais/{id}:
 *   get:
 *     summary: get de todas las provincias que pertenece a un pais
 *     tags: [Provincias]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get provincia por id de pais
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: pais by its id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provincia'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/provincias/pais/:id',provinciaControllers.provinciaPorPaisById)

  /**
 * @swagger
 * /api/provincias:
 *   get:
 *     summary: get de todos las provincias
 *     tags: [Provincias]
 *     responses:
 *       200:
 *         description: get all provincias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provincia'

 */
  
    router.get('/provincias',provinciaControllers.provinciaTodos)


   
    /**
 * @swagger
 * /api/provincias/{id}:
 *   get:
 *     summary: get provincia by id
 *     tags: [Provincias]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get provincia by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: provincia by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provincia'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
    router.get('/provincias/:id',provinciaControllers.provinciaById)
    
    //persona

  /**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: get de todas la persona
 *     tags: [Persona]
 *     responses:
 *       200:
 *         description: get all persona
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'

 */
  

    router.get('/personas',personControllers.personaTodos)

        /**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: get persona by id
 *     tags: [Persona]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get persona by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: persona by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/personas/:id',personControllers.personaById)
    router.post('/persona',imageControllers.subirArchivos, personControllers.crearPersona)

    router.get('/personas/lista-personas/personaWithDireccion/:id', personControllers.personaWhitDireccionById)

    //tipo documnto
  /**
 * @swagger
 * /api/tipo-documento:
 *   get:
 *     summary: get de todos los tipo de documento
 *     tags: [TipoDocumento]
 *     responses:
 *       200:
 *         description: get all tipo de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoDocumento'

 */

    router.get('/tipo-documento',tipoDocumentoControllers.tipoDocumentos)
        /**
 * @swagger
 * /api/tipo-documento/{id}:
 *   get:
 *     summary: get tipo documento by id
 *     tags: [TipoDocumento]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get tipo documento by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: tipo documento by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoDocumento'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/tipo-documento/:id',tipoDocumentoControllers.tipoDocumentoById)

    //direccion
  /**
 * @swagger
 * /api/direccion:
 *   get:
 *     summary: get de todas las direcciones
 *     tags: [Direccion]
 *     responses:
 *       200:
 *         description: get all direcciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Direccion'

 */

    router.get('/direccion',direccionControllers.direccionTodos)


        /**
 * @swagger
 * /api/direccion/{id}:
 *   get:
 *     summary: get direccion by id
 *     tags: [Direccion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get direccion by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: tipo direccion by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Direccion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/direccion/:id',direccionControllers.direccionById)


    //roles
   
  /**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: get de todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: get all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'

 */
    router.get('/roles',rolControllers.rolTodos)

        /**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: get roles by id
 *     tags: [Roles]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get roles by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: tipo rol by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/roles/:id',rolControllers.rolById)

    //usuario



    router.post('/agregar-usuario',imageControllers.subirArchivos,usuariosControllers.crearUsuarioWeb)

    router.put('/usuarios/:email/:firebase',usuariosControllers.agregarUID)

  /**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: get de todos los usuarios
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: get all usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'

 */


    router.get('/usuarios',usuariosControllers.getAllUsuarios)


    /**
 * @swagger
 * /api/agregar-club/{usuario}/{club}:
 *   post:
 *     summary: agregar usuario a un club
 *     tags: [Usuario]
 *     parameters:
 *      - in: path
 *        name: usuario
 *        type: number
 *        description: agregar id de un usuario existente.
 *      - in: path
 *        name: club
 *        type: number
 *        description: agregar el id de un club existente 
 *     responses:
 *       200:
 *        description: OK

 */  

    router.post('/agregar-club/:usuario/:club',usuariosControllers.agregarClub)


        /**
 * @swagger
 * /api/usuario/clubs/{usuario}:
 *   get:
 *     summary: get de los clubs a los que esta vinculado 1 usuario (usuarioId)
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: usuario
 *         description: get clubxusuario by usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get clubxusuario by usuarioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClubXUsuarios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


    router.get('/usuario/clubs/:usuario',usuariosControllers.usuarioClubs)
        /**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: get usuario by id
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get usuario by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: usuario by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
   
    
  router.get('/usuario/:id', usuariosControllers.usuarioById)


        /**
 * @swagger
 * /api/lista-usuarios/{club}:
 *   get:
 *     summary: get de usuarios que pertenece a un club (clubId)
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get  by clubId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get clubxusuario by usuarioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClubXUsuarios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/lista-usuarios/:club', usuariosControllers.usuarioListado)



    router.get('/clubxusuario', usuariosControllers.clubxUsuarioAll)
    router.get('/clubxusuario/:id', usuariosControllers.clubxUsuarioById)



        /**
 * @swagger
 * /api/usuario-club/{club}/{usuario}:
 *   get:
 *     summary: get informacion de un usuario que pertenece a un club
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get  by clubId
 *       - in : path
 *         name: usuario
 *         description: get  by usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get clubxusuario by usuarioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClubXUsuarios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/usuario-club/:club/:usuario',usuariosControllers.usuarioXClub)

           /**
 * @swagger
 * /api/usuario/{club}/{usuario}:
 *   delete:
 *     summary: get informacion de un usuario que pertenece a un club
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get  by clubId
 *       - in : path
 *         name: usuario
 *         description: get  by usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: get clubxusuario by usuarioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClubXUsuarios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */ 
    router.delete('/usuario/:club/:usuario',usuariosControllers.usuarioEliminar)
    router.put('/usuario/:club/:usuario',imageControllers.subirArchivos,personControllers.ModificarPersona)

   
    //auth
    router.post('/validate',authValidateControllers.validate)
    router.post('/signup',authSignupControllers.signup)
    router.post('/signin',authSignupControllers.signin)
    router.post('/registrar-firebase',authSignupControllers.registrarEnFirebase)
    router.post('/reset-password',authSignupControllers.resetPassword)
    router.post('/nueva-clave',authSignupControllers.requireSignin,authSignupControllers.cambiarClave)
   


    //posicion

        /**
 * @swagger
 * /api/posiciones/{disciplina}:
 *   get:
 *     summary: get de las posiciones relacionada a una disciplina (disciplinaId)
 *     tags: [Posicion]
 *     parameters:
 *       - in : path
 *         name: disciplina
 *         description: get posiciones by disciplinaId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get posiciones by disciplinaId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posicion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    router.get('/posiciones/:disciplina',posicionxdisciplinaControllers.getDisciplinaxpos)
    router.post('/posiciones/:disciplina',posicionxdisciplinaControllers.agregarPosicionEnDisciplina)
   

    //posicion



    router.get('/posiciones/:club/:disciplina',posicionControllers.getPosicion)
    router.post('/posiciones/:club/:disciplina',posicionControllers.crearPosicion)
   
   
    router.put('/posiciones/:id',posicionControllers.modificarPosicion)
   
   
  
    router.get('/posicion/:id',posicionControllers.getPosicionById)
    router.delete('/posiciones/:id',posicionControllers.eliminarPosicion)


            /**
 * @swagger
 * /api/disciplina/admin/{club}/{disciplina}:
 *   get:
 *     summary: get de las divisiones con las posiciones creadas
 *     tags: [Posicion]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get posiciones by clubId
 *       - in : path
 *         name: disciplina
 *         description: get posiciones by disciplinaId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get posiciones by disciplinaId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posicion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


    //division por admin para que vea toda la infomarcion de la disciplina en este caso traera todo sus divisiones
    //y las posiciones que esten relacionada al club 
    router.get('/disciplina/admin/:club/:disciplina',disciplinaAdminControllers.getAll)
   

    //division


                /**
 * @swagger
 * /api/div/{club}/{disciplina}:
 *   get:
 *     summary: get todas la divisiones de una disciplina
 *     tags: [Posicion]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get posiciones by clubId
 *       - in : path
 *         name: disciplina
 *         description: get posiciones by disciplinaId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get posiciones by disciplinaId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posicion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


   
    router.get('/div/:club/:disciplina',divisionControllers.getAll)

                    /**
 * @swagger
 * /api/div/{id}:
 *   get:
 *     summary: get id de una division trae la division y sus posiciones
 *     tags: [Posicion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de una division
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get posiciones by disciplinaId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posicion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



    router.get('/div/:id',divisionControllers.getId)
    router.put('/div/:id',divisionControllers.editar)
    router.delete('/div/:id',divisionControllers.eliminar)     
    router.post('/div/:club/:disciplina',divisionControllers.crear)


    //usuario informacion final
    router.get('/usuario-final',usuarioInformacionFinal.getAll)
    //filterPosicion

    

    router.get('/filtro-posicion/:disxclubxdiv',usuarioInformacionFinal.filterPosicion)
    router.get('/filtro-usuario/:disciplinaxclubxposId/:disxclubxdivId',usuarioInformacionFinal.filterUsuario)

    router.get('/filtro-posicion/nuevo/:club',usuarioInformacionFinal.filterClubPosicion)
    //imagen

    router.post('/image',imageControllers.subirArchivos)
    router.get('/image/:img',imageControllers.getImage)


   




/**
 * @swagger
 * /api/beneficios:
 *   post:
 *     summary: Crear un nuevo beneficio
 *     tags: [Beneficios]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *              imagen:
 *                type: string
 *                format: binary
 *              data:
 *                type: object
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Beneficios'
 *       500:
 *         description: Some server error
 */



    router.post('/beneficios',imageControllers.subirArchivos,beneficiosControllers.crear)
    router.put('/beneficios/:id',imageControllers.subirArchivos,beneficiosControllers.editar)
    router.delete('/beneficios/:id',beneficiosControllers.eliminar)
    router.get('/beneficios',beneficiosControllers.getAll)
    router.get('/beneficios/:id',beneficiosControllers.getById)

    //rubros
    router.get('/rubro',rubroControllers.getAll)
    router.get('/rubro/:id',rubroControllers.getById)


    //beneficio x club
    router.post('/beneficios/:club/:usuario/:beneficio',beneficiosControllers.crearBeneficioXClub)
    router.get('/beneficios/club/:club',beneficiosControllers.getBeneficioXClubByClub)
    router.get('/beneficios/club/usuario/:club/:usuario',beneficiosControllers.getBeneficioXClubByClubByUsario)
    router.delete('/beneficios/club/usuario/beneficio/:club/:usuario/:beneficio',beneficiosControllers.eliminarBeneficioXUsuario)
    router.get('/beneficios/club/rubro/:club/:rubro',beneficiosControllers.getBeneficioXClubXRubro)
    

    //getBeneficioXClubXRubro


    //notificacion

    router.post('/notificacion',notificacionControllers.crear)

    router.post('/notificacion/superadmin',notificacionControllers.crearSuperadmin)
    router.get('/notificacion',notificacionControllers.getAll)
   
    router.get('/notificacion/:id',notificacionControllers.getById)
    router.delete('/notificacion/:id',notificacionControllers.eliminar)
    router.put('/notificacion/:id',notificacionControllers.modificar)

    //notificacion x club
    router.post('/notificacion/:notificacion/:club',notxclubControllers.crear)
    router.get('/notificacion/club/:club',notxclubControllers.getByClub)
    router.get('/notificacion-club/:id',notxclubControllers.getById)
    router.delete('/notificacion-club/:id',notxclubControllers.eliminar)


    //notificacio x club x usuario
    router.post('/notificacion-usuario/:notxclub/:clubxusuario',notxclubxusuario.crear)
    //usar
    router.get('/notificacion-clubxusuario/:notificacion',notxclubxusuario.getAllByClubByUser)
    router.get('/notificacion-usuario/:id',notxclubxusuario.getById)
    router.post('/notificacion-post',notificacionControllers.sendNotificacion)
    router.get('/notificacion-get',notificacionControllers.getTokenFirebase)

    //tematica

    router.get('/tematicas',tematicaControllers.getAll)

    router.get('/tematicas/:notificacion',tematicaControllers.getByNotificacion)
   

    //encuesta
    router.post('/encuesta',encuestaControllers.crear)
    router.get('/encuesta',encuestaControllers.getAll)
    router.get('/encuesta/:id',encuestaControllers.getById)
    router.put('/encuesta/:id',encuestaControllers.modificar)
    router.delete('/encuesta/:id',encuestaControllers.eliminar)
    router.post('/encuesta-post/:userId',notificacionControllers.sendNotificacion)
    
    //pregunta
    router.get('/preguntas',preguntaControllers.getPreguntas)

    router.get('/pregunta/encuesta/:encuesta',preguntaControllers.getByEncuesta)
    router.post('/pregunta/:encuesta',preguntaControllers.crear)
    router.get('/pregunta/:encuesta',preguntaControllers.getAll)
    router.get('/pregunta/id/:id',preguntaControllers.getById)
    router.put('/pregunta/:id',preguntaControllers.modificar)
    router.delete('/pregunta/:id',preguntaControllers.eliminar)

//respuesta
router.post('/respuesta/pregunta/:pregunta',respuestaControllers.crear)
router.get('/respuesta/pregunta/:pregunta',respuestaControllers.getAll) 
router.get('/respuesta/:id',respuestaControllers.getById)
router.put('/respuesta/:id',respuestaControllers.modificar)
router.delete('/respuesta/:id',respuestaControllers.eliminar)  

//espacio
router.post('/espacio',espacioControllers.crearEspacio)
router.get('/espacio',espacioControllers.getEspacio)
router.get('/espacio/:id',espacioControllers.getEspacioById)
router.put('/espacio/:id',espacioControllers.updateEspacio)
router.delete('/espacio/:id',espacioControllers.eliminarEspacio)

//estado espacio
router.get('/estado-espacio',estadoEspacioControllers.getAll)
router.get('/estado-espacio/:id',estadoEspacioControllers.getById)

//excluir
router.get('/excluidos',excluidoControllers.getAll)
router.get('/excluidos/:id',excluidoControllers.getById)
router.post('/excluidos/:id',excluidoControllers.crear)

router.post('/fcm', excluidoControllers.test)


//estado reserva
router.get('/estado-reserva',estadoReservaControllers.getAll)
router.get('/estado-reserva/:id',estadoReservaControllers.getById)

//reserva
router.get('/reserva',reservaControllers.getAll)
router.get('/reserva/:id',reservaControllers.getbyId)
router.get('/reserva/usuario/:usuario/:club',reservaControllers.getbyUserId)
router.put('/reserva/:id/:estado',reservaControllers.modificiarEstado)
router.post('/reserva/:usuario/:turno',reservaControllers.crear)
router.delete('/reserva/:id',reservaControllers.eliminar)


//ingreso
router.get('/ingreso',ingresoControllers.getAll)
router.get('/ingreso/:id',ingresoControllers.getById)
router.post('/ingreso/:reserva',ingresoControllers.crear)
router.get('/ingreso/usuario/:userId',ingresoControllers.getByUser)


//ESTADO TURNO
router.get('/estado-turno',estadoTurnoControllers.getAll)
router.get('/estado-turno/:id',estadoTurnoControllers.getById)


//turno
router.get('/turno',turnoControllers.getAll)

router.get('/turno-inactivo',turnoControllers.getAllInactivo)
router.get('/turno/:id',turnoControllers.getById)
router.post('/turno/:espacio/:estado',turnoControllers.crear)
router.delete('/turno/:id',turnoControllers.eliminar)



//estado de documento
router.get('/estado-documento',estadodocumentoControllers.getAll)
router.get('/estado-documento/:id',estadodocumentoControllers.getById)


//documentacion
router.post('/archivo',archivoControllers.subirArchivos)
router.get('/archivo/:id',archivoControllers.getArchivo)
    
router.post('/documento/:club/:usuario',archivoControllers.subirArchivos,documentoControllers.crear)
router.get('/documento/club/:club',documentoControllers.getAllByClub)
router.put('/documento/club/usuario/:club/:usuario',archivoControllers.subirArchivos,documentoControllers.ModificarImagen)
router.get('/documento/club/usuario/:club/:usuario',documentoControllers.getAllByClubByUser)
router.delete('/documento/club/usuario/:club/:usuario',documentoControllers.eliminar)
//cambio de estado de documentacion
router.put('/documento/club/usuario/:club/:usuario/:estado',documentoControllers.cambiarEstado)


///division
router.get('/division/:club/:disciplina',divControllers.getByClubByDis)





    return router
}