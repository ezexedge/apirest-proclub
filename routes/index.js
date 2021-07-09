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
const categoriaControllers = require('../controllers/reldisciplinaxclubxcat')
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

module.exports = function(){

    //club
    router.get('/clubs',clubControllers.clubTodos)
    router.get('/clubs/:id',clubControllers.clubById)
    router.post('/clubs',imageControllers.subirArchivos,clubControllers.crearClub)
    router.delete('/clubs/:id',clubControllers.clubEliminar)
    router.put('/clubs/:id',imageControllers.subirArchivos, clubControllers.clubEditar)
   router.get('/lista-clubs/activos',clubControllers.listClubWithRespAndPais);

   router.post('/estado/:club/:usuario/:estado',clubControllers.estado)


   //estado
   router.get('/estado',estadoControllers.getAll)
router.get('/estado/:id',estadoControllers.getById)


   //disciplina
   router.post('/disciplina',disciplinaControllers.crearDisciplina)
   router.get('/disciplina',disciplinaControllers.getDisciplina)
   router.get('/disciplina/:id',disciplinaControllers.getDisciplinaById)
   router.put('/disciplina/:id',disciplinaControllers.updateDisciplina)
   router.delete('/disciplina/:id',disciplinaControllers.eliminarDisciplina)

//el id hacer referencia al id de clubxusuario 
    router.get('/disciplina-usuario/:id',usuarioXDisciplina.getDeportesXclub)
    router.get('/disciplina-usuario',usuarioXDisciplina.getAll)

   //relacion  disciplina por club
    router.get('/disciplina-club/:club',reldisciplinaxclubControllers.getDeporteXClub)
    router.get('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.getDeporteXClubById)
    router.delete('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.deleteDeporteXClub)
    router.post('/disciplina-club/:club/:disciplina',reldisciplinaxclubControllers.createDeporteXClub)
     
   
   //pais
    router.get('/pais',paisControllers.paisTodos)
    router.get('/pais/:id',paisControllers.paisById)

    //provincia
    router.get('/provincias/pais/:id',provinciaControllers.provinciaPorPaisById)
    router.get('/provincias',provinciaControllers.provinciaTodos)
    router.get('/provincias',provinciaControllers.provinciaTodos)
    router.get('/provincias/:id',provinciaControllers.provinciaById)
    
    //persona

    router.get('/personas',personControllers.personaTodos)
    router.get('/personas/:id',personControllers.personaById)
    router.post('/persona',imageControllers.subirArchivos, personControllers.crearPersona)

    router.get('/personas/lista-personas/personaWithDireccion/:id', personControllers.personaWhitDireccionById)

    //tipo documnto
    router.get('/tipo-documento',tipoDocumentoControllers.tipoDocumentos)
    router.get('/tipo-documento/:id',tipoDocumentoControllers.tipoDocumentoById)

    //direccion
    router.get('/direccion',direccionControllers.direccionTodos)
    router.get('/direccion/:id',direccionControllers.direccionById)


    //roles
    router.get('/roles',rolControllers.rolTodos)
    router.get('/roles/:id',rolControllers.rolById)

    //usuario
    router.get('/usuario/clubs/:usuario',usuariosControllers.usuarioClubs)
    router.get('/usuario/:id', usuariosControllers.usuarioById)
    router.get('/lista-usuarios/:club', usuariosControllers.usuarioListado)
    router.get('/usuario/:club/:usuario',usuariosControllers.usuarioById)
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
    router.get('/posiciones/:club/:disciplina',posicionControllers.getPosicion)
    router.post('/posiciones/:club/:disciplina',posicionControllers.crearPosicion)
    router.put('/posiciones/:id',posicionControllers.modificarPosicion)
    router.get('/posiciones/:id',posicionControllers.getPosicionById)
    router.delete('/posiciones/:id',posicionControllers.eliminarPosicion)

    //categoria


    router.get('/categoria/:club/:disciplina',categoriaControllers.getAll)
    router.get('/categoria/:id',categoriaControllers.getId)
    router.put('/categoria/:id',categoriaControllers.editar)
    router.delete('/categoria/:id',categoriaControllers.eliminar)     
    router.post('/categoria/:club/:disciplina',categoriaControllers.crear)

    //imagen

    router.post('/image',imageControllers.subirArchivos)
    router.get('/image/:img',imageControllers.getImage)

    
    //beneficios

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
    
    //notificacion

    router.post('/notificacion',notificacionControllers.crear)
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
    router.get('/notificacion-clubxusuario/:clubxusuario',notxclubxusuario.getAllByClubByUser)
    router.get('/notificacion-usuario/:id',notxclubxusuario.getById)
    router.post('/notificacion-post',notificacionControllers.sendNotificacion)
    router.get('/notificacion-get',notificacionControllers.getTokenFirebase)

   

    //encuesta
    router.post('/encuesta',encuestaControllers.crear)
    router.get('/encuesta',encuestaControllers.getAll)
    router.get('/encuesta/:id',encuestaControllers.getById)
    router.put('/encuesta/:id',encuestaControllers.modificar)
    router.delete('/encuesta/:id',encuestaControllers.eliminar)
    router.post('/encuesta-post',notificacionControllers.sendNotificacion)
    
    //pregunta
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
router.get('/reserva/usuario/:usuario',reservaControllers.getbyUserId)
router.put('/reserva/:id/:estado',reservaControllers.modificiarEstado)
router.post('/reserva/:usuario/:turno',reservaControllers.crear)
router.delete('/reserva/:id',reservaControllers.eliminar)


//ingreso
router.get('/ingreso',ingresoControllers.getAll)
router.get('/ingreso/:id',ingresoControllers.getById)
router.post('/ingreso/:reserva',ingresoControllers.crear)



//ESTADO TURNO
router.get('/estado-turno',estadoTurnoControllers.getAll)
router.get('/estado-turno/:id',estadoTurnoControllers.getById)


//turno
router.get('/turno',turnoControllers.getAll)
router.get('/turno/:id',turnoControllers.getById)
router.post('/turno/:estado',turnoControllers.crear)
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




    return router
}