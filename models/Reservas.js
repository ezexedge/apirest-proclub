const Sequelize = require('sequelize');
const db = require('../config/db');
const Turno = require('../models/Turno')
const Usuario =  require('../models/Usuario')
const EstadoReserva = require('../models/EstadoReserva')
const Espacio = require('../models/Espacio')

const Reserva = db.define('reserva', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    fechaFin: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    },

    desde: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    hasta: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    nombre: Sequelize.STRING


    
});


Reserva.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
Reserva.belongsTo(EstadoReserva,{as:"estadoreserva",foreignKey: 'estadoreservaId'})
Reserva.belongsTo(Espacio,{as:"espacio",foreignKey: 'espacioId'})





module.exports = Reserva;