const apiUrl = "https://jsonservertiaw--robertasophiacs.repl.co/perfil";

var answers = {};

var question_one = document.getElementById("question-1");
var question_two = document.getElementById("question-2");
var question_three = document.getElementById("question-3");
var question_four = document.getElementById("question-4");
var question_five = document.getElementById("question-5");

function storeAnswer(question_number, event) {
  if (event.target.type === "radio") {
    console.log(event.target.value);
    answers["question" + question_number] = parseInt(event.target.value);
    console.log(answers);
  }
}

question_one.addEventListener("click", function (event) {
  storeAnswer(1, event);
});
question_two.addEventListener("click", function (event) {
  storeAnswer(2, event);
});
question_three.addEventListener("click", function (event) {
  storeAnswer(3, event);
});
question_four.addEventListener("click", function (event) {
  storeAnswer(4, event);
});
question_five.addEventListener("click", function (event) {
  storeAnswer(5, event);
});

function getInfoBasedOnScore(score) {
  if (score <= 5) {
    var score_info = "Conservador";
  } else if (score > 7 && score <= 10) {
    var score_info = "Moderado";
  } else if (score > 11) {
    var score_info = "Arrojado";
  }

  return score_info;
}

var submit1 = document.getElementById("submit1");
var submit2 = document.getElementById("submit2");
var submit3 = document.getElementById("submit3");
var submit4 = document.getElementById("submit4");
var submit5 = document.getElementById("submit5");

function nextQuestion(question_number, porcentagem) {
  if (answers["question" + (question_number - 1)]) {
    var current_question_number = question_number - 1;
    var question_number = question_number.toString();
    var current_question_number = current_question_number.toString();

    var el = document.getElementById("question-" + question_number);
    var el2 = document.getElementById("question-" + current_question_number);

    el.style.display = "block";
    el2.style.display = "none";

    growProgressBar(porcentagem);
  }
}

submit1.addEventListener("click", function () {
  nextQuestion(2, "40%");
});
submit2.addEventListener("click", function () {
  nextQuestion(3, "60%");
});
submit3.addEventListener("click", function () {
  nextQuestion(4, "80%");
});
submit4.addEventListener("click", function () {
  nextQuestion(5, "100%");
});
submit5.addEventListener("click", function () {
  nextQuestion(6, "100%");
  const total = totalScore();
  const resultado = getInfoBasedOnScore(total);

  document.getElementById("printtotalscore").innerHTML = total;
  document.getElementById("printscoreinfo").innerHTML = resultado;

  const respostas = {
    "questão1": answers.question1,
    "questão2": answers.question2,
    "questão3": answers.question3,
    "questão4": answers.question4,
    "questão5": answers.question5,
    "valorTotal": total,
    "resultado": resultado
  };

  atualizaResposta(1, respostas);
});

function growProgressBar(percentage_width) {
  var bar = document.getElementById("progress_bar");
  bar.style.width = percentage_width;
}

// Voltar questões
// Recebe os botões de voltar pelo Id
var voltarQst1 = document.getElementById("voltar1");
var voltarQst2 = document.getElementById("voltar2");
var voltarQst3 = document.getElementById("voltar3");
var voltarQst4 = document.getElementById("voltar4");

//Assim que os botões forem clicados, essas funções serão executadas de acordo com o nome de cada botão
voltarQst1.addEventListener("click", (evento) => {
  voltarQuestao(2);
  growProgressBar("20%");
});
voltarQst2.addEventListener("click", (evento) => {
  voltarQuestao(3);
  growProgressBar("40%");
});
voltarQst3.addEventListener("click", (evento) => {
  voltarQuestao(4);
  growProgressBar("60%");
});
voltarQst4.addEventListener("click", (evento) => {
  voltarQuestao(5);
  growProgressBar("80%");
});

//Função que faz a questão voltar
function voltarQuestao(question_number) {
  var elementoAtual = document.getElementById("question-" + question_number); // recebe a questao atual
  var voltarElemento = document.getElementById(
    "question-" + (question_number - 1)
  ); // recebe a questao anterior

  elementoAtual.style.display = "none";
  voltarElemento.style.display = "block";
}

function totalScore() {
  var total_score =
    answers.question1 +
    answers.question2 +
    answers.question3 +
    answers.question4 +
    answers.question5;

  return total_score;
}

function createResposta(contato, refreshFunction) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contato),
  })
    .then((response) => response.json())
    .then((data) => {
      if (refreshFunction) refreshFunction();
    })
    .catch((error) => {
      console.error("Erro ao inserir contato via API JSONServer:", error);
    });
}

function atualizaResposta(id, contato, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contato),
  })
    .then((response) => response.json())
    .then((data) => {
      if (refreshFunction) refreshFunction();
    })
    .catch((error) => {
      console.error("Erro ao inserir contato via API JSONServer:", error);
    });
}
