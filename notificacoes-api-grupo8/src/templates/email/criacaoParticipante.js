const baseTemplate = require('./baseTemplate');

function criacaoParticipante(dados) {
    const { participanteNome } = dados;
    const dataFormatada = new Date(eventoData).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const conteudo = `

    <h2>Bem-vindo(a)!🎉</h2>
    <p>Olá <strong>${participanteNome}</strong>,</p>
          <p>Bem-vindo à Plataforma de Eventos, <strong>${participante.nome}</strong>!</p>


    <p>Prepare-se para vivenciar experiências incríveis, agradecemos a preferência! </p>
    <p>Até logo! 🎉</p>
  `;

    return baseTemplate(conteudo);

}

module.exports = criacaoParticipante;
