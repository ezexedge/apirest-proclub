const Sequelize = require('sequelize');
const db = require('../config/db');

const Rubro = db.define('rubro', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Rubro;