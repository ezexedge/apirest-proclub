const Sequelize = require('sequelize');
const Pais = require('./Pais')
const db = require('../config/db');

const Provincia = db.define('provincia', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: Sequelize.STRING

    
});



Provincia.belongsTo(Pais,{as:"country",foreignKey: 'countryId'})




module.exports = Provincia;