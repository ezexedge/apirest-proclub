const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club')

const CategoriaDocumentacion = db.define('categoriadocumentacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});



Categoria.belongsTo(Club,{as:"club",foreignKey: 'clubId'})




module.exports = CategoriaDocumentacion;