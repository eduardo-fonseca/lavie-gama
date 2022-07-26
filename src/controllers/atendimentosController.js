const { Atendimentos, Pacientes, Psicologos } = require("../models");
const { helperFunctions } = require("../helper");

const atendimentosController = {

    listAllAtendimentos: async (req, res) => {
        const listaDeAtendimentos = await Atendimentos.findAll({
            include:
                [{ model: Psicologos, attributes: ['nome', 'email', 'apresentacao'] },
                { model: Pacientes, attributes: ['nome', 'email'] }]
            });

        res.status(200).json(listaDeAtendimentos);
    },

    atendimentosById: async (req, res) => {
        const { id } = req.params;
        const listaDeAtendimentos = await Atendimentos.findByPk(id, {
            include: 
                [{ model: Psicologos, attributes: ['nome', 'email', 'apresentacao'] },
                { model: Pacientes, attributes: ['nome', 'email'] }]
        });

        return (!listaDeAtendimentos) ? res.status(404).json("ID não encontrado. Verifique seus dados.") : res.status(200).json(listaDeAtendimentos);
    },

    async cadastrarAtendimentos (req, res) {
        try {
            const { paciente_id, data_atendimento, observacao } = req.body;
            const dataAtendimentoParsed = helperFunctions.parseDate(data_atendimento);
            const psicologo_id = req.auth.id;

            const novoAtendimento = await Atendimentos.create(
                { paciente_id, data_atendimento: dataAtendimentoParsed, observacao, psicologo_id }
            );

            return (!novoAtendimento) ? res.status(400).json(novoAtendimento) : res.status(201).json(novoAtendimento);
        }
        catch { return res.status(400).json("Verifique os dados informados e tente novamente."); }
    }
};

module.exports = atendimentosController;