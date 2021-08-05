const Sequelize = require('sequelize');
const db = require('../config/db');
const Turno = require('../models/Turno')
const Usuario =  require('../models/Usuario')
const EstadoReserva = require('../models/EstadoReserva')

const Reserva = db.define('reserva', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    },
    qr:{
        type: Sequelize.STRING
    }


    
});


Reserva.belongsTo(Turno,{as:"turno",foreignKey: 'turnoId'})
Reserva.belongsTo(Usuario,{as:"usuario",foreignKey: 'usuarioId'})
Reserva.belongsTo(EstadoReserva,{as:"estadoreserva",foreignKey: 'estadoreservaId'})





module.exports = Reserva;