const Sequelize = require('sequelize');
const db = require('../config/db');

const Pais = db.define('pais', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Pais;