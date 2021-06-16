const Sequelize = require('sequelize');
const db = require('../config/db');

const TipoDocumento = db.define('tipoDocumento', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = TipoDocumento;