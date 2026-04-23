let estoqueTotal = 0;
let indiceBE = 0; //Indice para slideshow Baixo Estoque
let indiceEntrada = 0; //Indice para slideshow Entrada
let indiceSaida = 0; //Indice para slideshow Saida
htmlUM = "";

/* CARREGAR PRODUTOS */

function carregarProdutos() {
  return localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];
}
let produtos = carregarProdutos();

/* CARREGAR MOVIMENTAÇÃO */

function carregarMovimentacao() {
  return localStorage.getItem("moveData")
    ? JSON.parse(localStorage.getItem("moveData"))
    : [];
}
let movimentacoes = carregarMovimentacao();

/* TOTAL PRODUTOS */

let totalProdutos = document.getElementById("total-produtos");

function totalEstoque() {
  if (!totalProdutos) return;
  
  estoqueTotal = produtos.reduce((soma, valorAtual) => {
    return soma + valorAtual.quantidadeProdutos;
  }, 0);
  totalProdutos.innerText = estoqueTotal;
}
totalEstoque();

/* BAIXO ESTOQUE */

let tituloBaixoEstoque = document.getElementById("titulo-baixo");
let baixoEstoque = document.getElementById("baixo-estoque");

function getProdutosFaltantes() {
  return produtos.filter((num) => num.quantidadeProdutos < 15);
}

function produtosBE() {
  let faltantes = getProdutosFaltantes();

  if (faltantes.length === 0) {
    baixoEstoque.innerHTML = `<p>---<br>---</p>`;
    return;
  }

  let produtoBE = faltantes[indiceBE];
  baixoEstoque.innerHTML = `<p>${produtoBE.nome}<br>${produtoBE.quantidadeProdutos}</p>`;
  indiceBE++;
  if (indiceBE >= faltantes.length) {
    indiceBE = 0;
  }
}
produtosBE();

setInterval(() => {
  produtosBE();
}, 5000);

/* ENTRADAS */

let entradasHoje = document.getElementById("entradas-hoje");

function getEntradasRecentes() {
  return movimentacoes.filter(({ tipo, data }) => {
    let agora = new Date();
    let diferenca = agora - data; // em milissegundos

    let umDia = 24 * 60 * 60 * 1000;

    return tipo === "entrada" && diferenca <= umDia;
  });
}

function produtosEntrada() {
  let entradas = getEntradasRecentes();

  if (entradas.length === 0) {
    entradasHoje.innerHTML = `<p>---<br>---</p>`;
    return;
  }

  let produtoEntrada = entradas[indiceEntrada];
  entradasHoje.innerHTML = `<p>${produtoEntrada.produto}<br>${produtoEntrada.quantidadeMov}</p>`;
  indiceEntrada++;
  if (indiceEntrada >= entradas.length) {
    indiceEntrada = 0;
  }
}
produtosEntrada();

setInterval(() => {
  produtosEntrada();
}, 5000);

/* SAÍDAS */

let saidasHoje = document.getElementById("saidas-hoje");

function getSaidasRecentes() {
  return movimentacoes.filter(({ tipo, data }) => {
    let agora = new Date();
    let diferenca = agora - data; // em milissegundos

    let umDia = 24 * 60 * 60 * 1000;

    return tipo === "saida" && diferenca <= umDia;
  });
}

function produtosSaida() {
  let saidas = getSaidasRecentes();

  if (saidas.length === 0) {
    saidasHoje.innerHTML = `<p>---<br>---</p>`;
    return;
  }

  let produtoSaida = saidas[indiceSaida];
  saidasHoje.innerHTML = `<p>${produtoSaida.produto}<br>${produtoSaida.quantidadeMov}</p>`;
  indiceSaida++;
  if (indiceSaida >= saidas.length) {
    indiceSaida = 0;
  }
}
produtosSaida();

setInterval(() => {
  produtosSaida();
}, 5000);

/* ULTÍMAS MOVIMENTAÇÕES */

let tableElements = document.getElementById("table-elements");
let movRecentes = movimentacoes.filter(({ data }) => {
  let agora = new Date();
  let diferenca = agora - data;
  let umDia = 24 * 60 * 60 * 1000;

  return diferenca <= umDia;
});

movRecentes.forEach(({ produto, tipo, quantidadeMov, data }) => {
  htmlUM += `<tr>
  <td>${produto}</td>
  <td>${tipo}</td>
  <td>${quantidadeMov}</td>
  <td>${data.toLocaleDateString()}</td>
  </tr>`;
});

tableElements.innerHTML = htmlUM;

/* ATUALIZAR PAÁGINA*/

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    totalEstoque()
    produtoBE()
    produtosSaida()
    produtosEntrada()
    tableElements.innerHTML = htmlUM
  }
})