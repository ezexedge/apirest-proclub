const Sequelize = require('sequelize');
const Disciplina = require('./Disciplina')
const Club = require('./Club')
const db = require('../config/db');


const RelDisciplinaXClub = db.define('reldisciplinaxclub', {
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




RelDisciplinaXClub.belongsTo(Club,{as:"club",foreignKey: 'clubId'})

RelDisciplinaXClub.belongsTo(Disciplina,{as:"disciplina",foreignKey: 'disciplinaId'})
//Usuario.belongsTo(Persona,{as:"persona"})










module.exports = RelDisciplinaXClub;