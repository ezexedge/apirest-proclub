const Sequelize = require('sequelize');
const db = require('../config/db');

const Division = db.define('division', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = Division;