const Sequelize = require('sequelize');
const Espacio = require('../models/Espacio')
const db = require('../config/db');

const ConfiguracionDiasHs = db.define('configuraciondiashs', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    lunes:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    martes:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    miercoles:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    jueves:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    viernes:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    sabado:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    domingo:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    multiplesReservasEnUnHorario: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    LimitarAUnSoloEventoAprobado:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    ProhibirMasDeUnaReservaPendiente: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    ReservaAmpliada:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
    
});


ConfiguracionDiasHs.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})


module.exports = ConfiguracionDiasHs