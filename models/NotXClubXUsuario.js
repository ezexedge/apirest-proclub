const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');
const Club = require('../models/Club')
const ClubXUsuario = require('../models/ClubXUsuario')

const NotXClubXUsuario = db.define('notxclubxusuario', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    visto: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});


NotXClubXUsuario.belongsTo(Club,{as:"club",foreignKey: 'notificacionxclubId'})
NotXClubXUsuario.belongsTo(ClubXUsuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})


module.exports = NotXClubXUsuario;