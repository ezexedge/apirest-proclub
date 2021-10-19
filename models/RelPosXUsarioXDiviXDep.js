const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisXClubXDiv = require('./RelDisXClubXDiv')
const ClubXUsuario = require('./ClubXUsuario')
const DisciplinaXClubXPos = require('./DisciplinaXClubXPos')
const RelDisciplinaXClub = require('./RelDisciplinaXClub')
const RelPosXUsuarioXDivXDep = db.define('relposxusuarioxdivxdep', {
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


RelPosXUsuarioXDivXDep.belongsTo(ClubXUsuario,{as:"clubxusuario", foreignKey: 'clubxusuarioId'})
RelPosXUsuarioXDivXDep.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub", foreignKey: 'disciplinaxclubId'})
RelPosXUsuarioXDivXDep.belongsTo(RelDisXClubXDiv,{as:"disxclubxdiv",foreignKey: 'disxclubxdivId'})
RelPosXUsuarioXDivXDep.belongsTo(DisciplinaXClubXPos,{as:"disciplinaxclubxpos", foreignKey: 'disciplinaxclubxposId'})






module.exports = RelPosXUsuarioXDivXDep;