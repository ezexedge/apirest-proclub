const Sequelize = require('sequelize');
const db = require('../config/db');
const Notificacion = require('../models/Notificacion')
const Tematica = require('../models/Tematica')

const NotificacionXTematica = db.define('notificacionxtematica', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
});




NotificacionXTematica.belongsTo(Tematica,{as:"tematica",foreignKey: 'tematicaId'})
NotificacionXTematica.belongsTo(Notificacion,{as:"notificacion",foreignKey: 'notificacionId'})





module.exports = NotificacionXTematica;