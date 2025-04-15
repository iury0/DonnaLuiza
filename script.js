function enviarPedido(event) {
  event.preventDefault();

  const tipoBolo = document.getElementById('tipoBolo').value;
  let massa = "";
  let recheio = "";
  
  if (tipoBolo !== "bolo-de-rolo") {
    massa = document.getElementById('massa').value;
    recheio = document.getElementById('recheio').value;
  }
  
  const peso = document.getElementById('peso').value;

  // Função para formatar texto: "bolo-de-rolo" -> "Bolo de Rolo"
  function formatarTexto(texto) {
    return texto
      .split('-')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

  const tipoBoloFormatado = formatarTexto(tipoBolo);
  const massaFormatada = formatarTexto(massa);
  const recheioFormatado = formatarTexto(recheio);

  let mensagem = "";

  if (tipoBolo === "bolo-de-rolo") {
    mensagem = `Olá Donna Luíza, gostaria de um bolo ${tipoBoloFormatado} de ${peso} kg.`;
  } else {
    mensagem = `Olá Donna Luíza, gostaria de um bolo ${tipoBoloFormatado} ${massaFormatada} com recheio ${recheioFormatado} de ${peso} kg.`;
  }

  const mensagemCodificada = encodeURIComponent(mensagem);

  // Substitua o número abaixo pelo seu número com DDI + DDD, sem espaços ou símbolos
  const numeroWhatsApp = "5581995651934";

  window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
}
