const Sequelize = require('sequelize');
const db = require('../config/db');
const Notificacion = require('../models/Notificacion')
const Usuario = require('../models/Usuario')

const NotificacionVistasXUsuarios = db.define('notificacionvistasxusuarios', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
});


NotificacionVistasXUsuarios.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
NotificacionVistasXUsuarios.belongsTo(Notificacion,{as:"notificacion",foreignKey: 'notificacionId'})

module.exports = NotificacionVistasXUsuarios