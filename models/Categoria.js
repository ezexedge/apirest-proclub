const Sequelize = require('sequelize');
const db = require('../config/db');

const Categoria = db.define('categoria', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Categoria;