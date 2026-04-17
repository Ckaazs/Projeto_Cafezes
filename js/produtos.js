/*
=======================================
1 - PEGAR O ELEMENTO(TAG) DO HTML
=======================================
*/

// Cria uma variável constante com a referência da tag HTML
const buscaProdutos = document.querySelector("#buscaProdutos");
const listaProdutos = document.querySelector("#listaProdutos");

/*
=======================================
2 - CRIAR UMA LISTA VAZIA PARA GUARDAR OS PRODUTOS
=======================================
*/
let produtos = []; // aqui vai ficar a lista carregada do JSON

/*
=======================================
3 - FUNÇÃO PARA CARREGAR O JSON COM OS PRODUTOS
=======================================
*/
async function carregarProdutos(){
    // buscar o arquivo produtos.json (como se fosse uma mini API)
    const resposta = await fetch("../data/produtos.json");

    // Tranformar o JSON em dados que JS entende
    produtos = await resposta.json();

    // depois de carregar, já renderiza na tela
    renderizarProdutos(produtos);

}


/*
=======================================
4 - FUNÇÃO PARA CRIAR OS CARDS DOS PRODUTOS NA TELA (DOM)
=======================================
*/
function renderizarProdutos(lista){
    // limpa o conteúdo na tela antes de desenhar de novo
    listaProdutos.innerHTML="";

    // para cada Produtos da lista, cria um card
    lista.forEach((produto) => {
        // cria uma element/tag DIV
        const card = document.createElement("div");

        // coloca uma classe (para o CSS estilizar)
        card.classList.add("card-produto");

        // coloca o conteúdo dentro do CARD
        card.innerHTML = `
            <h3> ${produto.título} </h3>
            <img src=${produto.img} width="55" heigth="55">
            <p> ${produto.desc} </p>
            <p><strong>Preço: <strong> ${produto.preco} </p>
            <a href=${produto.url}>
            <button class="btn-detalhes">Comprar</button>
            </a>
        `;
        // coloca o card dentro da lista
        listaProdutos.appendChild(card);

    });

};


/*
=======================================
5 - BUSCA : FILTRAR PRODUTOS NA QUANDO DIGITAR
=======================================
*/
buscaProdutos.addEventListener("input",function(){
    const texto = buscaProdutos.value.toLowerCase();

    const filtrados = produtos.filter((produto) => 
        produto.título.toLowerCase().includes(texto)
    );

    renderizarProdutos(filtrados);
});



carregarProdutos();