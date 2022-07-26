const { Pacientes }  = require("../models");
const { helperFunctions } = require("../helper");

const pacientesController = {

    listAllPacientes: async (req, res) => {
        const listaDePacientes = await Pacientes.findAll();

        res.status(200).json(listaDePacientes);
    },

    pacientesById: async (req, res) => {
        const { id } = req.params;
        const listaDePacientes = await Pacientes.findByPk(id);

        return (!listaDePacientes) ? res.status(404).json("ID não encontrado. Verifique seus dados.") : res.status(200).json(listaDePacientes);
    },

    async cadastrarPacientes (req, res) {
        try {
            const { nome, email, idade } = req.body;
            const idadeParsed = helperFunctions.parseDate(idade);

            const novoPaciente = await Pacientes.create(
                { nome, email, idade: idadeParsed }
            );

            return (!novoPaciente) ? res.status(400).json(novoPaciente) : res.status(201).json(novoPaciente);
        }
        catch { return res.status(400).json("Verifique os dados informados e tente novamente."); }
    },

    async atualizarPacientes (req, res) {
        try {
            const { id } = req.params;
            const { nome, email, idade } = req.body;
            const idadeParsed = helperFunctions.parseDate(idade);

            const pacienteAtualizado = await Pacientes.update(
                { nome, email, idade: idadeParsed },
                { where: { id } }
            );

            if (pacienteAtualizado == 0) { return res.status(400).json("ID não encontrado. Verifique seus dados.") }
            else {
                const pacienteData = await Pacientes.findByPk(id);
                res.status(200).json(pacienteData);
            }
        }
        catch { return res.status(400).json("Verifique os dados informados e tente novamente."); }
    },

    async deletarPacientes (req, res) {
        const { id } = req.params;

        const pacienteDeletado = await Pacientes.destroy(
            { where: { id } }
        );

        return (!pacienteDeletado) ? res.status(404).json("ID não encontrado. Verifique seus dados.") : res.status(204).json(pacienteDeletado);
    }
};

module.exports = pacientesController;