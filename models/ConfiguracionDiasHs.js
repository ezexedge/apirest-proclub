const Sequelize = require('sequelize');
const Espacio = require('../models/Espacio')
const db = require('../config/db');

const ConfiguracionDiasHs = db.define('configuraciondiashs', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    pertenece: Sequelize.STRING,
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
    desde:{
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    hasta : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    }
    
});


ConfiguracionDiasHs.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})


module.exports = ConfiguracionDiasHs