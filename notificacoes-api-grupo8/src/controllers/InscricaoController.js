const InscricaoModel = require("../models/InscricaoModel");

// POST /inscricoes — criar uma inscrição
function store(req, res) {
    const { eventoId, participanteId } = req.body || {};

    if (!eventoId || !participanteId) {
        return res
            .status(400)
            .json({ erro: "eventoId e participanteId são obrigatórios" });
    }

    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId),
    );

    // Se o resultado tem a propriedade "erro", algo deu errado
    if (resultado.erro) {
        return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
}

// GET /inscricoes/ — listar todas as inscrições
function index(req, res) {
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
}

// GET /inscricoes/evento/:eventoId - Listar inscricoes de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);

    if (!inscricoes || inscricoes.length === 0) {
        return res.status(404).json({ erro: "Nenhuma inscrição encontrada para esse evento" });
    }

    res.json(inscricoes);
}

// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);

    const cancelado = InscricaoModel.cancelar(id);

    if (!cancelado) {
        return res.status(404).json({ erro: "Não foi possível cancelar a inscrição" });
    }

    res.status(200).json(cancelado);
}

// GET /inscricoes/:id/detalhes - buscar detalhes de uma inscrição
function detalhes(req, res) {
    const id = parseInt(req.params.id);

    const detalhes = InscricaoModel.buscarComDetalhes(id);
    if (!detalhes) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    res.json(detalhes);
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
    detalhes
};