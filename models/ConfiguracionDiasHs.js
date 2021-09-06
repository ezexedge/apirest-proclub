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
        defaultValue: 0,

        allowNull: false
    },
    martes:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    miercoles:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    jueves:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    viernes:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    sabado:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    domingo:{
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    desde: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

        allowNull: false
    },
    hasta: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

        allowNull: false
    },

    
});


ConfiguracionDiasHs.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})


module.exports = ConfiguracionDiasHs