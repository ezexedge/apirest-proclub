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

        allowNull: false
    },
    maxReservasMes:  {
        type: Sequelize.INTEGER,

        allowNull: false
    },
    maxReservasSem:  {
        type: Sequelize.INTEGER,

        allowNull: false
    },
    maxReservasAno:  {
        type: Sequelize.INTEGER,

        allowNull: false
    },
    intervaloEntreTurnos : {
        type: Sequelize.TIME,

        allowNull: false

    },
    image: Sequelize.STRING,
    tiempoDeAnticipacion: {
        type: Sequelize.TIME,

        allowNull: false
    },
    DuracionDeTurnos: {
        type: Sequelize.TIME,

        allowNull: false
    },
    valor: Sequelize.INTEGER,
    activo:{
        type: Sequelize.INTEGER,   
        defaultValue: 1
    }

    
});

Espacio.belongsTo(Club,{as:"club",foreignKey: 'clubId'})
Espacio.belongsTo(EstadoEspacio,{as:"estadoespacio",foreignKey: 'estadoespacioId'})



module.exports = Espacio;