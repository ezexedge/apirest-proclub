const Sequelize = require('sequelize');
const db = require('../config/db');

const Tematica = db.define('tematica', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Tematica;

