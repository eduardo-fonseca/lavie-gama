const express = require("express");
const routes = require("./routes");
const dbConnection = require("./database");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

dbConnection.sync();
dbConnection.hasConnection();

app.use(express.json());
app.use(routes);
app.use(errorHandler);


app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor executado na porta 3000.');
})