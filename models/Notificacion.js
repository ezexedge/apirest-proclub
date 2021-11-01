const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const Rol =  require('./rol')
const db = require('../config/db');
const moment = require('moment')




const Notificacion = db.define('notificacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    descripcion_corta: {
        type: Sequelize.STRING
    }
    ,
    fecha: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    hora:{
        type: Sequelize.TIME
    }
    ,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});




Notificacion.belongsTo(Rol,{as:"rol",foreignKey: 'rolId'})


module.exports = Notificacion;

