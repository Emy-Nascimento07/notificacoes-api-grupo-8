// Módulos internos do projeto
const EventoModel = require("./EventoModel");
const ParticipanteModel = require("./ParticipanteModel");

// Banco de dados temporário - array em memória

let inscricoes = [
    {
        id: 1,
        eventoId: 1,
        participanteId: 1,
        dataInscricao: "2025-08-15",
        status: "confirmada",
    },
    {
        id: 2,
        eventoId: 1,
        participanteId: 2,
        dataInscricao: "2025-08-19",
        status: "confirmada",
    },
];

// Variável para controlar o ID
let proximoId = 3;

// Criar uma nova inscrição
// InscricaoModel.criar() simplificado:
function criar(eventoId, participanteId) {
  // Verificar duplicata (essa fica no Model porque é regra de dados)
  const jaInscrito = inscricoes.find(
    (i) => i.eventoId === eventoId && i.participanteId === participanteId,
  );
  if (jaInscrito) {
    throw new ValidationError("Participante já inscrito neste evento");
  }
  const novaInscricao = {
    id: proximoId,
    eventoId,
    participanteId,
    dataInscricao: new Date().toISOString(),
    status: "confirmada",
  };
  proximoId++;
  inscricoes.push(novaInscricao);
  return novaInscricao;
}

// Listar inscrições de um evento específico
function listarPorEvento(eventoId) {
  return inscricoes.filter((i) => i.eventoId === eventoId);
}

// Buscar inscrição por ID
function buscarPorId(id) {
  return inscricoes.find((i) => i.id === id);
}

// Buscar inscrição por ID incluindo dados do evento e participante
function buscarComDetalhes(id) {
  const inscricao = buscarPorId(id);
  if (!inscricao) return null;

  const evento = EventoModel.buscarPorId(inscricao.eventoId);
  const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

  return {
    ...inscricao,
    evento,
    participante,
  };
}

// Listar todas as inscrições
function listarTodas() {
  return inscricoes;
}

// Cancelar uma inscrição
function cancelar(id) {
  const index = inscricoes.findIndex((i) => i.id === id);
  if (index === -1) return null;
  inscricoes[index].status = "cancelada";
  return inscricoes[index];
}

module.exports = {
  criar,
  listarPorEvento,
  listarTodas,
  cancelar,
  buscarComDetalhes,
};
