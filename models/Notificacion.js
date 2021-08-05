const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const db = require('../config/db');

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
        type: Sequelize.STRING
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }
});



module.exports = Notificacion;