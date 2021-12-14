const Sequelize = require('sequelize');

const db = require('../config/db');
const Documentacion = require('../models/Documentacion')
const moment = require('moment');
const Usuario = require('./Usuario');
const SolicitudDocumento = require('./SolicitudDocumento');
const Club = require('./Club');




const SolicitudXDocumentos = db.define('solicitudxdocumentos', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fecha: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    hora:{
        type: Sequelize.TIME
    }
});



SolicitudXDocumentos.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
SolicitudXDocumentos.belongsTo(SolicitudDocumento,{as:"solicituddocumento",foreignKey: 'solicituddocumentoId'})
SolicitudXDocumentos.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
SolicitudXDocumentos.belongsTo(Documentacion,{as:"documentacion",foreignKey: 'documentacionId'})



module.exports = SolicitudXDocumentos;

