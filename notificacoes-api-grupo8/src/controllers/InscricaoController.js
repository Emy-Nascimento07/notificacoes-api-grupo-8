// Modificação para que os erros sejam lançados diretamente
// Módulos internos do projeto
const parseId = require("../helpers/parseId")
const InscricaoService = require("../services/InscricaoService");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;
    const novaInscricao = InscricaoService.criar(eventoId, participanteId);
    res.status(201).json(novaInscricao);
  } catch (erro) {
    console.error("Erro ao criar a inscrição:", erro.message);
    throw erro;
  }
}

// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
  try {
    const inscricoes = InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    console.error("Erro ao buscar todas as inscrição:", erro.message);
    throw erro;
  }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseId(req.params.eventoId);
    const inscricoes = InscricaoService.listarPorEvento(eventoId);

    res.json(inscricoes);
  } catch (erro) {
    console.error("Erro ao buscar inscrição pelo id:", erro.message);
    throw erro;
  }
}

// PATCH (atualizar parcialmente) -  Requisição refatorada, usando next, try e catch
function cancelar(req, res, next) {
  try {
    const id = parseId(req.params.id);
    InscricaoService.cancelar(id);

    res.status(204).send();
  } catch (erro) {
    console.error("Erro ao atualizar parcialmente a inscrição:", erro.message);
    throw erro;
  }
}

// GET (buscar detalhes de uma inscrição) - Requisição refatorada, usando next, try e catch
function detalhes(req, res, next) {
  try {
    const id = parseId(req.params.id);
    const detalhes = InscricaoService.buscarComDetalhes(id);

    res.json(detalhes);
  } catch (erro) {
    console.error("Erro ao buscar detalhes da inscrição:", erro.message);
    throw erro;
  }
}

module.exports = {
  store,
  index,
  listarPorEvento,
  cancelar,
  detalhes,
};
