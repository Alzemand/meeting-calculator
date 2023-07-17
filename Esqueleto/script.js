var valoresPorHora = [];
var custoTotal = 0;
var intervalo;
var emPausa = false;
var tempoInicio = 0;
var tempoPausa = 0;
var ultimoCustoTotal = 0;

function adicionarValor() {
  var select = document.getElementById("valoresPorHora");
  var valor = parseFloat(prompt("Digite o valor por hora:"));
  if (!isNaN(valor)) {
    valoresPorHora.push(valor);
    var option = document.createElement("option");
    option.value = valor;
    option.text = "R$ " + valor.toFixed(2);
    select.add(option);
  }
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
  ultimoCustoTotal = 0;
}

function pausarRetomarCalculo() {
  if (emPausa) {
    tempoInicio = Date.now();
    intervalo = setInterval(atualizarCusto, 1000);
    emPausa = false;
  } else {
    clearInterval(intervalo);
    emPausa = true;
    ultimoCustoTotal = custoTotal;
  }
}

function pararCalculo() {
  clearInterval(intervalo);
  emPausa = true;
  ultimoCustoTotal = 0;
}

function calcularCusto() {
  custoTotal = 0;
  for (var i = 0; i < valoresPorHora.length; i++) {
    custoTotal += valoresPorHora[i] / 3600;
  }
  custoTotal += ultimoCustoTotal;
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
