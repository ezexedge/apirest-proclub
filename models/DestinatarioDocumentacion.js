const Sequelize = require('sequelize');
const Encuesta = require('./Encuesta')
const Usuario = require('./Usuario')
const db = require('../config/db');
const SolicitudDocumento = require('./SolicitudDocumento');
const ClubXusuario = require('./ClubXUsuario');

const DestinatarioDocumentacion = db.define('destinatariodocumentacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    
});


DestinatarioDocumentacion.belongsTo(SolicitudDocumento,{as:"solicituddocumento",foreignKey: 'solicituddocumentoId'})
DestinatarioDocumentacion.belongsTo(ClubXusuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})



module.exports = DestinatarioDocumentacion;