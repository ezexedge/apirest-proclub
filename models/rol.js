const Sequelize = require('sequelize');
const db = require('../config/db');

const Rol = db.define('rol', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Rol;