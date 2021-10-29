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
    titulo: Sequelize.STRING,
    descripcion: Sequelize.STRING,
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
    }
    
    
});





module.exports = Encuesta;