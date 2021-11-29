const Sequelize = require('sequelize');
const db = require('../config/db');

const CategoriaDocumentacion = db.define('categoriadocumentacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});







module.exports = CategoriaDocumentacion;