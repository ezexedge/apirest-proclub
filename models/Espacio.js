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

        allowNull: false
    },
    maxReservasMes:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    maxReservasSem:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    maxReservasAno:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    intervaloEntreTurnos : {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

        allowNull: false

    },
    image: Sequelize.STRING,
    tiempoDeAnticipacion: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',
        allowNull: false
    },
    DuracionDeTurnos: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00',

        allowNull: false
    },
    valor:  {
        type: Sequelize.INTEGER,
        defaultValue: 0,

        allowNull: false
    },
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }

    
});

Espacio.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
Espacio.belongsTo(EstadoEspacio,{as:"estadoespacio",foreignKey: 'estadoespacioId'})



module.exports = Espacio;