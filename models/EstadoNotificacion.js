const Sequelize = require('sequelize');
const db = require('../config/db');

const EstadoNotificacion = db.define('estadonotificacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = EstadoNotificacion;