const Sequelize = require('sequelize');
const db = require('../config/db');

const Estados = db.define('estados', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Estados;