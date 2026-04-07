// Módulos internos do projeto
const ParticipanteModel = require('../models/ParticipanteModel');
const {NotFoundError, ValidationError} = require('../errors/AppError');
const {
    isRequired,
    isEmail,
    minLegth,
    validar,
} = require('../helpers/validators');

function listarTodos(){
    return ParticipanteModel.listarTodos();
}

function buscarPorId(id){
    const participante = ParticipanteModel.buscarPorId(id);
    if(!participante){
        throw new NotFoundError('Participante não encontrado');
    }
    return participante;
}

function criar (dados) {
    const {nome, email} = dados;

    const erros = validar ([
        isRequired(nome),
        isRequired(email), 
        isEmail(email),
    ]);

    if(erros) throw new ValidationError(erros.join(";"));

    return ParticipanteModel.criar({nome, email});
}

function atualizar(id, dados) {
    const participante = buscarPorId(id);
    const {nome, email} = dados;

    const erros = validar ([
        isRequired(nome),
        isRequired(email), 
        isEmail(email),
    ]);

    if(erros) throw new ValidationError(erros.join(";"));

    return ParticipanteModel.atualizar(id, {nome, email});
}

function deletar(id) {
    const participante = buscarPorId(id);
    return ParticipanteModel.deletar(id);
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};