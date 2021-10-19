const Sequelize = require('sequelize');
const EstadoTurno = require('./EstadoTurno')
const db = require('../config/db');

const Turno = db.define('turno', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fecha: {
        type: Sequelize.STRING
    },
    horaDesde: {
        type: Sequelize.STRING
    }
    ,
    horaHasta: {
        type: Sequelize.STRING
    },
    precio : {

        type: Sequelize.INTEGER
    },

    cupo : {

        type: Sequelize.INTEGER
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }



});


Turno.belongsTo(EstadoTurno,{as:"estadoturno",foreignKey: 'estadoturnoId'})



module.exports = Turno;