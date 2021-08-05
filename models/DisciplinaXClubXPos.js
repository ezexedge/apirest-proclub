const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisciplunaXClub = require('./RelDisciplinaXClub')
const RelDisciplinaXPos = require('./RelDisciplinaXPos')
const DisciplinaXClubXPos = db.define('disciplinaxclubxpos', {
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


DisciplinaXClubXPos.belongsTo(RelDisciplunaXClub,{as:"disxclub",foreignKey: 'disxclubId'})
DisciplinaXClubXPos.belongsTo(RelDisciplinaXPos,{as:"disciplinaxpos", foreignKey: 'disciplinaxposId'})






module.exports = DisciplinaXClubXPos