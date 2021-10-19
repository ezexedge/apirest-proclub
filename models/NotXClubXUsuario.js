const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');
const NotificacionXClub = require('../models/NotificacionXClub')
const ClubXUsuario = require('../models/ClubXUsuario')
const Usuario = require('../models/Usuario')
const EstadoNotificacion = require('../models/EstadoNotificacion')


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


NotXClubXUsuario.belongsTo(NotificacionXClub,{as:"club",foreignKey: 'notificacionxclubId'})
NotXClubXUsuario.belongsTo(ClubXUsuario,{as:"clubxusuario",foreignKey: 'clubxusuarioId'})
NotXClubXUsuario.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
NotXClubXUsuario.belongsTo(EstadoNotificacion,{as:"estadonotificacion",foreignKey: 'estadonotificacionId'})


module.exports = NotXClubXUsuario;