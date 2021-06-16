const Sequelize = require('sequelize');
const db = require('../config/db');

const EstadoTurno = db.define('estadoturno', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = EstadoTurno;