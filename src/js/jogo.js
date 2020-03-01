var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

var nivel = window.location.search;
nivel = nivel.replace("?", "");

var criarMosquitoTempo = 1500;

if (nivel === "normal") {
  criarMosquitoTempo = 1500;
} else if (nivel === "dificil") {
  criarMosquitoTempo = 1000;
} else if (nivel === "chucknorris") {
  criarMosquitoTempo = 750;
}

var cronometro = setInterval(() => {
  tempo -= 1;

  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    window.location.href = "vitoria.html";
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  console.log(altura, largura);
}

ajustaTamanhoPalcoJogo();

function posicaoRandomica() {
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (vidas > 3) {
      window.location.href = "fim_de_jogo.html";
    } else {
      document.getElementById("v" + vidas).src = "../img/coracao_vazio.png";
      vidas++;
    }
  }

  var posicaoX = Math.floor(Math.random() * largura) - 90;
  var posicaoY = Math.floor(Math.random() * altura) - 90;

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  var mosquito = document.createElement("img");
  mosquito.src = "../img/mosquito.png";
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = () => {
    // this.remove();
    mosquito.remove();
  };

  document.body.appendChild(mosquito);
}

posicaoRandomica();

function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);
  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}

var criaMosquito = setInterval(() => {
  posicaoRandomica();
}, criarMosquitoTempo);

document.getElementById("cronometro").innerHTML = tempo;
