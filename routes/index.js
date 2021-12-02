const express = require('express');
const router = express.Router();
const FCM = require('fcm-node')


const configuaracionControllers = require('../controllers/configuracion')
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
const disciplinaAdminControllers = require('../controllers/disciplinaxclubxpos');
const RelPosXUsuarioXDivXDep = require('../models/RelPosXUsarioXDiviXDep');
const rubroxbeneficioControllers = require('../controllers/rubroxbeneficio')
const infoutilControllers = require('../controllers/InfoUtil')
const categoriaControllers = require('../controllers/categoria')
const categoriaDocumentoControllers = require('../controllers/categoriaDocumentacion')
module.exports = function(){






    router.get('/dashboard/:club/:user',dashboardControllers.getAll)


    router.get('/clubs',clubControllers.clubTodos)


    router.get('/clubs/:id',authSignupControllers.requireSignin,clubControllers.clubById)



    router.post('/clubs',authSignupControllers.requireSignin,imageControllers.subirArchivos,clubControllers.crearClub)


    router.delete('/clubs/:id',authSignupControllers.requireSignin,clubControllers.clubEliminar)




   router.put('/clubs/:id',authSignupControllers.requireSignin,imageControllers.subirArchivos, clubControllers.clubEditar)
   router.get('/lista-clubs/activos',authSignupControllers.requireSignin,clubControllers.listClubWithRespAndPais);


    //estado

   router.post('/estado/:club/:usuario/:estado',authSignupControllers.requireSignin,clubControllers.estado)


   //estado


   router.get('/estado',authSignupControllers.requireSignin,estadoControllers.getAll)

   router.get('/estado/:id',authSignupControllers.requireSignin,estadoControllers.getById)


   //disciplina

   router.post('/disciplina',authSignupControllers.requireSignin,disciplinaControllers.crearDisciplina)

   router.get('/disciplina',authSignupControllers.requireSignin,disciplinaControllers.getDisciplina)


   router.get('/disciplina/:id',authSignupControllers.requireSignin,disciplinaControllers.getDisciplinaById)




   router.put('/disciplina/:id',authSignupControllers.requireSignin,disciplinaControllers.updateDisciplina)


   router.delete('/disciplina/:id',authSignupControllers.requireSignin,disciplinaControllers.eliminarDisciplina)

//el id hacer referencia al id de clubxusuario 



    router.get('/disciplina-usuario/:club/:usuario',authSignupControllers.requireSignin,usuarioXDisciplina.getDeportesXclub)



  

    router.get('/disciplina-club/:club',reldisciplinaxclubControllers.getDeporteXClub)


    router.get('/disciplina-club/:club/:disciplina',authSignupControllers.requireSignin,reldisciplinaxclubControllers.getDeporteXClubById)





    router.delete('/disciplina-club/:club/:disciplina',authSignupControllers.requireSignin,reldisciplinaxclubControllers.deleteDeporteXClub)
    
    

    
    router.post('/disciplina-club/:club/:disciplina',authSignupControllers.requireSignin,reldisciplinaxclubControllers.createDeporteXClub)
     
   
   //pais




    router.get('/pais',authSignupControllers.requireSignin,paisControllers.paisTodos)


    router.get('/pais/:id',authSignupControllers.requireSignin,paisControllers.paisById)

    //provinci



    router.get('/provincias/pais/:id',authSignupControllers.requireSignin,provinciaControllers.provinciaPorPaisById)


  
    router.get('/provincias',authSignupControllers.requireSignin,provinciaControllers.provinciaTodos)



    router.get('/provincias/:id',authSignupControllers.requireSignin,provinciaControllers.provinciaById)
    
    //persona


    router.get('/personas',authSignupControllers.requireSignin,personControllers.personaTodos)


    router.get('/personas/:id',authSignupControllers.requireSignin,personControllers.personaById)
    
    


             router.put('/personas/update/:usuario',authSignupControllers.requireSignin,imageControllers.subirArchivos,personControllers.ModificarPersona)
    


             router.put('/perfil/persona/:persona',authSignupControllers.requireSignin,imageControllers.subirArchivos,personControllers.ModificarPerfilPersona)
    
//ModificarPerfilPersona

router.put('/espacio/update/image/:espacio',imageControllers.subirArchivos,espacioControllers.modificarImagenes)
    
          
router.put('/personas/update/image/:usuario',authSignupControllers.requireSignin,imageControllers.subirArchivos,personControllers.modificarImagenes)
    
    



    router.post('/persona',authSignupControllers.requireSignin,imageControllers.subirArchivos, personControllers.crearPersona)




    router.get('/personas/lista-personas/personaWithDireccion/:id',authSignupControllers.requireSignin, personControllers.personaWhitDireccionById)

    //tipo documnto


    router.get('/tipo-documento',authSignupControllers.requireSignin,tipoDocumentoControllers.tipoDocumentos)

    router.get('/tipo-documento/:id',authSignupControllers.requireSignin,tipoDocumentoControllers.tipoDocumentoById)

    //direccion


    router.get('/direccion',authSignupControllers.requireSignin,direccionControllers.direccionTodos)




    router.get('/direccion/:id',authSignupControllers.requireSignin,direccionControllers.direccionById)


    //roles
   

    router.get('/roles',authSignupControllers.requireSignin,rolControllers.rolTodos)



    router.get('/roles/:id',authSignupControllers.requireSignin,rolControllers.rolById)

    //usuario



    router.post('/agregar-usuario',authSignupControllers.requireSignin,imageControllers.subirArchivos,usuariosControllers.crearUsuarioWeb)

    router.put('/usuarios/:email/:firebase',authSignupControllers.requireSignin,usuariosControllers.agregarUID)



    router.get('/usuarios',authSignupControllers.requireSignin,usuariosControllers.getAllUsuarios)



    router.post('/agregar-club/:usuario/:club',authSignupControllers.requireSignin,usuariosControllers.agregarClub)



 

    router.put('/usuario-update/rol/:clubxusuario',authSignupControllers.requireSignin,usuariosControllers.cambiarRol)



    router.get('/usuario/clubs/:usuario',authSignupControllers.requireSignin,usuariosControllers.usuarioClubs)

   
        
  router.get('/usuario/:id',authSignupControllers.requireSignin ,usuariosControllers.usuarioById)





   

  router.get('/usuario/search/:email',authSignupControllers.requireSignin ,usuariosControllers.usuarioByEmail)



//volver atras
    router.get('/lista-usuarios/:club', usuariosControllers.usuarioListado)




    router.get('/lista-usuarios/:club/:rol',authSignupControllers.requireSignin ,usuariosControllers.usuarioListadoRol)


    router.get('/clubxusuario',authSignupControllers.requireSignin, usuariosControllers.clubxUsuarioAll)
    router.get('/clubxusuario/:id', authSignupControllers.requireSignin,usuariosControllers.clubxUsuarioById)




    router.get('/usuario-club/:club/:usuario',authSignupControllers.requireSignin,usuariosControllers.usuarioXClub)


    router.delete('/usuario/:club/:usuario',authSignupControllers.requireSignin,usuariosControllers.usuarioEliminar)
    router.put('/usuario/:club/:usuario',authSignupControllers.requireSignin,imageControllers.subirArchivos,personControllers.ModificarPersona)

    //usuartio desde superadmin
    router.delete('/usuario-superadmin/:usuario',authSignupControllers.requireSignin,usuariosControllers.usuarioEliminarSuperAdmin)
  
    router.post('/usuario-superadmin/activo/:usuario',authSignupControllers.requireSignin,usuariosControllers.usuarioActivoSuperAdmin)
    
    
    router.get('/usuario-roles/:usuario',authSignupControllers.requireSignin,usuariosControllers.getRolesByUser)
  
   
    //auth
    router.post('/validate',authValidateControllers.validate)
    
    router.get('/validar-usuario/:email',authSignupControllers.leerNombre)





    router.post('/signup',authSignupControllers.signup)

    router.post('/signout',authSignupControllers.requireSignin,authSignupControllers.signout)


router.get('/disciplina/listado-usuarios/:disciplina',usuarioInformacionFinal.listaDeUsuariosXDeporte)



    router.post('/signin',authSignupControllers.signin)
    router.post('/registrar-firebase',authSignupControllers.registrarEnFirebase)

 
    router.post('/reset-password',authSignupControllers.resetPassword)
    router.post('/nueva-clave',authSignupControllers.requireSignin,authSignupControllers.cambiarClave)
   


    //posicion



    router.get('/posiciones/:disciplina',authSignupControllers.requireSignin,posicionxdisciplinaControllers.getDisciplinaxpos)
    router.post('/posiciones/:disciplina',authSignupControllers.requireSignin,posicionxdisciplinaControllers.agregarPosicionEnDisciplina)
   

    //posicion



    router.get('/posiciones-admin/:club/:disciplina',authSignupControllers.requireSignin,posicionControllers.getAllPosicionesByDivision)
   

    router.get('/posiciones/:club/:disciplina',authSignupControllers.requireSignin,posicionControllers.getPosicion)
    router.post('/posiciones/:club/:disciplina',authSignupControllers.requireSignin,posicionControllers.crearPosicion)
   
    router.post('/posicion-admin/:club/:disciplina/:division',posicionControllers.crearPosicionAdmin)
   
   
    router.put('/posiciones/:id',authSignupControllers.requireSignin,posicionControllers.modificarPosicion)
   
   
  
    router.get('/posicion/:id',authSignupControllers.requireSignin,posicionControllers.getPosicionById)
    router.delete('/posiciones/:id',authSignupControllers.requireSignin,posicionControllers.eliminarPosicion)




    //division por admin para que vea toda la infomarcion de la disciplina en este caso traera todo sus divisiones
    //y las posiciones que esten relacionada al club 
    router.get('/disciplina/admin/:club/:disciplina',authSignupControllers.requireSignin,disciplinaAdminControllers.getAll)
   

    //division



   
    router.get('/div/:club/:disciplina',authSignupControllers.requireSignin,divisionControllers.getAll)





    router.get('/div/:id',authSignupControllers.requireSignin,divisionControllers.getId)
    router.put('/div/:id',authSignupControllers.requireSignin,divisionControllers.editar)
    router.delete('/div/:id',authSignupControllers.requireSignin,divisionControllers.eliminar) 
    
    

    router.post('/div/:club/:disciplina',authSignupControllers.requireSignin,divisionControllers.crear)



    //crearDivisionXClubXDisciplina
    router.post('/crear-division/:club/:disciplina',authSignupControllers.requireSignin,divisionControllers.crearDivisionXClubXDisciplina)




    //usuario informacion final
    router.get('/usuario-final',authSignupControllers.requireSignin,usuarioInformacionFinal.getAll)
    //filterPosicion

    

    router.get('/filtro-posicion/:disxclubxdiv',authSignupControllers.requireSignin,usuarioInformacionFinal.filterPosicion)
    router.get('/filtro-usuario/:disciplinaxclubxposId/:disxclubxdivId',authSignupControllers.requireSignin,usuarioInformacionFinal.filterUsuario)

    router.get('/filtro-posicion/nuevo/:club',authSignupControllers.requireSignin,usuarioInformacionFinal.filterClubPosicion)
    //imagen

    router.post('/image',imageControllers.subirArchivos)



    router.get('/image/:img',imageControllers.getImage)


   








    router.post('/superadmin/beneficios',authSignupControllers.requireSignin,imageControllers.subirArchivos,beneficiosControllers.crear)

    router.post('/admin/beneficios',authSignupControllers.requireSignin,imageControllers.subirArchivos,beneficiosControllers.crearAdmin)




    router.post('/superadmin/info',authSignupControllers.requireSignin,imageControllers.subirArchivos,infoutilControllers.crear)
    

    router.post('/admin/info/:club',authSignupControllers.requireSignin,imageControllers.subirArchivos,infoutilControllers.crearAdmin)
    

    router.get('/page/info/:page',authSignupControllers.requireSignin,infoutilControllers.getAll)
    //sss
    router.get('/page/info/:club/:page',authSignupControllers.requireSignin,infoutilControllers.getByClub)
    
    
    router.get('/info/:id',authSignupControllers.requireSignin,infoutilControllers.getById)
    router.delete('/info/:id',authSignupControllers.requireSignin,infoutilControllers.eliminar)
//sss
router.put('/info/:id',authSignupControllers.requireSignin,imageControllers.subirArchivos,infoutilControllers.editar)
   

    router.put('/beneficios/:id',authSignupControllers.requireSignin,imageControllers.subirArchivos,beneficiosControllers.editar)
    router.delete('/beneficios/:id',authSignupControllers.requireSignin,beneficiosControllers.eliminar)

    router.get('/page/beneficios/:page',authSignupControllers.requireSignin,beneficiosControllers.getAll)


    //getRubroByBeneficio
    router.get('/beneficios/rubro/:rubro',authSignupControllers.requireSignin,rubroxbeneficioControllers.getBeneficioByRubro)


    router.get('/beneficios/:id',authSignupControllers.requireSignin,beneficiosControllers.getById)

    //rubros
    router.delete('/rubro/:id',authSignupControllers.requireSignin,rubroControllers.eliminar)


    router.post('/rubro',authSignupControllers.requireSignin,rubroControllers.crear)


    router.get('/rubro',authSignupControllers.requireSignin,rubroControllers.getAll)




    router.get('/rubro/:id',authSignupControllers.requireSignin,rubroControllers.getById)



    //categoria
    router.delete('/categoria/:id',authSignupControllers.requireSignin,categoriaControllers.eliminar)


    router.post('/categoria',authSignupControllers.requireSignin,categoriaControllers.crear)


    router.get('/categoria',authSignupControllers.requireSignin,categoriaControllers.getAll)




    router.get('/categoria/:id',authSignupControllers.requireSignin,categoriaControllers.getById)



    ///categoria x documento
    router.delete('/categoria-documento/:id',authSignupControllers.requireSignin,categoriaDocumentoControllers.eliminar)


    router.post('/categoria-documento',authSignupControllers.requireSignin,categoriaDocumentoControllers.crear)


    router.get('/categoria-documento',authSignupControllers.requireSignin,categoriaDocumentoControllers.getAll)




    router.get('/categoria-documento/:id',authSignupControllers.requireSignin,categoriaDocumentoControllers.getById)



    //beneficio x club






    router.post('/beneficios/:club/:usuario/:beneficio',authSignupControllers.requireSignin,beneficiosControllers.crearBeneficioXClub)




//cambios

    router.get('/beneficios/club/:club/:page',authSignupControllers.requireSignin,beneficiosControllers.getBeneficioXClubByClub)


    router.get('/beneficios/club/usuario/:club/:usuario',authSignupControllers.requireSignin,beneficiosControllers.getBeneficioXClubByClubByUsario)
    router.delete('/beneficios/club/usuario/beneficio/:club/:usuario/:beneficio',authSignupControllers.requireSignin,beneficiosControllers.eliminarBeneficioXUsuario)
    

    router.get('/beneficios/club/rubro/:club/:rubro',authSignupControllers.requireSignin,beneficiosControllers.getBeneficioXClubXRubro)
    

    //getBeneficioXClubXRubro


    //notificacion


    router.get('/usuario-perfil/:club/:userId',authSignupControllers.requireSignin,usuarioInformacionFinal.getDeportes)
   


    router.get('/notificacion-leida/:notificacion',authSignupControllers.requireSignin,notificacionControllers.getNotificacionLeida)
   


    router.post('/notificacion',authSignupControllers.requireSignin,notificacionControllers.crear)

    router.post('/notificacion/crear',authSignupControllers.requireSignin,notificacionControllers.crearSuperadmin)

    router.get('/notificacion',authSignupControllers.requireSignin,notificacionControllers.getAll)
   

    router.get('/notificacion/:id',authSignupControllers.requireSignin,notificacionControllers.getById)


    router.delete('/notificacion/:id',authSignupControllers.requireSignin,notificacionControllers.eliminar)
    router.put('/notificacion/:id',authSignupControllers.requireSignin,notificacionControllers.modificar)

    //notificacion x club



    router.post('/notificacion/:notificacion/:club',authSignupControllers.requireSignin,notxclubControllers.crear)

  
    router.get('/notificacion/club/:club',authSignupControllers.requireSignin,notxclubControllers.getByClub)



    router.get('/notificacion-club/:id',authSignupControllers.requireSignin,notxclubControllers.getById)

    

    router.delete('/notificacion-club/:id',authSignupControllers.requireSignin,notxclubControllers.eliminar)


    //notificacio x club x usuario

 
    router.post('/notificacion-usuario/:notxclub/:clubxusuario',authSignupControllers.requireSignin,notxclubxusuario.crear)
    //usar

    router.get('/notificacion-clubxusuario/:notificacion',authSignupControllers.requireSignin,notxclubxusuario.getAllByClubByUser)



    router.get('/notificacion-usuario/:id',authSignupControllers.requireSignin,notxclubxusuario.getById)


    ///este es el nuevo enppoint

    
    router.get('/notificacion/usuario/club/:userId/:clubId',authSignupControllers.requireSignin,notxclubxusuario.getNotificacionByUser)
    
    //getNotificacionNoLeidos
    router.get('/notificaciones-no-leidos/:userId/:clubId',notxclubxusuario.getNotificacionNoLeidos)
    
    router.get('/notificaciones-leidas/:userId',notxclubxusuario.getNotificacionesLeidas)
    
    
    router.get('/notificacion/usuario/:club/:user',authSignupControllers.requireSignin,notxclubxusuario.getNotificacionByUserByClub)

    router.get('/notificacion-all/usuario/:user',authSignupControllers.requireSignin,notxclubxusuario.getAllNotificacionUser)

//getAllNotificacionUser
    

    
    router.post('/notificacion-post',authSignupControllers.requireSignin,notificacionControllers.sendNotificacion)
    router.get('/notificacion-get',authSignupControllers.requireSignin,notificacionControllers.getTokenFirebase)

    //tematica


 
    router.get('/tematicas',authSignupControllers.requireSignin,tematicaControllers.getAll)



  
    router.get('/tematicas/:notificacion',authSignupControllers.requireSignin,tematicaControllers.getByNotificacion)
   

    //encuesta




    router.post('/encuesta',authSignupControllers.requireSignin,encuestaControllers.crear)

   
 
    router.get('/encuesta',authSignupControllers.requireSignin,encuestaControllers.getAll)


    router.get('/encuesta/:id',authSignupControllers.requireSignin,encuestaControllers.getById)

    router.get('/encuesta-enviada-por/:userId',authSignupControllers.requireSignin,encuestaControllers.getEnviadoPor)
    router.get('/encuesta/usuario/:userId/:clubId',authSignupControllers.requireSignin,encuestaControllers.getEncuestaPorUsuario)

    //encuesta
    router.get('/encuesta-admin/:encuesta',encuestaControllers.getEncuesta)


    router.put('/encuesta/:id',authSignupControllers.requireSignin,encuestaControllers.modificar)



    router.delete('/encuesta/:id',authSignupControllers.requireSignin,encuestaControllers.eliminar)




    router.post('/encuesta-post',authSignupControllers.requireSignin,notificacionControllers.sendNotificacion)
    router.post('/encuesta-post-superadmin',authSignupControllers.requireSignin,notificacionControllers.sendEncuestaSuperadmin)
    router.post('/encuesta-post-admin/:club',authSignupControllers.requireSignin,notificacionControllers.sendEncuesta)
//lista de encuesta  
    router.get('/club/encuesta/:club',authSignupControllers.requireSignin,encuestaControllers.getByClub)
    
    
    //pregunta

 

    router.get('/preguntas',authSignupControllers.requireSignin,preguntaControllers.getPreguntas)

 





    router.get('/pregunta/encuesta/:encuesta',authSignupControllers.requireSignin,preguntaControllers.getByEncuesta)


 

    router.post('/pregunta/:encuesta',authSignupControllers.requireSignin,preguntaControllers.crear)



    
    router.get('/pregunta/:encuesta',authSignupControllers.requireSignin,preguntaControllers.getAll)


    router.get('/pregunta/id/:id',authSignupControllers.requireSignin,preguntaControllers.getById)

                                               

    router.put('/pregunta/:id',authSignupControllers.requireSignin,preguntaControllers.modificar)

    router.delete('/pregunta/:id',authSignupControllers.requireSignin,preguntaControllers.eliminar)

//respuesta




router.post('/respuesta/pregunta/:pregunta',authSignupControllers.requireSignin,respuestaControllers.crear)



router.get('/respuesta/pregunta/:pregunta',authSignupControllers.requireSignin,respuestaControllers.getAll) 


router.get('/respuesta-encuesta/:encuesta',authSignupControllers.requireSignin,respuestaControllers.getRespuestaDeUnaEncuestaXUsuarios) 



router.get('/respuesta/:id',authSignupControllers.requireSignin,respuestaControllers.getById)


router.post('/respuesta/usuario',authSignupControllers.requireSignin,respuestaControllers.crearRespuestaUsuario)


router.delete('/respuesta/usuario/:respuestaId',authSignupControllers.requireSignin,respuestaControllers.eliminarRespuestaUsuario)


   
router.put('/respuesta/:id',authSignupControllers.requireSignin,respuestaControllers.modificar)




router.delete('/respuesta/:id',authSignupControllers.requireSignin,respuestaControllers.eliminar)  

//espacio



router.post('/espacio',authSignupControllers.requireSignin,imageControllers.subirArchivos,espacioControllers.crearEspacio)





router.get('/espacio',authSignupControllers.requireSignin,espacioControllers.getEspacio)



router.get('/espacio/club/:club',authSignupControllers.requireSignin,espacioControllers.getEspacioByClubId)






router.get('/espacio/:id',authSignupControllers.requireSignin,espacioControllers.getEspacioById)





router.get('/espacio/disciplina/:espacio/:club',authSignupControllers.requireSignin,espacioControllers.getEspacioByDisciplinaXClub)

//ByDisciplinaXClub



      
      router.post('/espacio/disciplina/:espacio/:disciplinaxclubId',authSignupControllers.requireSignin,espacioControllers.relacionarEspacioConDisciplinaXClub)

      router.delete('/eliminar/disciplina-espacio/:id',authSignupControllers.requireSignin,espacioControllers.eliminarEspacioXDisciplina)



router.put('/espacio/:id',authSignupControllers.requireSignin,espacioControllers.updateEspacio)





router.delete('/espacio/:id',authSignupControllers.requireSignin,espacioControllers.eliminarEspacio)

//estado espacio


router.get('/estado-espacio',authSignupControllers.requireSignin,estadoEspacioControllers.getAll)







router.get('/estado-espacio/:id',authSignupControllers.requireSignin,estadoEspacioControllers.getById)

//excluir



router.get('/excluidos',authSignupControllers.requireSignin,excluidoControllers.getAll)
router.get('/excluidos/:id',authSignupControllers.requireSignin,excluidoControllers.getById)
router.post('/excluidos/:id',authSignupControllers.requireSignin,excluidoControllers.crear)

router.post('/fcm', excluidoControllers.test)


//estado reserva



router.get('/estado-reserva',authSignupControllers.requireSignin,estadoReservaControllers.getAll)




router.get('/estado-reserva/:id',authSignupControllers.requireSignin,estadoReservaControllers.getById)

//reserva



router.get('/reserva',authSignupControllers.requireSignin,reservaControllers.getAll)





router.get('/reserva/:id',authSignupControllers.requireSignin,reservaControllers.getbyId)


router.get('/reserva-filtro/:espacio/:fecha',reservaControllers.getFiltroXEspacioXDia)



 
router.get('/reserva/usuario/club/:usuario/:club',authSignupControllers.requireSignin,reservaControllers.getbyUserId)




router.put('/reserva/:id/:estado',authSignupControllers.requireSignin,reservaControllers.modificiarEstado)





router.post('/reserva',authSignupControllers.requireSignin,reservaControllers.crear)




router.delete('/reserva/:id',authSignupControllers.requireSignin,reservaControllers.eliminar)


//ingreso


router.get('/ingreso',authSignupControllers.requireSignin,ingresoControllers.getAll)




router.get('/ingreso/:id',authSignupControllers.requireSignin,ingresoControllers.getById)




router.get('/ingreso/espacio/:espacio',authSignupControllers.requireSignin,ingresoControllers.getByEspacio)


router.get('/ingreso-filtro/:espacio?/:usuario?/:manager?/:desde?/:hasta?',ingresoControllers.getFiltro)



router.post('/ingreso/crear/:espacio/:manager',authSignupControllers.requireSignin,ingresoControllers.crear)


router.post('/usuario-perfil/deporte/:userId/:club/:disciplina/:div/:pos',authSignupControllers.requireSignin,usuarioInformacionFinal.crearDeportesEnUsuarioPerfil)



router.get('/ingreso/usuario/:userId',authSignupControllers.requireSignin,ingresoControllers.getByUser)





router.get('/reserva/usuario/estado/:userId/:estado',authSignupControllers.requireSignin,reservaControllers.getByEstado)


router.get('/reserva/bloqueado/:espacio',authSignupControllers.requireSignin,reservaControllers.getBloqueados)




//ESTADO TURNO



router.get('/estado-turno',authSignupControllers.requireSignin,estadoTurnoControllers.getAll)


router.get('/estado-turno/:id',authSignupControllers.requireSignin,estadoTurnoControllers.getById)


//turno

router.get('/turno',authSignupControllers.requireSignin,turnoControllers.getAll)



router.get('/turno/:espacio',authSignupControllers.requireSignin,turnoControllers.getByEspacioId)


router.get('/turno/club/:club',authSignupControllers.requireSignin,reservaControllers.getByEspacioByClub)




router.get('/turno-inactivo',authSignupControllers.requireSignin,turnoControllers.getAllInactivo)


router.get('/turno/:id',authSignupControllers.requireSignin,turnoControllers.getById)


router.post('/turno/:espacio',authSignupControllers.requireSignin,turnoControllers.crear)



router.delete('/turno/:id',authSignupControllers.requireSignin,turnoControllers.eliminar)



//estado de documento




router.get('/estado-documento',authSignupControllers.requireSignin,estadodocumentoControllers.getAll)


router.get('/estado-documento/:id',authSignupControllers.requireSignin,estadodocumentoControllers.getById)


//documentacion


router.post('/archivo',archivoControllers.subirArchivos)


 
router.get('/archivo/:id',authSignupControllers.requireSignin,archivoControllers.getArchivo)
    


router.post('/documento/:club/:usuario',authSignupControllers.requireSignin,archivoControllers.subirArchivos,documentoControllers.crear)


router.get('/documento/club/:club',authSignupControllers.requireSignin,documentoControllers.getAllByClub)

router.put('/documento/club/usuario/:club/:usuario',authSignupControllers.requireSignin,archivoControllers.subirArchivos,documentoControllers.ModificarImagen)


router.get('/documento/club/usuario/:club/:usuario',authSignupControllers.requireSignin,documentoControllers.getAllByClubByUser)



router.delete('/documento/club/usuario/:club/:usuario',authSignupControllers.requireSignin,documentoControllers.eliminar)
//cambio de estado de documentacion



router.put('/documento/club/usuario/:club/:usuario/:estado',authSignupControllers.requireSignin,documentoControllers.cambiarEstado)


///division

router.get('/division/:club/:disciplina',authSignupControllers.requireSignin,divControllers.getByClubByDis)




//fitro mobile




router.get('/filtro-usuarios/:club',authSignupControllers.requireSignin,usuariosControllers.usuarioListado)




    
router.get('/filtro-usuarios/:club/:disxclub',authSignupControllers.requireSignin,usuarioInformacionFinal.filterUsuarioPorClubPorDeporte)



router.get('/filtro-usuarios/:club/:disxclub/:disxclubxdiv',authSignupControllers.requireSignin,usuarioInformacionFinal.filterUsuarioPorClubPorDeportePorDivision)





router.get('/filtro-usuarios/:club/:disxclub/:disxclubxdiv/:disciplinaxclubxpos',authSignupControllers.requireSignin,usuarioInformacionFinal.filterUsuarioPorClubPorDeportePorDivisionPorPosicion)


//configuracion dia y hora
router.get('/configuracion/:espacio',authSignupControllers.requireSignin,configuaracionControllers.getByEspacioId)


router.delete('/configuracion/:id',authSignupControllers.requireSignin,configuaracionControllers.eliminarConfiguracion)


//guardar token
router.put('/documento/club/usuario/:club/:usuario/:estado',authSignupControllers.requireSignin,documentoControllers.cambiarEstado)

router.post('/actualizar-token-firebase',authSignupControllers.requireSignin,authSignupControllers.guardarToken)

///actualizar-token-firebase



router.get('/notificacion/vistas/:id',authSignupControllers.requireSignin,notificacionControllers.getNotificacionVistas)


router.get('/notificaciones-enviadas-por',authSignupControllers.requireSignin,notxclubxusuario.getNotificacionEnviadaPor)

//getNotificacionVistas

router.get('/espacio/disciplina/:disciplina',authSignupControllers.requireSignin,espacioControllers.getEspacioByDisciplina)


///estadisticas admin o superadmin

router.get('/club-estadisticas/:club',clubControllers.clubEstadistica)


router.put('/agregar-admin/:club/:usuario',authSignupControllers.requireSignin, clubControllers.agregarAdministrador)
    
router.delete('/eliminar-admin/:club/:usuario',authSignupControllers.requireSignin, clubControllers.eliminarAdministrador)
    
router.get('/deporte-estadisticas/:deporte',disciplinaControllers.getEstadistica)

router.delete('/usuario-disciplina/:club/:usuario/:id',authSignupControllers.requireSignin, usuarioInformacionFinal.eliminarDeporteByUsuario)
   

router.put('/update-nombre/:id',authSignupControllers.requireSignin, espacioControllers.updateEspacioNombre)

//superadmin
router.get('/admin/deportes-usuario/:usuario',authSignupControllers.requireSignin, usuarioInformacionFinal.usuarioDeportes)
  
router.get('/espacio-reservas/:espacio',authSignupControllers.requireSignin, reservaControllers.getByEspacioId)
 
router.put('/update-imagen/club/:id',espacioControllers.updateImagen)

    return router
}