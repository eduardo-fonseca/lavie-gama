const { Psicologos } = require("../models");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../configs/jwtSecret");
const bcrypt = require("bcryptjs");

const loginController = {

    async loginPsicologo (req, res) {
        const { email, senha } = req.body;

        const userData = await Psicologos.findOne({
            where: { email }
        });

        if (!userData || !bcrypt.compareSync(senha, userData.senha))
            return res.status(400).json("E-mail ou senha inválido, verifique seus dados e tente novamente.");

        const jwtToken = jwt.sign({
            id: userData.id,
            email: userData.email,
            nome: userData.nome
        }, jwtSecret.key);

        return res.json(jwtToken);
    }

};

module.exports = loginController;