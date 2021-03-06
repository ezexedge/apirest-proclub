const Sequelize = require('sequelize');

const db = require('../config/db');
const Documentacion = require('../models/Documentacion')
const moment = require('moment');
const EstadoDocumento = require('./EstadoDocumento');
const Usuario = require('./Usuario');
const CategoriaDocumentacion = require('./CategoriaDocumentacion');




const SolicitudDocumento = db.define('solicitudDocumento', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: {
        type: Sequelize.TEXT
    },
    descripcion: {
        type: Sequelize.TEXT
    },
   
    
    fecha: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    hora:{
        type: Sequelize.TIME
    }
    ,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});



SolicitudDocumento.belongsTo(Usuario,{as:"enviadopor",foreignKey: 'enviadoporId'})
SolicitudDocumento.belongsTo(CategoriaDocumentacion,{as:"categoriadocumento",foreignKey: 'categoriadocumentoId'})



module.exports = SolicitudDocumento;

