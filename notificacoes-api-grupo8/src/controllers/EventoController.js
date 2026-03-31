const {
    isRequired,
    isPositiveInteger,
    minLength,
    validar,
} = require("../helpers/validators");
const EventoModel = require("../models/EventoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
function index(req, res, next) {
    try {
        const eventos = EventoModel.listarTodos();
        res.json(eventos);
    } catch (erro) {
        next(erro);
    }
}

// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = EventoModel.buscarPorId(id);
        if (!evento) {
            throw new NotFoundError("Evento");
        }
        res.json(evento);
    } catch (erro) {
        next(erro);
    }
}

// POST (criar) - Requisição refatorada, usando next, try e catch
function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;

        //Valida os dados de entrada 
        const erros = validar([
            isRequired(nome, "Nome"),
            isRequired(data, "Data"),
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        // // Validação melhorada (inutilizada)
        // // Nome.trim => remove espaços em branco no início e no final, garantindo que o nome não seja apenas espaços.
        // if (!nome || nome.trim() === "" || !data) {
        //     throw new ValidationError("Nome e data são obrigatórios");
        // }

        // if (capacidade !== undefined && (capacidade < 0)) {
        //     throw new ValidationError("Capacidade deve ser um número válido");
        // }

        const novoEvento = EventoModel.criar({
            nome,
            descricao,
            data,
            local,
            capacidade,
        });

        res.status(201).json(novoEvento);
    } catch (erro) {
        next(erro);
    }
}

// PUT - Atualizar
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { nome, capacidade } = req.body;
        const erros = validar([
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const eventoAtualizado = EventoModel.atualizar(id, req.body);
        if (!eventoAtualizado) {
            throw new NotFoundError("Evento");
        }

        res.json(eventoAtualizado);
    } catch (erro) {
        next(erro);
    }
}

// DELETE - Deletar
function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = EventoModel.deletar(id);

        if (!deletado) {
            throw new NotFoundError("Evento");
        }

        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
