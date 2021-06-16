const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');
const Club = require('../models/Club')
const Notificacion = require('../models/Notificacion')
const Usuario = require('../models/Usuario')

const NotificacionXClub = db.define('notificacionxclub', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    creadorUsuarioId: Sequelize.INTEGER,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});


NotificacionXClub.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
NotificacionXClub.belongsTo(Notificacion,{as:"notificacion",foreignKey: 'notificacionId'})
//NotificacionXClub.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioCreadorId'})

module.exports = NotificacionXClub;