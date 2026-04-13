let estoqueTotal = 0;
let indiceBE = 0; //Indice para slideshow Baixo Estoque
let indiceEntrada = 0; //Indice para slideshow Entrada
let indiceSaida = 0; //Indice para slideshow Saida
htmlUM = "";

/* PRODUTOS */
let produtos = [
  {
    nome: "agua",
    quantidadeProdutos: 10,
    categoria: "bebida",
  },
  {
    nome: "biscoito",
    quantidadeProdutos: 20,
    categoria: "comida",
  },
  {
    nome: "bala",
    quantidadeProdutos: 5,
    categoria: "comida",
  },
];

/* MOVIMENTAÇÃO */

let movimentacoes = [
  {
    produto: "coca-cola",
    tipo: "entrada",
    quantidadeMov: 20,
    data: new Date(),
  },
  {
    produto: "arroz",
    tipo: "entrada",
    quantidadeMov: 30,
    data: new Date(),
  },
  {
    produto: "vinagre",
    tipo: "saida",
    quantidadeMov: 40,
    data: new Date(),
  },
  {
    produto: "feijao",
    tipo: "saida",
    quantidadeMov: 50,
    data: new Date(),
  },
  {
    produto: "azeitona",
    tipo: "entrada",
    quantidadeMov: 60,
    data: new Date(),
  },
];

/* TOTAL PRODUTOS */

let totalProdutos = document.getElementById("total-produtos");
function totalEstoque() {
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
    let agora = new Date()
    let diferenca = agora - data; // em milissegundos

    let umDia = 24 * 60 * 60 * 1000;

    return tipo === "entrada" && diferenca <= umDia;
  });
}

function produtosEntrada() {
  let entradas = getEntradasRecentes();
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
    let agora = new Date()
    let diferenca = agora - data; // em milissegundos

    let umDia = 24 * 60 * 60 * 1000;

    return tipo === "saida" && diferenca <= umDia;
  });
}

function produtosSaida() {
  let saidas = getSaidasRecentes()
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
