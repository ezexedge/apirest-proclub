const Sequelize = require('sequelize');
const Provincia = require('../models/Provincia')
const Pais = require('../models/Pais')
const db = require('../config/db');
const Usuario = require('../models/Usuario')

const Encuesta = db.define('encuesta', {
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
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    },
    fecha: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    hora:{
        type: Sequelize.TIME
    },
    superadmin:{
        type: Sequelize.INTEGER,   
        defaultValue: 0
    }
    
    
});





module.exports = Encuesta;