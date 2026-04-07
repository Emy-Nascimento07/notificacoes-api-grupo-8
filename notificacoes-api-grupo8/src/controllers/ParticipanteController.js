// Módulos internos do projeto
const ParticipanteService = require("../services/ParticipanteService");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, isEmail, minLength, validar } = require("../helpers/validators");
const parseId = require("../helpers/parseId")


// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
    try {
        const participantes = ParticipanteService.listarTodos();
        res.json(participantes);
    } catch (erro) {
        console.log(`Erro ao listar participantes: ${erro.message}`);
        next(erro);
    }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function show(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const participante = ParticipanteService.buscarPorId(id);
        res.json(participante);
    } catch (erro) {
        console.log(`Erro ao buscar participante: ${erro.message}`);
        next(erro)
    }
}

// POST (criar) - Requisição refatorada, usando next, try e catch
function store(req, res, next) {
    try {
        const { nome, email } = req.body;
        const novoParticipante = ParticipanteService.criar({
        nome,
        email,
        });

        res.status(201).json(novoParticipante);
    } catch (erro) {
        console.log(`Erro ao criar participante: ${erro.message}`);
        next(erro)
    }
}

// PUT (atualizar) - Requisição refatorada, usando next, try e catch
function update(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const participanteAtualizado = ParticipanteService.atualizar(id, req.body);
        res.json(participanteAtualizado);
    } catch (erro) {
        console.log(`Erro ao atualizar participante: ${erro.message}`);
        next(erro)
    }
}


// DELETE (deletar) - Requisição refatorada, usando next, try e catch

function destroy(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const deletado = ParticipanteService.deletar(id);
        
        res.status(204).send();
    } catch (erro) {
        console.log(`Erro ao deletar participante: ${erro.message}`);
        next(erro)
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};