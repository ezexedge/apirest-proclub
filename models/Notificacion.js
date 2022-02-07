const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const Usuario =  require('./Usuario')
const db = require('../config/db');
const moment = require('moment')




const Notificacion = db.define('notificacion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: {
        type: Sequelize.VARCHAR(40000)
    },
    descripcion: {
        type: Sequelize.VARCHAR(40000)
    },
    descripcion_corta: {
        type: Sequelize.VARCHAR(40000)
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




Notificacion.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})


module.exports = Notificacion;

