// ================================================
// CONTATO.JS — Envio do formulário para o servidor
// ================================================

//API_URL = "http://localhost:3000/"

API_URL = "https://projeto-cafezes.onrender.com"

// Pega o formulário pelo ID definido no contato.html
const form = document.getElementById("formContato");

// Escuta o clique no botão "Enviar Mensagem"
form.addEventListener("submit", async function (event) {

  // Impede o navegador de recarregar a página
  event.preventDefault();

  // Lê o conteúdo de cada campo
  const nome     = document.getElementById("nome").value;
  const email    = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  // Agrupa os dados em um objeto
  const dados = { nome, email, mensagem };

  try {
    // Envia os dados via POST para o servidor Node (server.js)
    // Se mudar a porta do servidor, atualize o número abaixo (3000)
    await fetch(`http://localhost:3000/${API_URL}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(dados)
    });

    // Exibe mensagem de sucesso e esconde a de erro
    document.getElementById("msg-sucesso").style.display = "block";
    document.getElementById("msg-erro").style.display    = "none";

    // Limpa os campos do formulário
    form.reset();

  } catch (erro) {
    // Se o servidor estiver offline ou falhar:
    document.getElementById("msg-erro").style.display    = "block";
    document.getElementById("msg-sucesso").style.display = "none";
    console.error("Erro ao conectar com o servidor:", erro);
  }
});