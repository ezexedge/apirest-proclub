const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('../models/Usuario')
const Espacio = require('../models/Espacio')


const Ingreso = db.define('ingreso', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fecha: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    hora:{
        type: Sequelize.TIME
    }


    
});
//prueba

Ingreso.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})

Ingreso.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})





module.exports = Ingreso;