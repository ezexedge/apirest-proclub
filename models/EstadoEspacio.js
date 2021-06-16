const Sequelize = require('sequelize');
const db = require('../config/db');

const EstadoEspacio = db.define('estadoespacio', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = EstadoEspacio;