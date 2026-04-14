function listarTodos() {
    return participantes;
}

function buscarPorId(id) {
    return participantes.find((participante) => participante.id === id);
}

function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        nome: dados.nome,
        email: dados.email
    };
    proximoId++;
    participantes.push(novoParticipante);
    return novoParticipante;
}

function atualizar(id, dados) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return null;

    participantes[index] = {
        ...participantes[index], // Mantém os dados antigos
        ...dados, // Sobreescreve com os novos
        id: id, // Garante que o id não mude
    };

    return participantes[index];
}

function deletar(id) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return false;

    participantes.splice(index, 1);
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};