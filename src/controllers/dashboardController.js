const { Pacientes, Atendimentos, Psicologos }  = require("../models");

const dashboardController = {

    counterInformation: async (req, res) => {
        try {
            const resultCounterPacientes = await Pacientes.count();
            const resultCounterPsicologos = await Psicologos.count();
            const resultCounterAtendimentos = await Atendimentos.count();
            const resultCounterMediaAtendimentos = (await Atendimentos.count() / resultCounterPsicologos);

            res.status(200).send(`Número de Pacientes cadastrados: ${resultCounterPacientes}<br>Número de Psicólogos cadastrados: ${resultCounterPsicologos}<br>Número de Atendimentos cadastrados: ${resultCounterAtendimentos}<br>Média de Atendimentos por Psicólogo: ${resultCounterMediaAtendimentos}`);
        }
        catch { res.status(400); }
    },
};

module.exports = dashboardController;