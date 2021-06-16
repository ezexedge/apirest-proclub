const Sequelize = require('sequelize');
const db = require('../config/db');

const EstadoDocumento = db.define('estadodocumento', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = EstadoDocumento;