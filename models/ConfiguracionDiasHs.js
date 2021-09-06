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
        allowNull: false
    },
    martes:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    miercoles:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    jueves:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    viernes:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sabado:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    domingo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    desde: {
        type: Sequelize.TIME,

        allowNull: false
    },
    hasta: {
        type: Sequelize.TIME,

        allowNull: false
    },

    
});


ConfiguracionDiasHs.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})


module.exports = ConfiguracionDiasHs