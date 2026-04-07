// Módulos internos do projeto
const EventoService = require("../services/EventoService");
const parseId = require("../helpers/parseId")

function index(req, res, next) {
    try {
        const eventos = EventoService.listarTodos();
        res.json(eventos);
    } catch (erro) {
        console.error("Erro ao listar os eventos:", erro.message)
        next(erro);
    }
}


function show(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const evento = EventoService.buscarPorId(id);
        res.json(evento);
    } catch (erro) {
        console.error(`Erro ao buscar evento com id ${req.params.id}:`, erro.message)
        next(erro);
    }
}


function store(req, res, next) {
    try {
        const novoEvento = EventoService.criar(req.body);
        res.status(201).json(novoEvento);
    } catch (erro) {
        console.error("Erro ao criar novo evento:", erro.message)
        next(erro);
    }
}


function update(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const eventoAtualizado = EventoService.atualizar(id, req.body);
        res.json(eventoAtualizado);
    } catch (erro) {
        console.error(`Erro ao atualizar o evento com id ${req.params.id}:`, erro.message)
        next(erro);
    }
}


function destroy(req, res, next) {
    try {
        const id = parseId(req.params.id);
        EventoService.deletar(id);
        res.status(204).send();
    } catch (erro) {
        console.log(`Erro ao deletar evento com id ${req.params.id}:`, erro.message)
        next(erro);
    }
}


module.exports = { index, show, store, update, destroy };