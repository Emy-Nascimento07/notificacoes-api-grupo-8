const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar, isPositiveInteger } = require("../helpers/validators");

function listarTodas() {
    return InscricaoModel.listarTodas();
}

function listarPorEvento(eventoId) {
    const evento = EventoModel.buscarPorId(eventoId);

    if (!evento) {
        throw new NotFoundError("Evento");
    }

    return InscricaoModel.listarPorEvento(eventoId);
}

function criar(eventoId, participanteId) {
    // 1. Validar se o evento existe
    const evento = EventoModel.buscarPorId(eventoId);
    if (!evento) {
        throw new NotFoundError("Evento");
    }

    // 2. Validar se o participante existe
    const participante = ParticipanteModel.buscarPorId(participanteId);
    if (!participante) {
        throw new NotFoundError("Participante");
    }

    // 3. Verificar duplicata (Regra de dados: mantida no Model)
    const jaInscrito = InscricaoModel.listarPorEvento(eventoId).find(
        (i) => i.participanteId === participanteId
    );

    if (jaInscrito) {
        throw new ValidationError("Participante já inscrito neste evento");
    }

    // 4. Criação da inscrição via Model
    return InscricaoModel.criar(eventoId, participanteId);
}

function cancelar(id) {
    const cancelado = InscricaoModel.cancelar(id)

    if (!cancelado) {
        throw new NotFoundError("Inscrição")
    }

    return true
}


function buscarComDetalhes(id) {
    const inscricao = InscricaoModel.buscarPorId(id);

    if (!inscricao) {
        throw new NotFoundError("Inscrição");
    }

    const evento = EventoModel.buscarPorId(inscricao.eventoId);
    const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

    return {
        ...inscricao,
        evento,
        participante,
    };
}

module.exports = {
listarTodas,
listarPorEvento,
buscarComDetalhes,
criar,
cancelar,
};