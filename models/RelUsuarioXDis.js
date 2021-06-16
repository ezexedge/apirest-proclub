const Sequelize = require('sequelize');
const RelDisciplinaXClub = require('./RelDisciplinaXClub')
const ClubXUsuario = require('./ClubXUsuario')
const db = require('../config/db');


const RelUsuarioXDis = db.define('relusuarioxdis', {
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




RelUsuarioXDis.belongsTo(RelDisciplinaXClub,{as:"disciplinaxclub",foreignKey: 'disciplinaxclubId'})
RelUsuarioXDis.belongsTo(ClubXUsuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})











module.exports = RelUsuarioXDis;