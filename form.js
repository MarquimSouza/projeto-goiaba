/* INTERAÇÃO DE ABAS E FORMULÁRIOS */

document.querySelectorAll(".tab").forEach(function (aba) {
  aba.addEventListener("click", function () {
    let cliqueAba = aba.dataset.form;
    let formAtivo = document.getElementById(cliqueAba);
    document.querySelectorAll(".tab").forEach(function (abas) {
      abas.classList.remove("active");
    });
    document.querySelectorAll(".form-content").forEach(function (forms) {
      forms.classList.remove("active");
    });
    aba.classList.add("active");
    formAtivo.classList.add("active");
  });
});

/* POP UP */

function mostrarPopup(classe, mensagem) {
  let popup = document.getElementById("popup");
  popup.classList.remove("show", "success", "error", "warning");
  popup.classList.add("show");
  popup.classList.add(`${classe}`);
  popup.innerText = mensagem;
  setTimeout(() => {
    popup.classList.remove("show", "success", "error", "warning");
  }, 6000);
}

/* VÁRIAVEIS GLOBAIS HTML */

let nomeProduto = document.getElementById("nome-produto");
let quantidadeProduto = document.getElementById("quantidade-produto");
let categoriaProduto = document.getElementById("categoria-produto");
let produtoMov = document.getElementById("produto-mov");
let quantidadeMov = document.getElementById("quantidade-mov");
let tipoMov = document.getElementById("tipo-mov");

/* FUNÇÕES RESETAR INPUTS */
// RESET INPUTS CADASTRAR
function rstInputsCadastro() {
  nomeProduto.value = "";
  quantidadeProduto.value = "";
  categoriaProduto.value = "";
}

// RESET INPUTS ENTRADA E SAÍDA
function rstInputsES() {
  produtoMov.value = "";
  quantidadeMov.value = "";
  tipoMov.value = "";
}

/* FUNÇÃO CADASTRAR PRODUTO */

function cadastrarProduto() {
  let produtoCadastrado = {
    nome:
      nomeProduto.value.trim().charAt(0).toUpperCase() +
      nomeProduto.value.trim().slice(1).toLowerCase(),
    quantidadeProdutos: parseFloat(quantidadeProduto.value),
    categoria:
      categoriaProduto.value.trim().charAt(0).toUpperCase() +
      categoriaProduto.value.trim().slice(1).toLowerCase(),
  };
  const produtoRepetido = produtos.some(
    (item) =>
      item.nome.toLowerCase().trim() ==
      produtoCadastrado.nome.toLowerCase().trim(),
  );
  if (!produtoRepetido) {
    produtos.push(produtoCadastrado);
    mostrarPopup("success", "Produto cadastrado com sucesso!");
    rstInputsCadastro();
    totalEstoque();
  } else {
    rstInputsCadastro();
    return mostrarPopup("warning", "Produto ja consta no estoque!");
  }
}

/* FUNÇÃO ENTRADA E SAIDA PRODUTOS */

function entradaSaida() {
  let produtoEditado = {
    produto:
      produtoMov.value.trim().charAt(0).toUpperCase() +
      produtoMov.value.trim().slice(1).toLowerCase(),
    quantidadeMov: parseFloat(quantidadeMov.value),
    tipo:
      tipoMov.value.trim().charAt(0).toUpperCase() +
      tipoMov.value.trim().slice(1).toLowerCase(),
    data: new Date(),
  };

  const produtoRepetido = produtos.some(
    (item) =>
      item.nome.toLowerCase().trim() ==
      produtoEditado.produto.toLowerCase().trim(),
  );

  if (!produtoRepetido) {
    rstInputsES();
    return mostrarPopup("warning", "Produto não cadastrado no sistema!");
  } else {
    let produtoEncontrado = produtos.find(
      (item) =>
        item.nome.toLowerCase() == produtoEditado.produto.toLowerCase().trim(),
    );
    if (produtoEditado.tipo.toLowerCase() == "entrada") {
      produtoEncontrado.quantidadeProdutos += produtoEditado.quantidadeMov;
      movimentacoes.push(produtoEditado);
      mostrarPopup(
        "success",
        `O produto ${produtoEncontrado.nome} foi atualizado com sucesso e tem o estoque de ${produtoEncontrado.quantidadeProdutos}.`,
      );
      rstInputsES();
      totalEstoque();
    } else if (
      produtoEncontrado.quantidadeProdutos - produtoEditado.quantidadeMov <
      0
    ) {
      mostrarPopup(
        "error",
        `A quantidade de saída é maior do que tem no estoque total do produto! ${produtoEncontrado.nome} tem o estoque de ${produtoEncontrado.quantidadeProdutos}.`,
      );
      rstInputsES();
    } else {
      produtoEncontrado.quantidadeProdutos -= produtoEditado.quantidadeMov;
      movimentacoes.push(produtoEditado);
      mostrarPopup(
        "success",
        `O produto ${produtoEncontrado.nome} foi atualizado com sucesso e tem o estoque de ${produtoEncontrado.quantidadeProdutos}.`,
      );
      totalEstoque();
      rstInputsES();
    }
  }
  console.log(produtos);
  console.log(movimentacoes);
}

/* SUBMIT FORMULÁRIO */

document.querySelectorAll(".form-content").forEach(function (envio) {
  envio.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (envio.id == "cadastro") {
      clearTimeout()
      cadastrarProduto();
    } else {
      clearTimeout()
      entradaSaida();
    }
  });
});
