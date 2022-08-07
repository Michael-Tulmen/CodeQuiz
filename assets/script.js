//score timer intro
var timer = document.querySelector("h4.time");
var timeRemaining = 180;
var score = document.querySelector("#score");
var introduction = document.querySelector("#intro");
//questions
var questionsEl = document.querySelector("#questions");
var question = document.querySelector("#question");
var currentQuestion = 0;
var validate = document.querySelector("#validate");
//inputs
var input = document.querySelector("#input");
var scoreName = document.querySelector("#name");
//high scores
var highscores = document.querySelector("#highscores");
var highScoresList = document.querySelector("#high-score-list");
var highScoreList = [];
//buttons and interactions
var startBtn = document.querySelector("#startButton");
var answerBtn = document.querySelectorAll("button.ansBtn");
var answer1Btn = document.querySelector("#answerChoice1");
var answer2Btn = document.querySelector("#answerChoice2");
var answer3Btn = document.querySelector("#answerChoice3");
var answer4Btn = document.querySelector("#answerChoice4");
var submitBtn = document.querySelector("#submit");
var restartBtn = document.querySelector("#restart");
var clearScoreBtn = document.querySelector("#clearscores");
var highScoreBtn = document.querySelector("#hsb");

var questions = [
  {
    question: "What tag defines a list item in a bulleted list?",
    answers: ["<p></p>", "<ul></ul>", "<ol></ol>", "<li></li>"],
    correctAnswer: "3",
  },
  {
    question:
      "What needs to be the first item included in an HTML document to provide instructions to the browser?",
    answers: ["<caption></caption>", "<!DOCTYPE>", "<code>", "<embed>"],
    correctAnswer: "1",
  },
  {
    question: "What tag defines a list item in a bulleted list?",
    answers: ["<p></p>", "<ul></ul>", "<ol></ol>", "<li></li>"],
    correctAnswer: "3",
  },
  {
    question: "What is used to define an unordered list?",
    answers: ["<p></p>", "<ul></ul>", "<ol></ol>", "<li></li>"],
    correctAnswer: "1",
  },
  {
    question:
      "Which CSS property is used to add space around sections of content?",
    answers: ["Cleaner", "Spacing", "Break", "Padding"],
    correctAnswer: "3",
  },
  {
    question: "CSS stands for ____ style sheets",
    answers: ["cascading", "condensing", "concave", "conceptual"],
    correctAnswer: "0",
  },
  {
    question:
      "In CSS and HTML colors are displayed by combining these three shades of light",
    answers: [
      "Yellow, Green, Blue",
      "UltraViolet, Red, White",
      "Mauve, Salmon, Black",
      "Red, Green, Blue",
    ],
    correctAnswer: "3",
  },
  {
    question:
      "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    answers: ["For Loop", "Else Loop", "While Loop", "Conditional Loop"],
    correctAnswer: "2",
  },
  {
    question:
      "What kind of statement is used to execute actions based on a trigger or condition?",
    answers: [
      "Fired Event",
      "Boolean Variable",
      "Regular Expression",
      "Conditional Statement",
    ],
    correctAnswer: "3",
  },
  {
    question:
      "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    answers: ["Scope", "Range", "Level", "Restriction"],
    correctAnswer: "0",
  },
];
//start the quiz with an action of the button
startBtn.addEventListener("click", startQuiz);

//function to start the ticker
function countDown() {
  var timeInterval = setInterval(function () {
    timeRemaining--;
    timer.textContent = "Time:" + timeRemaining;

    if (timeRemaining === 0 || currentQuestion === questions.length) {
      clearInterval(timeInterval);
      questionsEl.style.display = "none";
      input.style.display = "block";
      score.textContent = timeRemaining;
    }
  }, 1000);
}

//to start the quiz at the press of the start button
function startQuiz() {
  introduction.style.display = "none";
  questionsEl.style.display = "block";
  currentQuestion = 0;
  countDown();
  setQuestion(currentQuestion);
}

//to display Q&A
function setQuestion(id) {
  if (id < questions.length) {
    question.textContent = questions[id].question;
    answer1Btn.textContent = questions[id].answers[0];
    answer2Btn.textContent = questions[id].answers[1];
    answer3Btn.textContent = questions[id].answers[2];
    answer4Btn.textContent = questions[id].answers[3];
  }
}

//validate answer and go next
function checkAnswer(event) {
  event.preventDefault();

  validate.style.display = "block";
  var p = document.createElement("p");
  validate.appendChild(p);

  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  //check answer
  if (questions[currentQuestion].correctAnswer === event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[currentQuestion].correctAnswer !== event.target.value) {
    timeRemaining = timeRemaining - 10;
    p.textContent = "Try Again!";
  }
  //move through questions array
  if (currentQuestion < questions.length) {
    currentQuestion++;
  }
  setQuestion(currentQuestion);
}

//give score when correct
function addScore(event) {
  event.preventDefault();

  input.style.display = "none";
  highscores.style.display = "block";

  var init = scoreName.value.toUpperCase();
  highScoreList.push({ name: init, score: timeRemaining });

  highScoreList = highScoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  highScoresList.innerHTML = "";
  for (var i = 0; i < highScoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = highScoreList[i].name + " " + highScoreList[i].score;
    highScoresList.append(li);
  }

  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("ScoreList", JSON.stringify(highScoreList));
}

function displayScores() {
  var storedScoreList = JSON.parse(localStorage.getItem("ScoreList")) || [];
  if (storedScoreList !== null) {
    for (var i = storedScoreList.length - 1; i >= 0; i--) {}
  }
}

function clearScores() {
  localStorage.clear();
  highScoresList.innerHTML = "";
}

answerBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", addScore);

restartBtn.addEventListener("click", function () {
  highscores.style.display = "none";
  introduction.style.display = "block";
  timeRemaining = 180;
  timer.textContent = "Time:" + timeRemaining;
});

clearScoreBtn.addEventListener("click", clearScores);

highScoreBtn.addEventListener("click", function () {
  if (highScoresList !== "") {
    highscores.style.display = "block";
    introduction = style.display = "none";
    input.style.display = "none";
    questionsEl.style.display = "none";
  }
});
