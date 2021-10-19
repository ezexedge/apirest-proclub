const Sequelize = require('sequelize');
const Provincia = require('../models/Provincia')
const Pais = require('../models/Pais')
const db = require('../config/db');

const Disciplina = db.define('disciplina', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
    
});



module.exports = Disciplina;