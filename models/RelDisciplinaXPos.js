const Sequelize = require('sequelize');
const Disciplina = require('./Disciplina')
const Posicion = require('./Posicion')
const db = require('../config/db');


const RelDisciplinaXPos = db.define('reldisciplinaxpos', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
     
});




RelDisciplinaXPos.belongsTo(Posicion,{as:"posicion",foreignKey: 'posicionId'})

RelDisciplinaXPos.belongsTo(Disciplina,{as:"disciplina",foreignKey: 'disciplinaId'})
//Usuario.belongsTo(Persona,{as:"persona"})










module.exports = RelDisciplinaXPos;