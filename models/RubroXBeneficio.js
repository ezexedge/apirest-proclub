const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const Beneficios = require('./Beneficios')

const db = require('../config/db');


const RubroXBeneficio = db.define('rubroxbeneficio', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    }
});




RubroXBeneficio.belongsTo(Rubro,{as:"rubro",foreignKey: 'rubroId'})

RubroXBeneficio.belongsTo(Beneficios,{as:"beneficio",foreignKey: 'beneficioId'})












module.exports = RubroXBeneficio;