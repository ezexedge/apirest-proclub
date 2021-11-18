const Sequelize = require('sequelize');
const db = require('../config/db');

const InfoUtil = db.define('infoutil', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    titulo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING(1234) 
    }
    ,

    pathImage: Sequelize.STRING,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    },
    pertenece_superadmin:{
        type: Sequelize.INTEGER
    },
    created:{
        type: Sequelize.DATE
        }
});


module.exports = InfoUtil;