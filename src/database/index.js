/*
    HEROKU DATABASE MANAGEMENT

    -> heroku create lavie-gama
    -> heroku addons:create cleardb:ignite
    -> heroku config
*/

const Sequelize = require("sequelize");

const DB_NAME = "heroku_c94f2f0510a6f3e";
const DB_USER = "b6c34e3baad797";
const DB_PASS = "57cb08d6";
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