//Modifica para que os erros sejam lançados diretamente
const InscricaoModel = require("../models/InscricaoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body || {};

    if (!eventoId || !participanteId) {
      throw new ValidationError(
        "ID do evento e do participante são obrigatórios",
      );
    }

    const novaInscricao = InscricaoModel.criar({
      eventoId,
      participanteId,
    });

    res.status(201).json(novaInscricao);
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
  try {
    const inscricoes = InscricaoModel.listarTodas();

    if (inscricoes.length === 0) {
      throw new NotFoundError("Não existem inscrições");
    }
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);

    if (!inscricoes || inscricoes.length === 0) {
      throw new NotFoundError("Nenhuma inscrição para esse evento encontrada");
    }

    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// PATCH (atualizar parcialmente) -  Requisição refatorada, usando next, try e catch
function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const cancelado = InscricaoModel.cancelar(id);

    if (!cancelado) {
      throw new NotFoundError("Inscrição");
    }

    res.json(cancelado);
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar detalhes de uma inscrição) - Requisição refatorada, usando next, try e catch
function detalhes(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const detalhes = InscricaoModel.buscarComDetalhes(id);

    if (!detalhes) {
      throw new NotFoundError("Inscrições");
    }

    res.json(detalhes);
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  store,
  index,
  listarPorEvento,
  cancelar,
  detalhes,
};
