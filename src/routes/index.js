const express = require('express');

const homeController = require("../controllers/homeController");

const dashboardController = require("../controllers/dashboardController");

const psicologosController = require("../controllers/psicologosController");
const psicologosValidator = require("../validations/Psicologos/psicologosValidator");

const pacientesController = require("../controllers/pacientesController");
const pacientesValidator = require('../validations/Pacientes/pacientesValidator');

const atendimentosController = require("../controllers/atendimentosController");
const atendimentosValidator = require("../validations/Atendimentos/atendimentosValidator");

const loginController = require("../controllers/loginController");
const loginValidator = require('../validations/Login/loginValidator');
const loginHandler = require("../middlewares/loginHandler");

const routes = express.Router();

/*
    -  ROTA DA DASHBOARD
        -> GET /dashboard
*/

routes.get("/dashboard", dashboardController.counterInformation);

/*
    -  ROTA DA PAGINA INICIAL
        -> GET /
*/

routes.get("/", homeController.welcomeIndex);

/*
    -  ROTA DE AUTENTICAÇAO
        -> POST /login
*/

routes.post("/login", loginValidator, loginController.loginPsicologo);

/*
    - ROTAS DOS ATENDIMENTOS
        -> GET  /atendimentos
        -> GET  /atendimentos/:id
        -> POST /atendimentos
*/

routes.get("/atendimentos", loginHandler, atendimentosController.listAllAtendimentos);
routes.get("/atendimentos/:id", loginHandler, atendimentosController.atendimentosById);
routes.post("/atendimentos", loginHandler, atendimentosValidator, atendimentosController.cadastrarAtendimentos);

/*
    - ROTAS DOS PSICÓLOGOS
        -> GET    /psicologos
        -> GET    /psicologos/:id
        -> POST   /psicologos
        -> PUT    /psicologos/:id
        -> DELETE /psicologos/:id
*/

routes.get("/psicologos", loginHandler, psicologosController.listAllPsicologos);
routes.get("/psicologos/:id", loginHandler, psicologosController.psicologosById);
routes.post("/psicologos", psicologosValidator, psicologosController.cadastrarPsicologos);
routes.put("/psicologos/:id", loginHandler, psicologosValidator, psicologosController.atualizarPsicologos);
routes.delete("/psicologos/:id", loginHandler, psicologosController.deletarPsicologos);

/*
    - ROTAS DOS PACIENTES
        -> GET    /pacientes
        -> GET    /pacientes/:id
        -> POST   /pacientes
        -> PUT    /pacientes/:id
        -> DELETE /pacientes/:id
*/

routes.get("/pacientes", loginHandler, pacientesController.listAllPacientes);
routes.get("/pacientes/:id", loginHandler, pacientesController.pacientesById);
routes.post("/pacientes", loginHandler, pacientesValidator, pacientesController.cadastrarPacientes);
routes.put("/pacientes/:id", loginHandler, pacientesValidator, pacientesController.atualizarPacientes);
routes.delete("/pacientes/:id", loginHandler, pacientesController.deletarPacientes);

module.exports = routes;
