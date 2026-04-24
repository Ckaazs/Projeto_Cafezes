/*
=======================================
1 - PEGAR OS ELEMENTOS DO HTML
=======================================
*/
// querySelector busca o elemento pelo seletor CSS
const buscaProdutos = document.querySelector("#buscaProdutos");
const listaProdutos = document.querySelector("#listaProdutos");

/*
=======================================
2 - LISTA QUE VAI GUARDAR OS PRODUTOS
=======================================
*/
// começa vazia, será preenchida ao carregar o JSON
let produtos = [];

/*
=======================================
3 - CARREGAR OS PRODUTOS DO JSON
=======================================
*/
// async/await = espera a resposta do fetch antes de continuar
async function carregarProdutos() {
  const resposta = await fetch("../data/produtos.json"); // busca o arquivo JSON
  produtos = await resposta.json();                       // transforma em array JS
  renderizarProdutos(produtos);                           // desenha os cards na tela
}

/*
=======================================
4 - CRIAR OS CARDS NA TELA (DOM)
=======================================
*/
function renderizarProdutos(lista) {

  // limpa a lista antes de redesenhar (evita duplicatas)
  listaProdutos.innerHTML = "";

  // se a busca não encontrou nada, mostra mensagem
  if (lista.length === 0) {
    listaProdutos.innerHTML = `
      <p style="
        text-align:center;
        color:var(--texto-suave);
        font-style:italic;
        grid-column:1/-1;
        padding:60px 0;
        font-family:'Cormorant Garamond',serif;
        font-size:1.2rem;
      ">Nenhum produto encontrado.</p>`;
    return;
  }

  // para cada produto, cria um card HTML
  lista.forEach((produto, index) => {

    const card = document.createElement("div");
    card.classList.add("card-produto");

    // formata o preço em reais: 1800 → "1.800,00"
    const precoFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // usamos o index como ID para identificar o produto na página de detalhe
    // o link passa o índice via URL: produto.html?id=0
    card.innerHTML = `
      <div class="card-img-wrap">
        <img
          src="${produto.img}"
          alt="${produto.título}"
          loading="lazy"
          onerror="this.style.display='none'"
        >
      </div>
      <div class="card-body">
        <h3>${produto.título}</h3>
        <p class="card-desc">${produto.desc}</p>
        <div class="card-footer">
          <span class="card-preco">
            <span>R$</span>${precoFormatado}
          </span>
          <a href="produto.html?id=${index}" class="btn-detalhes">Ver mais</a>
        </div>
      </div>
    `;

    // adiciona o card dentro do grid no HTML
    listaProdutos.appendChild(card);
  });
}

/*
=======================================
5 - BUSCA EM TEMPO REAL
=======================================
*/
// "input" dispara a cada tecla digitada
buscaProdutos.addEventListener("input", function () {
  const texto = buscaProdutos.value.toLowerCase();

  // filter retorna apenas os produtos cujo título contém o texto buscado
  const filtrados = produtos.filter((p) =>
    p.título.toLowerCase().includes(texto)
  );

  renderizarProdutos(filtrados);
});

// executa ao carregar a página
carregarProdutos();