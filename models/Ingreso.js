const Sequelize = require('sequelize');
const db = require('../config/db');
const Reservas = require('../models/Reservas')

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





module.exports = Ingreso;