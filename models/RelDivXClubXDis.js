const Sequelize = require('sequelize');
const Disciplina = require('./Disciplina')
const Club = require('./Club')
const db = require('../config/db');


const RelDivXClubXDis = db.define('reldivxclubxdis', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
     
});




RelDivXClubXDis.belongsTo(Club,{as:"club",foreignKey: 'clubId'})

RelDivXClubXDis.belongsTo(Disciplina,{as:"disciplina",foreignKey: 'disciplinaId'})
//Usuario.belongsTo(Persona,{as:"persona"})










module.exports = RelDivXClubXDis;