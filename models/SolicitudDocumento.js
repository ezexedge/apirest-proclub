const Sequelize = require('sequelize');

const db = require('../config/db');
const Documentacion = require('../models/Documentacion')
const moment = require('moment');
const EstadoDocumento = require('./EstadoDocumento');
const Usuario = require('./Usuario');




const SolicitudDocumento = db.define('solicitudDocumento', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
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



module.exports = SolicitudDocumento;

