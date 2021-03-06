const Sequelize = require('sequelize');
const Usuario = require('./Usuario')
const db = require('../config/db');
const SolicitudDocumento = require('./SolicitudDocumento');
const Club = require('./Club');
const Documentacion = require('./Documentacion');
const EstadoDocumento = require('./EstadoDocumento');



const DestinatarioDocumentacion = db.define('destinatariodocumentacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    
});


DestinatarioDocumentacion.belongsTo(SolicitudDocumento,{as:"solicituddocumento",foreignKey: 'solicituddocumentoId'})
DestinatarioDocumentacion.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
DestinatarioDocumentacion.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
DestinatarioDocumentacion.belongsTo(EstadoDocumento,{as:"estadodocumentacion",foreignKey: 'estadodocumentacionId'})



module.exports = DestinatarioDocumentacion;