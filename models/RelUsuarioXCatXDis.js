const Sequelize = require('sequelize');
const db = require('../config/db');
const RelDisXClubXCat = require('./RelDisXClubXCat')
const ClubXUsuario = require('../models/ClubXUsuario');
const ClubXusuario = require('../models/ClubXUsuario');

const RelUsuarioXCatXDis = db.define('relusuarioxcatxdis', {
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


RelUsuarioXCatXDis.belongsTo(RelDisXClubXCat,{as:"disxclubxcat",foreignKey: 'disxclubxcatId'})
RelUsuarioXCatXDis.belongsTo(ClubXusuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})






module.exports = RelUsuarioXCatXDis;