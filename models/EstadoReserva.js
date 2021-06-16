const Sequelize = require('sequelize');
const db = require('../config/db');

const EstadoReserva = db.define('estadoreserva', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = EstadoReserva;