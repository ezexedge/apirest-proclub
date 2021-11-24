const Sequelize = require('sequelize');
const Rubro = require('./Rubro')
const Beneficios = require('./Beneficios')

const db = require('../config/db');
const Club = require('./Club');


const RubroXBeneficio = db.define('rubroxbeneficio', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true

    },
    pertenece_superadmin:{
        type: Sequelize.INTEGER
    }
     
});




RubroXBeneficio.belongsTo(Rubro,{as:"rubro",foreignKey: 'rubroId'})

RubroXBeneficio.belongsTo(Beneficios,{as:"beneficio",foreignKey: 'beneficioId'})

RubroXBeneficio.belongsTo(Club,{as:"club",foreignKey: 'clubId'})












module.exports = RubroXBeneficio;