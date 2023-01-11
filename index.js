//https://www.youtube.com/watch?v=49pYIMygIcU&ab_channel=CodeExplained

const questionsList = [
  {
    question: "Who eats his own vomit?",
    answera: "Ariel",
    answerb: "Jonah",
    answerc: "Master Chief",
    answerd: "Josh",
    correct: "answerC",
  },
  //   {
  //     question: "Who runs into walls whenever running down the stairs?",
  //     answera: "Ariel",
  //     answerb: "Master Chief",
  //     answerc: "Jonah",
  //     answerd: "Josh",
  //     correct: "answerB",
  //   },
  //   {
  //     question: "Who left his toys all over the floor?",
  //     answera: "Ariel",
  //     answerb: "Jonah",
  //     answerc: "Master Chief",
  //     answerd: "Josh",
  //     correct: "answerC",
  //   },
  //   {
  //     question: "Who is a handsome boy?",
  //     answera: "Master Chief",
  //     answerb: "Ariel",
  //     answerc: "Jonah",
  //     answerd: "Josh",
  //     correct: "answerA",
  //   },
  //   {
  //     question: `Who misses Ariel when his steps \noutside the house for 1 minute?`,
  //     answera: "Josh",
  //     answerb: "Ariel",
  //     answerc: "Jonah",
  //     answerd: "Master Chief",
  //     correct: "answerD",
  //   },
];

//Start quiz page
const startButtonEl = document.getElementById("startQuizBtn");
const startContainerEl = document.getElementById("startQuizContainer");
const timeEl = document.getElementById("topBarTime");
//Question page
const questionContainerEl = document.getElementById("questionContainer");
const questionAnswerEl = document.getElementsByClassName("button");
const questionResultEl = document.getElementById("questionResult");
const questionLineBrEl = document.getElementById("questionLineBr");
//Final Scores page
const finalScoreForm = document.forms["finalScoreForm"];
const finalScoreContainerEl = document.getElementById("finalScoreContainer");
const finalScoreValueEl = document.getElementById("finalScoreValue");
const submitQuizEl = document.getElementById("submitQuizBtn");
//High Scores Page
const highScoreContainerEl = document.getElementById("highScoreContainer");
const highScoresListEl = document.getElementById("highScoresList");
const highScoreBackEl = document.getElementById("highScoreBackBtn");
const highScoreClearEl = document.getElementById("highScoreClearBtn");
//Question list elements
const questionEl = document.getElementById("questionPrompt");
const answerAEl = document.getElementById("answerA");
const answerBEl = document.getElementById("answerB");
const answerCEl = document.getElementById("answerC");
const answerDEl = document.getElementById("answerD");
//Set global variables
let index = 0;
var countDown = 90;
var obj = {};

startButtonEl.addEventListener("click", () => {
  resetTimer();
  displayQuestion();
});

finalScoreForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector("input[type=text]").value;
  const divEl = document.createElement("div");
  divEl.classList.add("highScore");
  divEl.innerHTML = `${name} - ${countDown}`;
  highScoresListEl.appendChild(divEl);
  displayHighScore();
});

highScoreBackEl.addEventListener("click", () => {
  displayStartQuiz();
});

highScoreClearEl.addEventListener("click", () => {
  while (highScoresListEl.lastElementChild) {
    highScoresListEl.removeChild(highScoresListEl.lastElementChild);
  }
});

function displayStartQuiz() {
  index = 0;
  countDown = 90;
  timeEl.innerHTML = `Time: ${countDown}`;
  startContainerEl.style.display = "flex";
  questionContainerEl.style.display = "none";
  finalScoreContainerEl.style.display = "none";
  highScoreContainerEl.style.display = "none";
}

function displayQuestion() {
  let q = questionsList[index];
  questionEl.innerHTML = q.question;
  answerAEl.innerHTML = q.answera;
  answerBEl.innerHTML = q.answerb;
  answerCEl.innerHTML = q.answerc;
  answerDEl.innerHTML = q.answerd;
  startContainerEl.style.display = "none";
  questionContainerEl.style.display = "flex";
  finalScoreContainerEl.style.display = "none";
  highScoreContainerEl.style.display = "none";
}

function displayFinalScore() {
  finalScoreValueEl.innerText = `Your final score is: ${countDown} seconds`;
  startContainerEl.style.display = "none";
  questionContainerEl.style.display = "none";
  finalScoreContainerEl.style.display = "flex";
  highScoreContainerEl.style.display = "none";
}

function displayHighScore() {
  startContainerEl.style.display = "none";
  questionContainerEl.style.display = "none";
  finalScoreContainerEl.style.display = "none";
  highScoreContainerEl.style.display = "flex";
}

function resetTimer() {
  timeEl.innerHTML = `Time: ${countDown}`;
  var x = setInterval(function () {
    countDown--;
    // Display the result in the element with id="demo"
    timeEl.innerHTML = `Time: ${countDown}`;
    // If the count down is finished, write some text
    if (index === questionsList.length) {
      clearInterval(x);
      timeEl.innerHTML = "COMPLETED";
      displayFinalScore();
    }
    if (countDown < 1) {
      clearInterval(x);
      timeEl.innerHTML = "EXPIRED";
      displayFinalScore();
    }
    if (highScoreContainerEl.style.display == "flex") {
      clearInterval(x);
      index = 0;
      countDown = 90;
      timeEl.innerHTML = `Time: ${countDown}`;
    }
  }, 1000);
}

function checkAnswer(userAnswer) {
  let correctAns = questionsList[index].correct;
  questionLineBrEl.style.display = "flex";
  questionResultEl.style.display = "flex";
  if (userAnswer == correctAns) {
    questionResultEl.innerText = `Correct`;
    index++;
  } else {
    countDown = countDown - 10;
    timeEl.innerHTML = `Time: ${countDown}`;
    questionResultEl.innerText = `Incorrect`;
    index++;
  }
  if (index < questionsList.length) {
    displayQuestion();
  } else {
    timeEl.innerHTML = "COMPLETED";
    displayFinalScore();
  }
}
