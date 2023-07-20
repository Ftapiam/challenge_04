var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var optionsEl = document.getElementById('options');
var btnSubmit = document.getElementById('submit');
var btnStart = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('results');

// variables
var indexQuestion = 0;
var timer = questions.length * 15;
var idTime;

function startQuestions() {
  //start Questions and show div
  var initialScreenEl = document.getElementById('initial-screen');
  initialScreenEl.setAttribute('class', 'hide');
  questionsEl.removeAttribute('class');
  idTime = setInterval(clockTick, 1000);
  timerEl.textContent = timer;
  iniQuestions();
}

function iniQuestions() {
  //Assign questions and show
  var getQuestion = questions[indexQuestion];
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = getQuestion.title;
  optionsEl.innerHTML = '';
  for (var i = 0; i < getQuestion.options.length; i++) {
    var option = getQuestion.options  [i];
    var nodeOption = document.createElement('button');
    nodeOption.setAttribute('class', 'choice');
    nodeOption.setAttribute('value', option);
    nodeOption.textContent = i + 1 + '. ' + option;
    optionsEl.appendChild(nodeOption);
  }
}

function questionClick(event) {
 
  var buttonEl = event.target;
   if (!buttonEl.matches('.choice')) {
    return;
  }
   //Validate answers if is wrong
  if (buttonEl.value !== questions[indexQuestion].answer) {
    timer -= 15;
    if (timer < 0) {
      timer = 0;
    }
    timerEl.textContent = timer;
    feedbackEl.textContent = 'Fail!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }
  //show if was correct
  feedbackEl.setAttribute('class', 'results');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'results hide');
  }, 1000);
  indexQuestion++;
  if (timer <= 0 || indexQuestion === questions.length) {
    finishQuiz();
  } else {
    iniQuestions();
  }
}

function finishQuiz() {
  //show results
  clearInterval(idTime);
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = timer;
  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  timer--;
  timerEl.textContent = timer;
  if (timer <= 0) {
    finishQuiz();
  }
}

function saveResult() {
  //Save Results local storage
  var initials = initialsEl.value.trim();
  if (initials !== '') {
    var scores =
    JSON.parse(window.localStorage.getItem('result')) || [];

   var newScore = {
    score: timer,
    initials: initials,
   };
   scores.push(newScore);
   window.localStorage.setItem('result', JSON.stringify(scores));
   window.location.href = 'results.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveResult();
  }
}

// events Onclick 
btnSubmit.onclick = saveResult;
btnStart.onclick = startQuestions;
optionsEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
