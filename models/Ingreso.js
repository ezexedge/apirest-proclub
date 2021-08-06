const Sequelize = require('sequelize');
const db = require('../config/db');
const Reservas = require('../models/Reservas')
const Usuario = require('../models/Usuario')

const Ingreso = db.define('ingreso', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }


    
});


Ingreso.belongsTo(Reservas,{as:"reserva",foreignKey: 'reservaId'})

Ingreso.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})





module.exports = Ingreso;