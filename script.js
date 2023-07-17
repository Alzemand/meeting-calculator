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

function adicionarValor() {
  var select = document.getElementById("valoresPorHora");

  var nomeInput = document.getElementById("nomeInput");
  var valorInput = document.getElementById("valorInput");
  var quantidadeInput = document.getElementById("quantidadeInput");
  if (quantidadeInput.value == "") {
    quantidadeInput.value = 1;
  } else {
    quantidadeInput.value = quantidadeInput.value;
  }

  valorHora = parseFloat(valorInput.value / 220);
  valorHora = valorHora * quantidadeInput.value;
  valoresPorHora.push(valorHora);
  var option = document.createElement("option");;
  option.value = valorHora;
  option.text = nomeInput.value + " - R$ " + valorHora.toFixed(2);
  select.add(option);
}


function mostrarPagina2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

function mostrarPagina1() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
}