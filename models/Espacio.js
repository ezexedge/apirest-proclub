const Sequelize = require('sequelize');
const Club = require('./Club')
const db = require('../config/db');
const EstadoEspacio = require('./EstadoEspacio');

const Espacio = db.define('espacio', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    nombre: {
        type: Sequelize.STRING

    },
    descripcion: {
        type: Sequelize.STRING
    },
    maxReservasDia: Sequelize.INTEGER,
    maxReservasSem: Sequelize.INTEGER,
    maxReservasAno: Sequelize.INTEGER,
    horasPrevia: Sequelize.STRING,
    image: Sequelize.STRING,
    tiempoDeAnticipacion: Sequelize.STRING,
    tiempoDeCancelacion: Sequelize.STRING,
    valor: Sequelize.INTEGER,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }

    
});

Espacio.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
Espacio.belongsTo(EstadoEspacio,{as:"estadoespacio",foreignKey: 'estadoespacioId'})



module.exports = Espacio;