const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
    try {
        const participantes = ParticipanteModel.listarTodos();
        res.json(participantes);
    } catch (erro) {
        next(erro);
    }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = ParticipanteModel.buscarPorId(id);
        if (!participante) {
            throw new NotFoundError("Participante")
        }
        res.json(participante);
    } catch (erro) {
        next(erro)
    }
}

// POST (criar) - Requisição refatorada, usando next, try e catch
function store(req, res, next) {
    try {
        const { nome, email } = req.body;

        if (!nome || nome.trim() === "" || email.trim() === "") {
            throw new ValidationError("Nome e email são obrigatórios");
        }

        const novoParticipante = ParticipanteModel.criar({
            nome,
            email,
        });

        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro)
    }
}

// PUT (atualizar) - Requisição refatorada, usando next, try e catch
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

        if (!participanteAtualizado) {
            throw new NotFoundError("Participante");

        }
        res.json(participanteAtualizado);
    } catch (erro) {
        next(erro)
    }
}


// DELETE (deletar) - Requisição refatorada, usando next, try e catch

function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = ParticipanteModel.deletar(id);

        if (!deletado) {
            throw new NotFoundError("Participante")
        }

        res.status(204).send();
    } catch (erro) {
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