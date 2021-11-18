const Sequelize = require('sequelize');
const Categoria = require('./Categoria')
const InfoUtil = require('./InfoUtil')
const db = require('../config/db');


const CategoriaXInfo = db.define('categoriaxinfo', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
     
});




CategoriaXInfo.belongsTo(Categoria,{as:"categoria",foreignKey: 'categoriaId'})

CategoriaXInfo.belongsTo(InfoUtil,{as:"infoutil",foreignKey: 'infoutilId'})










module.exports = CategoriaXInfo;