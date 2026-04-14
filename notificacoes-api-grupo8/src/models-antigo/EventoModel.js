function listarTodos() {
  return eventos;
}

// Buscar evento pelo ID
function buscarPorId(id) {
  return eventos.find((evento) => evento.id === id);
}

// Criar novo evento
function criar(dados) {
  const novoEvento = {
    id: proximoId,
    nome: dados.nome,
    descricao: dados.descricao,
    data: dados.data,
    local: dados.local,
    capacidade: dados.capacidade,
  };
  proximoId++;
  eventos.push(novoEvento);
  return novoEvento;
}

// Atualizar evento existente
function atualizar(id, dados) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index === -1) return null;

  eventos[index] = {
    ...eventos[index], // Mantém os dados antigos
    ...dados, // Sobreescreve com os novos
    id: id, // Garante que o id não mude
  };

  return eventos[index];
}

// Deletar evento
function deletar(id) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index === -1) return false;

  eventos.splice(index, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
