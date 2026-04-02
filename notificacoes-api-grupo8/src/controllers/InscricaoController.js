//Modifica para que os erros sejam lançados diretamente
const InscricaoService = require("../services/InscricaoService");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;
    const novaInscricao = InscricaoService.criar(eventoId, participanteId);
    res.status(201).json(novaInscricao);
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
  try {
    const inscricoes = InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoService.listarPorEvento(eventoId);

    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// PATCH (atualizar parcialmente) -  Requisição refatorada, usando next, try e catch
function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    InscricaoService.cancelar(id);

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

// GET (buscar detalhes de uma inscrição) - Requisição refatorada, usando next, try e catch
function detalhes(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const detalhes = InscricaoService.buscarComDetalhes(id);

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
