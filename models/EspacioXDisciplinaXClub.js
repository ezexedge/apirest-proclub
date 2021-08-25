const Sequelize = require('sequelize');
const RelDisciplinaXClub = require('./RelDisciplinaXClub')
const Espacio = require('./Espacio')
const db = require('../config/db');


const EspacioXDisciplinaXClub = db.define('espacioxdisciplinaxclub', {
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




EspacioXDisciplinaXClub.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})

EspacioXDisciplinaXClub.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})
//Usuario.belongsTo(Persona,{as:"persona"})










module.exports = EspacioXDisciplinaXClub