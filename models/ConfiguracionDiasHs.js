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
    lunesDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    lunesHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    martes:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    martesDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    mastesHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    miercoles:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    miercolesDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    miercolesHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    jueves:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    juevesDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    juevesHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    viernes:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    viernesDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    viernesHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    sabado:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    sabadoDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    sabadoHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    domingo:{
        type: Sequelize.INTEGER,
        defaultValue: 1,

    },
    domingoDesde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    domingoHasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

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