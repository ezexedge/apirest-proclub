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
 *     Tematicas:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: viajes
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
 *     PersonaModificar:
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
 *         direccion:
 *           type: object 
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
 *        direccion: 
 *           calle: "calle falsa"
 *           numero: 123
 *           cp: '113'
 *           localidad: 'moreno'
 *           provinciaId: 1
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
 *         responsable:
 *          nombre: "victor"
 *          apellido: "martinez"
 *          telefono: 112223
 *          correo: "victor@gmail.com"
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
 *        fechaInico:
 *          type: string
 *        fechaFin:
 *          type: string
 *        espacioId:
 *          type: integer
 *        usuarioId:
 *          type: integer
 *        disciplinaxclub:
 *          type: integer
 *        desde:
 *          type: string
 *        hasta:
 *          type: string
 *        estadoreservaId:
 *          type: integer
 *        activo:
 *          type: integer
 *       example:
 *        id: 1
 *        fechaInicio: "2021-06-24"
 *        fechaFin: "2021-06-24"
 *        desde: "16:00:00"
 *        hasta: "17:00:00"
 *        activo: 1
 *        espacioId: 1
 *        usuarioId: 35
 *        estadoreservaId: 1
 *        disciplinaxclubId: 305    
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
 *     EstadoTurno:
 *       type: object
 *       properties:
 *        id:
 *          type: integer
 *        nombre:
 *          type: string
 *       example:
 *        id: 1
 *        nombre: aprobado
 *     EstadoReserva:
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
 *     Ingreso:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *         fecha:
 *            type: date
 *         usuarioId:
 *            type: integer
 *         espacioId:
 *            type: integer
 *         managerId:
 *            type: integer
 *         hora:
 *            type: string
 *        example:
 *         id: 1
 *         fecha: 2021-08-06
 *         espacioId: 95
 *         usuarioId: 5
 *         manager: 10
 *         hora: "16:08:02"
 *     Signin:
 *        type: object
 *        properties:
 *         email:
 *           type: string
 *         password:
 *            type: string
 *        example:
 *         email: "ezeedge@gmail.com"
 *         password: "123456"
 *     GuardarToken:
 *        type: object
 *        properties:
 *         firebaseToken:
 *           type: string
 *         userId:
 *            type: string
 *        example:
 *         firebaseToken: ""
 *         userId: ""
 *     EncuestaPost:
 *        type: object
 *        properties:
 *         encuesta:
 *           type: integer
 *         usuarios:
 *            type: array
 *        example:
 *         encuesta: 1
 *         usuarios: []
 *     Configuracion:
 *        type: object
 *        properties:
 *         lunes:
 *           type: integer
 *         martes:
 *            type: integer
 *         miercoles:
 *            type: integer
 *         jueves: 
 *            type: integer
 *         viernes: 
 *            type: integer
 *         sabado:
 *            type: integer
 *         domingo:
 *            type: integer
 *         espacioId:
 *            type: integer
 *         desde:
 *            type: string
 *         hasta:
 *            type: string
 *        example:
 *         lunes: 0
 *         martes: 1
 *         miercoles: 0
 *         jueves: 0
 *         viernes: 0
 *         sabado: 0
 *         domingo: 0
 *         desde: "00:00:00"
 *         hasta: "00:00:00"
 *         espacioId: 205
 *     RespuestaPost:
 *        type: object
 *        properties:
 *         respuesta:
 *            type: array
 *        example:
 *         respuesta: [{respuesta: 1},{respuesta: 120}]    
 *     Email:
 *        type: object
 *        properties:
 *         email:
 *           type: string
 *        example:
 *         email: "ezeedge@gmail.com"
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


/**
 * @swagger
 * /api/clubs:
 *   post:
 *     summary: Crear un nuevo club
 *     tags: [Clubs]
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
 *               $ref: '#/components/schemas/Clubs'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /api/clubs/{id}:
 *   delete:
 *     summary: delete club by id 
 *     tags: [Clubs]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un club existente
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de un club
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Clubs'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

/**
 * @swagger
 * /api/clubs/{id}:
 *   put:
 *     summary: modificar un club
 *     tags: [Clubs]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *         required: true
 *     requestBody:
 *       required: true
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
 *         description: The encursta was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clubs'
 *       500:
 *         description: Some server error
 */

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

 /**
 * @swagger
 * /api/disciplina:
 *   post:
 *     summary: agregar una disciplina
 *     tags: [Disciplina]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disciplinas'
 *     responses:
 *       200:
 *         description: The encursta was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplinas'
 *       500:
 *         description: Some server error
 */

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



/**
 * @swagger
 * /api/disciplina/{id}:
 *   put:
 *     summary: modificar una discplina
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disiciplinas'
 *     responses:
 *       200:
 *         description: The encursta was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disicplinas'
 *       500:
 *         description: Some server error
 */

                             /**
 * @swagger
 * /api/disciplina/{id}:
 *   delete:
 *     summary: get id 
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de una disciplina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete disciplina
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Disciplinas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

/**
 * @swagger
 * /api/disciplina-usuario/{club}/{usuario}:
 *   get:
 *     summary: get de las disciplina que tiene un usuario que pertenece a un club (clubxusuarioId)
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: agregar el id del club
 *       - in : path
 *         name: usuario
 *         description: id de un usuario
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

                             /**
 * @swagger
 * /api/disciplina-club/{club}/{disciplina}:
 *   delete:
 *     summary: delete de una disciplina que esta relacionada a un club
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get id de un club
 *       - in : path
 *         name: disciplina
 *         description: get id de una disciplina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete disciplina x club
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/RelDisciplinaxClub'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

                             /**
 * @swagger
 * /api/disciplina-club/{club}/{disciplina}:
 *   post:
 *     summary: agregar una disciplina a un club
 *     tags: [Disciplina]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get id de un club
 *       - in : path
 *         name: disciplina
 *         description: get id de una disciplina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  agregar disciplina x club
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/RelDisciplinaxClub'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

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



    /**
 * @swagger
 * /api/image/{img}:
 *   get:
 *     summary: get de una imagen
 *     tags: [Persona]
 *     parameters:
 *       - in : path
 *         name: img
 *         description: nombre de una imagen ejemplo: dB-dgsxXa.png
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: post can not be found
 * 
 * 
 */


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

            /**
 * @swagger
 * /api/personas/update/{usuario}:
 *   put:
 *     summary: modificar los datos de una persona por el ID del usuario
 *     tags: [Persona]
 *     parameters:
 *       - in : path
 *         name: usuario
 *         description: id de usuario
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
 *         description: persona by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaModificar'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

/**
 * @swagger
 * /api/persona:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Persona]
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
 *               $ref: '#/components/schemas/Persona'
 *       500:
 *         description: Some server error
 */
    
    



/**
 * @swagger
 * /api/personas/update/image/{usuario}:
 *   put:
 *     summary: update de imagen de perfil
 *     tags: [Persona]
 *     parameters:
 *       - in : path
 *         name: usuario
 *         description: id de usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *              imagen:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *        description: OK
 *       500:
 *         description: Some server error
 */







        /**
 * @swagger
 * /api/documentacion/estados:
 *   get:
 *     summary: estados de documentacion
 *     tags: [Documentacion]
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


                /**
 * @swagger
 * /api/documento/{nombre}:
 *   get:
 *     summary: get de un documento
 *     tags: [Documentacion]
 *     parameters:
 *       - in : path
 *         name: nombre
 *         description: ejemplo de nombre-->    Veq0U4Ksg.pdf
 *         schema:
 *           type: string
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

                ///documentacion/upload/:solicitud

                            /**
 * @swagger
 * /api/documentacion/upload/{solicitud}/{usuario}:
 *   post:
 *     summary: cargar documento de una solicitud
 *     tags: [Documentacion]
 *     parameters:
 *       - in : path
 *         name: solicitud
 *         description: id de una solicitud
 *       - in : path
 *         name: usuario
 *         description: id de un usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *              documento:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         description: persona by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaModificar'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



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


  /**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: get de todos los usuarios
 *     tags: [Usuario]
 *	    security:
 *	     - jwt: []
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


 ///documentacion/estado/:club/:usuario/:estado

     /**
 * @swagger
 * /api/documentacion/estado/{club}/{usuario}/{estado}:
 *   get:
 *     summary: get de las solicitudes de dociumentacion segun por el estado
 *     tags: [Documentacion]
 *     parameters:
 *      - in: path
 *        name: usuario
 *        type: number
 *        description: agregar id de un usuario existente.
 *      - in: path
 *        name: club
 *        type: number
 *        description: agregar el id de un club existente 
 *      - in: path
 *        name: estado
 *        type: number
 *        description: agregar el id de un estado
 *     responses:
 *       200:
 *        description: OK

 */  


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

   /**
 * @swagger
 * /api/usuario-update/rol/{clubxusuario}:
 *   put:
 *     summary: agregar usuario a un club
 *     tags: [Usuario]
 *     parameters:
 *      - in: path
 *        name: clubxusuario
 *        type: number
 *        description: agregar id de clubxusuario (usuario asociado a un club que tiene un rol)
 *     responses:
 *       200:
 *        description: OK

 */ 

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


        /**
 * @swagger
 * /api/usuario-perfil/{club}:
 *   get:
 *     summary: get usuario by id
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: club
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
   
          /**
 * @swagger
 * /api/usuario/search/{email}:
 *   get:
 *     summary: get usuario by id
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: email
 *         description: email de un usuario registrado
 *         schema:
 *           type: string
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

        /**
 * @swagger
 * /api/lista-usuarios/{club}/{rol}:
 *   get:
 *     summary: get de usuarios con un rol determinado que pertener a un club
 *     tags: [Usuario]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *       - in : path
 *         name: rol
 *         description: id de un rol
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

    /**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Login de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signin'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Signin'
 *       500:
 *         description: Some server error
 */


        /**
 * @swagger
 * /api/signout:
 *   post:
 *     summary: Cerrar sesion
 *     tags: [Auth]
 *     responses:
 *       200:
 *        description: OK
 *       400:
 *         description: post can not be found
 */


    /**
 * @swagger
 * /api/actualizar-token-firebase:
 *   post:
 *     summary: Guardar token del dispositivo
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuardarToken'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GuardarToken'
 *       500:
 *         description: Some server error
 */


       /**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Login de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signin'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Signin'
 *       500:
 *         description: Some server error
 */


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



        /**
 * @swagger
 * /api/notificacion/vistas/{id}:
 *   get:
 *     summary: get de los usuarios que vieron la notificacion (el id hace una referencia al id de la notificacion)
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una notificacion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de los usuarios que vieron las notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */






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

                /**
 * @swagger
 * /api/div/{club}/{disciplina}:
 *   get:
 *     summary: get todas la divisiones de una disciplina
 *     tags: [Division]
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

                    /**
 * @swagger
 * /api/image/{img}:
 *   get:
 *     summary: get de una imagen en el caso de que no tenga una url
 *     tags: [imagen]
 *     parameters:
 *       - in : path
 *         name: img
 *         type: string
 *         description: get imagen by name
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description:  get image
 *         content:
 *           application/json:
 *             schema:
 *               type: file
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                    /**
 * @swagger
 * /api/notificaciones-enviadas-por:
 *   get:
 *     summary: get de las notificaciones enviadas por el usuario que inicio sesion
 *     tags: [Notificacion]
 *     responses:
 *       200:
 *         description:  get de las notificaciones enviadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


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




                    /**
 * @swagger
 * /api/page/beneficios/{page}:
 *   get:
 *     summary: get all beneficios
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: page
 *         description: numero de una pagina 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get all beneficios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
     




                    /**
 * @swagger
 * /api/beneficios/rubro/{rubro}:
 *   get:
 *     summary: get de los beneficios by id rubro
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: rubro
 *         description: id de un rubro
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get beneficios by rubro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                    /**
 * @swagger
 * /api/beneficios/{id}:
 *   get:
 *     summary: get id 
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de un beneficio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id by beneficio
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                    /**
 * @swagger
 * /api/rubro:
 *   get:
 *     summary: get all rubro
 *     tags: [Rubro]
 *     responses:
 *       200:
 *         description:  get all rubro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rubros'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                      /**
 * @swagger
 * /api/rubro/{id}:
 *   get:
 *     summary: get id 
 *     tags: [Rubro]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de un rubro
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id by rubro
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Rubros'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  


                                           /**
 * @swagger
 * /api/categoria/{id}:
 *   get:
 *     summary: get id 
 *     tags: [Categoria]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de una categoria
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id by rubro
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Rubros'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

                                                                /**
 * @swagger
 * /api/categoria:
 *   get:
 *     summary: get de todas las categorias
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description:  get id by rubro
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Rubros'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  


                    /**
 * @swagger
 * /api/beneficios/club/{club}/{page}:
 *   get:
 *     summary: get beneficios de un club
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get beneficios by clubId
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: page
 *         description: numero de una pagina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get beneficios x club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */




                    //info util

                                        /**
 * @swagger
 * /api/page/info/{club}/{page}:
 *   get:
 *     summary: get beneficios de un club
 *     tags: [Info]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: get beneficios by clubId
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: page
 *         description: numero de una pagina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get beneficios x club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */




                                        /**
 * @swagger
 * /api/buscar-info/{club}/{buscar}:
 *   get:
 *     summary: buscar info de un club
 *     tags: [Info]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: buscar
 *         description: en buscar ingresar un texto que desee buscar
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description:  get beneficios x club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
                          /**
 * @swagger
 * /api/info/{id}:
 *   get:
 *     summary: get id 
 *     tags: [Info]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: agregar id de una informacion util
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id de una info util
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  




/**
 * @swagger
 * /api/notificacion/crear:
 *   post:
 *     summary: Crer una notificacion
 *     tags: [Notificacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notificaciones'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificaciones'
 *       500:
 *         description: Some server error
 */





 
                           /**
 * @swagger
 * /api/notificacion:
 *   get:
 *     summary: get all notificaciones
 *     tags: [Notificacion]
 *     responses:
 *       200:
 *         description:  get all notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */ 
   


   

                          /**
 * @swagger
 * /api/notificacion/{id}:
 *   get:
 *     summary: get id 
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: agregar id de una notificacion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  





                          /**
 * @swagger
 * /api/notificaciones-no-leidos/{userId}/{clubId}:
 *   get:
 *     summary: get id 
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: agregar id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: clubId
 *         description: agregar id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  




                          /**
 * @swagger
 * /api/notificaciones-leidas/{userId}:
 *   get:
 *     summary: get id 
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: agregar id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  



                          /**
 * @swagger
 * /api/notificacion-leida/{notificacion}:
 *   get:
 *     summary: get de una notificacion si es leida por su id
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: notificacion
 *         description: get id de una notificacion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de una notificacion si es leida por su id
 *         content:
 *           application/json:
 *             schema:
 *                 type: string
 *                 example: {message: true}
 *       400:
 *         description: post can not be found
 * 
 * 
 */  




                          /**
 * @swagger
 * /api/validar-usuario/{email}:
 *   get:
 *     summary: get de nombre y apellido de un email
 *     tags: [Auth]
 *     parameters:
 *       - in : path
 *         name: email
 *         description: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description:  get de informacion de un usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *                 type: string
 *                 example: {message: nombre apellido}
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

                          /**
 * @swagger
 * /api/notificacion/usuario/club/{userId}/{clubId}:
 *   get:
 *     summary: get notificaciones del usuario
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: userId 
 *         description: id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: clubId
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */ 
                          

                          /**
 * @swagger
 * /api/notificacion/{id}:
 *   delete:
 *     summary: get id 
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get id de un rubro
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

                          /**
 * @swagger
 * /api/notificacion/{notificacion}/{club}:
 *   post:
 *     summary: post de notificacion a un club
 *     tags: [NotificacionXClub]
 *     parameters:
 *       - in : path
 *         name: club
 *         description:  id de un club
 *       - in : path
 *         name: notificacion
 *         description: id de una notificacion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:   enviar una notificacion a un club
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

 
                          /**
 * @swagger
 * /api/notificacion/club/{club}:
 *   get:
 *     summary: get notificaciones que pertenecen a un club
 *     tags: [NotificacionXClub]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get notificacion by clubid
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */      
 

                          /**
 * @swagger
 * /api/notificacion-club/{id}:
 *   get:
 *     summary: get notificaciones que pertenecen a un club
 *     tags: [NotificacionXClub]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de notificacionxclub
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id de notificacionxclub
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   

 
                          /**
 * @swagger
 * /api/notificacion-club/{id}:
 *   delete:
 *     summary: get notificaciones que pertenecen a un club
 *     tags: [NotificacionXClub]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de notificacionxclub
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id de notificacionxclub
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   



                          /**
 * @swagger
 * /api/notificacion-usuario/{notxclub}/{clubxusuario}:
 *   post:
 *     summary: envio de notificacacion a un usuario
 *     tags: [NotificacionXClubXUsuario]
 *     parameters:
 *       - in : path
 *         name: notxclub
 *         description:  id de un club
 *       - in : path
 *         name: clubxusuario
 *         description: id club x usuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:   enviar una notificacion a un club
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  

                          /**
 * @swagger
 * /api/notificacion-clubxusuario/{notificacion}:
 *   get:
 *     summary: get usuarios que reciben la notificacion <---------------FALTA REVISAR
 *     tags: [NotificacionXClubXUsuario]
 *     parameters:
 *       - in : path
 *         name: notificacion
 *         description: id 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get id de notificacionxclub
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

 

                             /**
 * @swagger
 * /api/notificacion-usuario/{id}:
 *   get:
 *     summary: get usuarios que reciben la notificacion 
 *     tags: [NotificacionXClubXUsuario]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  una notificiacion que pertenece a un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

 

                             /**
 * @swagger
 * /api/notificacion-post:
 *   post:
 *     summary: envio de notificacions  <----- FALTA REVISAR
 *     tags: [NotificacionXClubXUsuario]
 *     responses:
 *       200:
 *         description:  get  una notificiacion que pertenece a un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificaciones'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

    


                               /**
 * @swagger
 * /api/tematicas:
 *   get:
 *     summary: get all tematicas
 *     tags: [Tematicas]
 *     responses:
 *       200:
 *         description:  get all tematicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tematicas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */ 

                              /**
 * @swagger
 * /api/tematicas/{notificacion}:
 *   get:
 *     summary: get de notificacion por tematicas
 *     tags: [Notificacion]
 *     parameters:
 *       - in : path
 *         name: notificacion
 *         description: id notificacion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get tematica by id de notificacion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tematicas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   

    /**
 * @swagger
 * /api/encuesta:
 *   post:
 *     summary: Crer una encuesta
 *     tags: [Encuesta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Encuesta'
 *     responses:
 *       200:
 *         description: The encursta was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       500:
 *         description: Some server error
 */


  
                               /**
 * @swagger
 * /api/encuesta:
 *   get:
 *     summary: get all encuesta
 *     tags: [Encuesta]
 *     responses:
 *       200:
 *         description:  get all encuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  


  
                               /**
 * @swagger
 * /api/encuesta-enviada-por/{userId}/{clubId}:
 *   get:
 *     summary: get all encuesta enviada por un usuario de un club
 *     tags: [Encuesta]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: clubId
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get all encuesta enviadas por un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */ 



                                 /**
 * @swagger
 * /api/encuesta/{id}:
 *   put:
 *     summary: get de una encuesta por id
 *     tags: [Encuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de una encuesta por id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
 

    //encuesta

    /**
 * @swagger
 * /api/encuesta/{id}:
 *   put:
 *     summary: modificar una encuesta
 *     tags: [Encuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Encuesta'
 *     responses:
 *       200:
 *         description: The encursta was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       500:
 *         description: Some server error
 */


                                 /**
 * @swagger
 * /api/encuesta/{id}:
 *   delete:
 *     summary: eliminar una encuesta
 *     tags: [Encuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de una encuesta por id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                             /**
 * @swagger
 * /api/encuesta/usuario/{userId}/{clubId}:
 *   get:
 *     summary: get de las encuesta recibidas por un usuario
 *     tags: [Encuesta]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: userId id del usuario 
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: clubId
 *         description: clubId id de un club 
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  de las encuestas recibidas por un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                                /**
 * @swagger
 * /api/encuesta-post:
 *   post:
 *     summary: envio de encuesta 
 *     tags: [Encuesta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncuestaPost'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncuestaPost'
 *       500:
 *         description: Some server error
 */



                               /**
 * @swagger
 * /api/preguntas:
 *   get:
 *     summary: get all preguntas
 *     tags: [Preguntas]
 *     responses:
 *       200:
 *         description:  get all preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  


///respuesta-encuesta/:encuesta



   /**
 * @swagger
 * /api/pregunta/{encuesta}:
 *   post:
 *     summary: Crear una pregunta 
 *     tags: [Preguntas]
 *     parameters:
 *       - in : path
 *         name: encuesta
 *         description: id de una encuesta existente (asociar)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *       500:
 *         description: Some server error
 */
 
/**
 * @swagger
 * /api/pregunta/{encuesta}:
 *   get:
 *     summary: get pregunta por encuesta by id
 *     tags: [Preguntas]
 *     parameters:
 *       - in : path
 *         name: encuesta
 *         description: get encuesta by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get pregunta por encuesta by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


   /**
 * @swagger
 * /api/pregunta/{id}:
 *   put:
 *     summary: update de una pregunta
 *     tags: [Preguntas]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *       500:
 *         description: Some server error
 */                                               

 
                    /**
 * @swagger
 * /api/pregunta/{id}:
 *   delete:
 *     summary: eliminar pregunta
 *     tags: [Preguntas]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una pregunta
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de una pregunta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


   /**
 * @swagger
 * /api/respuesta/pregunta/{pregunta}:
 *   post:
 *     summary: Crear una respuesta asociada a un id de pregunta 
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: pregunta
 *         description: id de pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Respuesta'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Respuesta'
 *       500:
 *         description: Some server error
 */


                    /**
 * @swagger
 * /api/respuesta/pregunta/{pregunta}:
 *   get:
 *     summary: get respuesta by id pregunta
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: pregunta
 *         description: get respuesta by id pregunta
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get respuesta by id de pregunta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



     /**
 * @swagger
 * /api/respuesta/usuario:
 *   post:
 *     summary: agregar respuesta de encuesta
 *     tags: [Respuesta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RespuestaPost'
 *     responses:
 *       200:
 *        description: creado correctamente
 *       400:
 *         description: post can not be found
 */


     /**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *        description: revice su bandeja de entrada
 *       400:
 *         description: post can not be found
 */




                    /**
 * @swagger
 * /api/respuesta/usuario/{respuestaId}:
 *   delete:
 *     summary: se elimina una respuesta que selecciono anteriormente
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: respuestaId
 *         description: la respuestaId debe ser el id de una respuesta
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: se elimina una respuesta que selecciono anteriormente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                    /**
 * @swagger
 * /api/respuesta-encuesta/{encuesta}:
 *   get:
 *     summary: get todas las respuesta de la encuesta
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: encuesta
 *         description: agregar el id de una encuesta
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                    /**
 * @swagger
 * /api/respuesta/{id}:
 *   get:
 *     summary: get respuesta by id
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: get respuesta by id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get respuesta by id 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



  /**
 * @swagger
 * /api/respuesta/{id}:
 *   put:
 *     summary: update de una respuesta
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Respuesta'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Respuesta'
 *       500:
 *         description: Some server error
 */   


                    /**
 * @swagger
 * /api/respuesta/{id}:
 *   delete:
 *     summary: eliminar respuesta
 *     tags: [Respuesta]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una respuesta
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de una respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: post can not be found
 * 
 * 
 */




   /**
 * @swagger
 * /api/espacio:
 *   post:
 *     summary: Crear un espacio
 *     tags: [Espacio]
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
 *               $ref: '#/components/schemas/Espacios'
 *       500:
 *         description: Some server error
 */


                /**
 * @swagger
 * /api/espacio:
 *   get:
 *     summary: get all espacios
 *     tags: [Espacio]
 *     responses:
 *       200:
 *         description:  get all espacios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                   /**
 * @swagger
 * /api/espacio/club/{club}:
 *   get:
 *     summary: get espacio by clubId
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get Espacio by clubId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */





                   /**
 * @swagger
 * /api/espacio/{id}:
 *   get:
 *     summary: get espacio by clubId
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get Espacio by clubId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                   /**
 * @swagger
 * /api/espacio/disciplina/{disciplina}:
 *   get:
 *     summary: get espacio by id de disciplinaxclub
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: disciplina
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get Espacio by disciplina
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
                   /**
 * @swagger
 * /api/espacio/disciplina/{espacio}/{club}:
 *   get:
 *     summary: get de todas la disciplina que esta relacionanda a un club(disciplinaxclub) y a un espacio
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: espacio 
 *         description: id de un espacio existente
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: club
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get Espacio by clubId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                   /**
 * @swagger
 * /api/espacio/disciplina/{espacio}/{disciplinaxclubId}:
 *   post:
 *     summary: get de todas la disciplina que esta relacionanda a un club(disciplinaxclub) y a un espacio
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: espacio 
 *         description: id de un espacio existente
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: disciplinaxclubId
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get Espacio by clubId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
 


  /**
 * @swagger
 * /api/espacio/{id}:
 *   put:
 *     summary: update de un espacio
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un espacio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Espacios'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Espacios'
 *       500:
 *         description: Some server error
 */   




                    /**
 * @swagger
 * /api/espacio/{id}:
 *   delete:
 *     summary: eliminar un espacio
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un espacio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de un espacio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espacios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/estado-espacio:
 *   get:
 *     summary: get de los estado de espacios
 *     tags: [EstadoEspacio]
 *     responses:
 *       200:
 *         description: get de los estado de espacios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoEspacio'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                /**
 * @swagger
 * /api/estado-espacio/{id}:
 *   get:
 *     summary: get estado espacio by id
 *     tags: [EstadoEspacio]
 *     responses:
 *       200:
 *         description:  get estado espacio by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoEspacio'
 *       400:
 *         description: post can not be found
 * 
 * 
 */




                /**
 * @swagger
 * /api/estado-reserva:
 *   get:
 *     summary: get de los estado de la reserva
 *     tags: [EstadoReserva]
 *     responses:
 *       200:
 *         description: get de los estado de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoReserva'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/estado-reserva/{id}:
 *   get:
 *     summary: get estado reserva by id
 *     tags: [EstadoReserva]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un estado de reserva
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get estado reserva by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoReserva'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/reserva:
 *   get:
 *     summary: get all reserva
 *     tags: [Reserva]
 *     responses:
 *       200:
 *         description: get all reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/reserva/{id}:
 *   get:
 *     summary: get reserva by id
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una reserva
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  reserva by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                        /**
 * @swagger
 * /api/reserva/usuario/club/{usuario}/{club}:
 *   get:
 *     summary: get reservas que tiene un usuario realizadas
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: usuario
 *         description:  id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: club
 *         description:  id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  reservar x usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   



                        /**
 * @swagger
 * /api/beneficio/club/rubro/{club}/{rubro}:
 *   get:
 *     summary: get de beneficios por rubro de un club
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: club
 *         description:  id de un club
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: rubro
 *         description:  id de un rubro
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  reservar x usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   


                                                /**
 * @swagger
 * /api/info/club/categoria/{club}/{categoria}:
 *   get:
 *     summary: get info de un club por la categoria
 *     tags: [Info]
 *     parameters:
 *       - in : path
 *         name: club
 *         description:  id de un club
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: categoria
 *         description:  id de una categoria
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  reservar x usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   

                                                /**
 * @swagger
 * /api/buscar-beneficios/{club}/{buscar}:
 *   get:
 *     summary: get info de un club por la categoria
 *     tags: [Beneficios]
 *     parameters:
 *       - in : path
 *         name: club
 *         description:  id de un club
 *         schema:
 *           type: integer
 *         required: true
 *       - in : path
 *         name: buscar
 *         description:  ingresar un texto de lo que quieras buscar
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description:  reservar x usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficios'
 *       400:
 *         description: post can not be found
 * 
 * 
 */  
                                                
    /**
 * @swagger
 * /api/reserva/{id}/{estado}:
 *   put:
 *     summary: cambiar el estado de una reserva
 *     tags: [Reserva]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        description: reserva id
 *      - in: path
 *        name: estado
 *        type: number
 *        description: estado de reserva id
 *     responses:
 *       200:
 *        description: OK

 */  




/**
 * @swagger
 * /api/reserva:
 *   post:
 *     summary: Crer reserva
 *     tags: [Reserva]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservas'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservas'
 *       500:
 *         description: Some server error
 */


                    /**
 * @swagger
 * /api/reserva/{id}:
 *   delete:
 *     summary: eliminar una reserva
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una reserva
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de una reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/ingreso:
 *   get:
 *     summary: get all ingreso
 *     tags: [Ingreso]
 *     responses:
 *       200:
 *         description: get all ingreso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/turno/club/{club}:
 *   get:
 *     summary: get ingreso  by id
 *     tags: [Turno]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id de un club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  ingreso by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turnos'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                /**
 * @swagger
 * /api/ingreso/{id}:
 *   get:
 *     summary: get ingreso  by id
 *     tags: [Ingreso]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un ingrso
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  ingreso by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


               /**
 * @swagger
 * /api/ingreso/espacio/{espacio}:
 *   get:
 *     summary: get ingreso  by reserva id
 *     tags: [Ingreso]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de un ingreso
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  ingreso by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

   /**
 * @swagger
 * /api/ingreso/crear/{espacio}/{manager}:
 *   post:
 *     summary: se crea un ingreso
 *     tags: [Ingreso]
 *     parameters:
 *      - in: path
 *        name: espacio
 *        type: number
 *        description: agregar id de un espacio
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: manager
 *        type: number
 *        description: agregar id de un manager
 *        schema:
 *          type: integer
 *        required: true
 *     responses:
 *       200:
 *        description: OK
 *       400:
 *         description: post can not be found

 */  

 
      /**
 * @swagger
 * /api/usuario-perfil/deporte/{userId}/{club}/{disciplina}/{div}/{pos}:
 *   post:
 *     summary: se crea un ingreso
 *     tags: [Disciplina]
 *     parameters:
 *      - in: path
 *        name: userId
 *        type: number
 *        description: agregar el id de un usuario
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: manager
 *        type: number
 *        description: agregar id  de un club
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: disciplina
 *        type: number
 *        description: agregar el id de una disciplina
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: div
 *        type: number
 *        description: agregar el id de una division
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: pos
 *        type: number
 *        description: agregar el id de una posicion
 *        schema:
 *          type: integer
 *        required: true
 *     responses:
 *       200:
 *        description: OK
 *       400:
 *         description: post can not be found

 */  




                /**
 * @swagger
 * /api/ingreso/usuario/{userId}:
 *   get:
 *     summary: get ver los ingresos de un usuario 
 *     tags: [Ingreso]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: id de un usuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  ingreso de un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/configuracion/{espacio}:
 *   get:
 *     summary: get las configuraciones por espacio
 *     tags: [Configuracion]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de un espacio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  de configuracion por espacio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuracion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/configuracion/{id}:
 *   delete:
 *     summary: delete de una configuracion por su id
 *     tags: [Configuracion]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de una configuracion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de una configuracion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuracion'
 *       400:
 *         description: post can not be found
 * 
 * 
 */
  
  /**
 * @swagger
 * /api/ingreso-filtro/{espacio}/{usuario}/{manager}/{desde}/{hasta}:
 *   get:
 *     summary: get de los estado de las reservas
 *     tags: [Ingreso]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de un espacio
 *         default: "null"
 *         schema:
 *           type: string
 *           defualt: "null"
 *       - in : path
 *         name: usuario
 *         description: id de un usuario
 *         default: "null"
 *         schema:
 *           type: string
 *           defualt: "null"
 *       - in : path
 *         name: manager
 *         description: id de un manager
 *         default: "null"
 *         schema:
 *           type: string
 *           defualt: "null"
 *       - in : path
 *         name: desde
 *         description: desde  formato  2021-06-15
 *         default: "null"
 *         schema:
 *           type: string
 *           defualt: "null"
 *       - in : path
 *         name: hasta
 *         description: hasta formato 2021-06-15
 *         default: "null"
 *         schema:
 *           type: string
 *           defualt: "null"
 *     responses:
 *       200:
 *         description:  get  ingreso de un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   


  /**
 * @swagger
 * /api/reserva-filtro/{espacio}/{fecha}:
 *   get:
 *     summary: get filtro de reserva por espacioId y fecha
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de un espacio
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: fecha
 *         description: ingresar una fecha 2021-06-15  o null por defecto
 *         default: "null"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description:  get filtro de reservas por espacioId y fecha
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */   


                /**
 * @swagger
 * /api/reserva/usuario/estado/{userId}/{estado}:
 *   get:
 *     summary: get de los estado de las reservas
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: id de un usuario
 *       - in : path
 *         name: estado
 *         description: id de estado de reserva
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  ingreso de un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/reserva/bloqueado/{espacio}:
 *   get:
 *     summary: get de las reservas bloqueadas
 *     tags: [Reserva]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de un espacio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get de una reserva bloqueada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservas'
 *       400:
 *         description: post can not be found
 * 
 * 
 */



//ESTADO TURNO

                /**
 * @swagger
 * /api/estado-turno:
 *   get:
 *     summary: get de los estado de un turno
 *     tags: [EstadoTurno]
 *     responses:
 *       200:
 *         description: get de los estado de turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoTurno'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/estado-turno/{id}:
 *   get:
 *     summary: get estado turno by id
 *     tags: [EstadoTurno]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un estado de turno
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get estado de turno by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoTurno'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

                /**
 * @swagger
 * /api/turno:
 *   get: 
 *     summary: get all de los turnos
 *     tags: [Turno]
 *     responses:
 *       200:
 *         description: get de los estado de turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turnos'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/turno/{espacio}:
 *   get:
 *     summary: get estado turno by id
 *     tags: [Turno]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id del espacio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get turno by espacioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turno'
 *       400:
 *         description: post can not be found
 * 
 * 
 */





               /**
 * @swagger
 * /api/turno-inactivo:
 *   get: 
 *     summary: get all de los turnos inactivos
 *     tags: [Turno]
 *     responses:
 *       200:
 *         description: get de los estado de turnos inactivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turnos'
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                /**
 * @swagger
 * /api/turno/{id}:
 *   get:
 *     summary: get turno  by id
 *     tags: [Turno]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un turno
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get  turno by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turnos'
 *       400:
 *         description: post can not be found
 * 
 * 
 */

   /**
 * @swagger
 * /api/turno/{espacio}:
 *   post:
 *     summary: Crear un espacio
 *     tags: [Turno]
 *     parameters:
 *       - in : path
 *         name: espacio
 *         description: id de espacio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turnos'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turnos'
 *       500:
 *         description: Some server error
 */


                    /**
 * @swagger
 * /api/turno/{id}:
 *   delete:
 *     summary: eliminar un turno por id
 *     tags: [Turno]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de un turno
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  delete de una reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turnos'
 *
 *       400:
 *         description: post can not be found
 * 
 * 
 */


                                       /**
 * @swagger
 * /api/estado-documento:
 *   get:
 *     summary: get de los estado de documento
 *     tags: [EstadoDocumento <---falta terminar]
 * 
 */

                    /**
 * @swagger
 * /api/estado-documento/{id}:
 *   get:
 *     summary: eliminar un turno por id
 *     tags: [EstadoDocumento <---falta terminar]
 * 
 */





                                       /**
 * @swagger
 * /api/archivo:
 *   post:
 *     summary: post agregar archivo
 *     tags: [Archivo <---falta terminar]
 * 
 */


                                       /**
 * @swagger
 * /api/archivo/{id}:
 *    get:
 *     summary: get archivo by id
 *     tags: [Archivo <---falta terminar]
 * 
 */
   




                /**
 * @swagger
 * /api/filtro-posicion/{disxclubxdiv}:
 *   get:
 *     summary: filtro de usuarios por posicion por id disxclubxdiv
 *     tags: [Filtro]
 *     parameters:
 *       - in : path
 *         name: disxclubxdiv
 *         description: id del club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get filtro de usuarios por posicion
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/filtro-usuarios/{club}:
 *   get:
 *     summary: filtro de los usuarios por id de un club
 *     tags: [Filtro]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id del club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get turno by espacioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 *       400:
 *         description: post can not be found
 * 
 * 
 */



                /**
 * @swagger
 * /api/filtro-usuarios/{club}/{disxclub}:
 *   get:
 *     summary: filtro de los usuarios por id de un club y el id de displina x club(disciplina asociada a un club)
 *     tags: [Filtro]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id del club
 *       - in : path
 *         name: disxclub
 *         description: id del disciplina x club
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get turno by espacioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 *       400:
 *         description: post can not be found
 * 
 * 
 */
    



                /**
 * @swagger
 * /api/filtro-usuarios/{club}/{disxclub}/{disxclubxdiv}:
 *   get:
 *     summary: filtro de los usuarios por id de un club y el id de displina x club(disciplina asociada a un club) y el id de disxclubxdiv (disciplina asociada a un club y a una division)
 *     tags: [Filtro]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id del club
 *       - in : path
 *         name: disxclub
 *         description: id del disciplina x club
 *       - in : path
 *         name: disxclubxdiv
 *         description: id disxclubxdiv division
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get turno by espacioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 *       400:
 *         description: post can not be found
 * 
 * 
 */
    


                /**
 * @swagger
 * /api/filtro-usuarios/{club}/{disxclub}/{disxclubxdiv}/{disciplinaxclubxpos}:
 *   get:
 *     summary: filtro de los usuarios por id de un club y el id de displina x club(disciplina asociada a un club) y el id de disxclubxdiv (disciplina asociada a un club y a una division) y el id disciplinaxclubxpos (disciplina asociada a un club y a una posicion)
 *     tags: [Filtro]
 *     parameters:
 *       - in : path
 *         name: club
 *         description: id del club
 *       - in : path
 *         name: disxclub
 *         description: id del disciplina x club
 *       - in : path
 *         name: disxclubxdiv
 *         description: id disxclubxdiv division
 *       - in : path
 *         name: disciplinaxclubxpos
 *         description: id disciplinaxclubxpos posicion
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  get turno by espacioId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: post can not be found
 * 
 * 
 */
