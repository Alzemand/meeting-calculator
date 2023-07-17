var valoresPorHora = [];
var custoTotal = 0;
var intervalo;
var emPausa = false;
var tempoInicio = 0;
var tempoPausa = 0;

function mostrarPagina(pagina) {
  var paginas = document.getElementsByClassName('page');
  for (var i = 0; i < paginas.length; i++) {
    paginas[i].classList.remove('active');
  }
  document.getElementById(pagina).classList.add('active');
}

function removerValor() {
  var select = document.getElementById("valoresPorHora");
  var indiceSelecionado = select.selectedIndex;
  if (indiceSelecionado >= 0) {
    select.remove(indiceSelecionado);
    valoresPorHora.splice(indiceSelecionado, 1);
  }
}

function startCalculo() {
  var select = document.getElementById("valoresPorHora");
  valoresPorHora = Array.from(select.options).map(function(option) {
    return parseFloat(option.value);
  });

  clearInterval(intervalo);
  custoTotal = 0;
  tempoInicio = Date.now();
  intervalo = setInterval(atualizarCusto, 1000);
  emPausa = false;
}


function pausarRetomarCalculo() {

  if (emPausa) {
    tempoInicio = Date.now();
    intervalo = setInterval(atualizarCusto, 1000);
    emPausa = false;
  } else {
    clearInterval(intervalo);
    emPausa = true;
  }

}

function pararCalculo() {
  clearInterval(intervalo);
  emPausa = true;
}

function calcularCusto() {
  custoTotal = 0;
  for (var i = 0; i < valoresPorHora.length; i++) {
    custoTotal += valoresPorHora[i] / 3600;
  }
  document.getElementById("resultado").innerHTML = "Custo acumulado: R$ " + custoTotal.toFixed(2);
}

function atualizarCusto() {
  if (!emPausa) {
    var agora = Date.now();
    var tempoDecorrido = (agora - tempoInicio - tempoPausa) / 1000;
    tempoInicio = agora;
    var custoPorSegundo = 0;
    for (var i = 0; i < valoresPorHora.length; i++) {
      custoPorSegundo += valoresPorHora[i] / 3600;
    }
    custoTotal += custoPorSegundo * tempoDecorrido;
    document.getElementById("resultado").innerHTML = "Custo acumulado: R$ " + custoTotal.toFixed(2);
  }
}

var valoresPorHora = [];
var nomesValores = [];

function adicionarValor() {
  var select = document.getElementById("valoresPorHora");
  var valor = parseFloat(prompt("Digite o valor por hora:"));
  if (!isNaN(valor)) {
    valoresPorHora.push(valor);
    nomesValores.push("");

    var option = document.createElement("option");
    option.value = valor;
    option.text = "R$ " + valor.toFixed(2);
    select.add(option);
    adicionarValorNaLista(valor);
  }
}

function adicionarValorNaLista(valor) {
  var lista = document.getElementById("valoresAdicionados");
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerText = "R$ " + valor;
  lista.appendChild(li);
}

function adicionarNomeValor() {
  var nomeInput = document.getElementById("nomeInput");
  var valorInput = document.getElementById("valorInput");

  var nome = nomeInput.value;
  var valor = parseFloat(valorInput.value);

  if (nome.trim() !== "" && !isNaN(valor)) {
    nomesValores.push(nome);
    adicionarValorNaLista(valor);  // Passar apenas o valor numérico
    valoresPorHora.push(valor);

    nomeInput.value = "";
    valorInput.value = "";
  }
}


function mostrarPagina2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

function mostrarPagina1() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
}