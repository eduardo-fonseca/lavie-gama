const dbConnection = require("../database");
const { DataTypes } = require("sequelize");

const Pacientes = dbConnection.define(
    "Pacientes",
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    idade: {
        type: DataTypes.DATE
    },
    
    createdAt: {
        type: DataTypes.DATE
    }, 

    updatedAt: {
        type: DataTypes.DATE
    }
}, 
{ tableName: "pacientes" }
);


module.exports = Pacientes;