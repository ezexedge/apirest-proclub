const Sequelize = require('sequelize');
const Provincia = require('../models/Provincia')
const Pais = require('../models/Pais')
const db = require('../config/db');

const Direccion = db.define('direccion', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    calle: Sequelize.STRING,
    numero: Sequelize.INTEGER,
    localidad: Sequelize.STRING,

    
});


Direccion.belongsTo(Provincia,{as:"provincia",foreignKey: 'provinciaId'})


module.exports = Direccion;