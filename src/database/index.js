/*
    HEROKU DATABASE MANAGEMENT

    -> heroku create lavie-gama
    -> heroku addons:create cleardb:ignite
    -> heroku config
*/

const Sequelize = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_CONFIG = {
    dialect: "mysql",
    host: "us-cdbr-east-06.cleardb.net",
};

let dbConnection = {};

try { dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG); }
catch (error) { console.error("Error ao conectar com o Banco de Dados!"); }

async function hasConnection() {
    try { await dbConnection.authenticate(); }
    catch (error) { console.error("Error ao tentar se conectar ao Banco de Dados!"); }
};

Object.assign(dbConnection, { hasConnection });

module.exports = dbConnection;