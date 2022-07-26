const { Psicologos }  = require("../models");
const bcrypt = require("bcryptjs");

const psicologosController = {

    listAllPsicologos: async (req, res) => {
        const listaDePsicologos = await Psicologos.findAll();

        res.status(200).json(listaDePsicologos);
    },

    psicologosById: async (req, res) => {
        const { id } = req.params;

        const listaDePsicologos = await Psicologos.findByPk(id);

        return (!listaDePsicologos) ? res.status(404).json("ID não encontrado. Verifique seus dados.") : res.status(200).json(listaDePsicologos);
    },

    async cadastrarPsicologos (req, res) {
        const { nome, email, senha, apresentacao } = req.body;
        const encryptedPassword = bcrypt.hashSync(senha);

        const novoPsicologo = await Psicologos.create(
            { nome, email, senha: encryptedPassword, apresentacao }
        );

        res.status(201).json(novoPsicologo);
    },

    async atualizarPsicologos (req, res) {
        const { id } = req.params;
        const { nome, email, senha, apresentacao } = req.body;

        const psicologoAtualizado = await Psicologos.update(
            { nome, email, senha, apresentacao },
            { where: { id } }
        );

        if (psicologoAtualizado == 0) { return res.status(400).json("ID não encontrado. Verifique seus dados.") }
        else {
            const psicologoData = await Psicologos.findByPk(id);
            res.status(200).json(psicologoData);
        }
    },

    async deletarPsicologos (req, res) {
        const { id } = req.params;

        const psicologoDeletado = await Psicologos.destroy(
            { where: { id } }
        );

        return (!psicologoDeletado) ? res.status(404).json("ID não encontrado. Verifique seus dados.") : res.status(204).json(psicologoDeletado);
    }
};

module.exports = psicologosController;