const EventoModel = require("../models/EventoModel");

// GET
function index(req, res) {
    const eventos = EventoModel.listarTodos();
    res.json(eventos);
}

// GET - Buscar por ID
function show(req, res) {
    const id = parseInt(req.params.id);
    const evento = EventoModel.buscarPorId(id);

    if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.json(evento);
}

// POST - Criar
function store(req, res) {
    const { nome, descricao, data, local, capacidade } = req.body;

    // Validação melhorada
    // Nome.trim => remove espaços em branco no início e no final, garantindo que o nome não seja apenas espaços.
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome inválido. Deve conter pelo menos uma letra." });
    }

    if (!data) {
        return res.status(400).json({ erro: "Data é obrigatória." });
    }

    if (capacidade !== undefined && (capacidade < 0)) {
        return res.status(400).json({ erro: "Capacidade deve ser um número não-negativo." });
    }

    const novoEvento = EventoModel.criar({
        nome,
        descricao,
        data,
        local,
        capacidade,
    });

    res.status(201).json(novoEvento);
}

// PUT - Atualizar
function update(req, res) {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoModel.atualizar(id, req.body);

    if (!eventoAtualizado) {
        return res.status(404).json({ erro: "Evento não encontrado" });

    }

    res.json(eventoAtualizado);
}

// DELETE - Deletar
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const deletado = EventoModel.deletar(id);

    if (!deletado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.status(204).send();
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};