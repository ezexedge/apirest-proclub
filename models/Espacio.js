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
    maxReservasDia:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    maxReservasMes:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

    },
    maxReservasSem:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

    },
    maxReservasAno:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

    },
    intervaloEntreTurnos : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',


    },
    image: Sequelize.STRING,
    tiempoDeAnticipacion: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',
    },
    DuracionDeTurnos: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

    },
    valor:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    },
    visibilidad:{
        type: Sequelize.BOOLEAN
    }

    
});

Espacio.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
Espacio.belongsTo(EstadoEspacio,{as:"estadoespacio",foreignKey: 'estadoespacioId'})



module.exports = Espacio;