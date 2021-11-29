const Sequelize = require('sequelize');

const db = require('../config/db');
const CategoriaDocumentacion = require('./CategoriaDocumentacion');
const SolicitudDocumento = require('./SolicitudDocumento');


const CategoriaDocXSolicitudDoc = db.define('categoriadocxsolicituddoc', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
     
});




CategoriaDocXSolicitudDoc.belongsTo(CategoriaDocumentacion,{as:"categoriadocumentacion",foreignKey: 'categoriadocumentacionId'})

CategoriaDocXSolicitudDoc.belongsTo(SolicitudDocumento,{as:"solicituddocumento",foreignKey: 'solicituddocumentoId'})










module.exports = CategoriaDocXSolicitudDoc;