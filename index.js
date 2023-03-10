//https://www.youtube.com/watch?v=49pYIMygIcU&ab_channel=CodeExplained
//https://www.youtube.com/watch?v=Nx2AhrCIlXE&ab_channel=TheNetNinja
//https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2506s&ab_channel=BrianDesign

const questionsList = [
  {
    question: "What is the proper method to listen for an event?",
    answera: "EventTarget.hearEvent()",
    answerb: "EventTarget.waitForEvent",
    answerc: "EventTarget.addEventListener()",
    answerd: "EventTarget.event()",
    correct: "answerC",
  },
  {
    question:
      "What method repeatedly calls a function with a fixed time delay?",
    answera: "setTimeout()",
    answerb: "clearInterval()",
    answerc: "setInterval()",
    answerd: "timeDelay()",
    correct: "answerC",
  },
  {
    question:
      "To add an element to the DOM you must createElement and then use which method?",
    answera: "include()",
    answerb: "add()",
    answerc: "push()",
    answerd: "append()",
    correct: "answerD",
  },
  {
    question:
      "When called inside an arrow function, what does 'this' refer to?",
    answera: "the window object",
    answerb: "the nearest object",
    answerc: "event.target",
    answerd: "the first argument passed",
    correct: "answerA",
  },
  {
    question: `Which is not a method to select a DOM element node?`,
    answera: "getElementById",
    answerb: "getElementByClass",
    answerc: "querySelector",
    answerd: "querySelectorAll",
    correct: "answerB",
  },
];
document.querySelectorAll;
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
const topBarScoresEl = document.getElementById("topBarScores");
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
var scoresArray = [];

//once start button is clicked, begin the quiz with question 1 and a fresh timer
startButtonEl.addEventListener("click", function () {
  questionLineBrEl.style.visibility = "hidden";
  questionResultEl.style.visibility = "hidden";
  resetTimer();
  displayQuestion();
});

//validate user initials input
function containsSpecialChars(str) {
  const specialChars = /[ 1234567890`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

//if the user submits their initials then the high score list will sort the new data with current data
finalScoreForm.addEventListener("submit", function (e) {
  e.preventDefault();
  while (highScoresListEl.lastElementChild) {
    highScoresListEl.removeChild(highScoresListEl.lastElementChild);
  }
  const name = document.querySelector("input[type=text]").value;
  if (name.length !== 2 || containsSpecialChars(String(name))) {
    throw new Error(alert("Invalid entry: only use alphabetic characters."));
  }
  scoresArray.push([String(name).toUpperCase(), countDown]);
  scoresArray.sort(function (a, b) {
    return a[1] - b[1];
  });
  scoresArray.reverse();
  //creates all divs in the high scores list
  for (let i = 0; i < scoresArray.length; i++) {
    let first = scoresArray[i][0];
    let second = scoresArray[i][1];
    const divEl = document.createElement("div");
    divEl.classList.add("highScore");
    divEl.innerHTML = first + " - " + second;
    highScoresListEl.appendChild(divEl);
  }
  displayHighScore();
});

//restart quiz when the 'go back' button is hit
highScoreBackEl.addEventListener("click", displayStartQuiz);

//display high scores  when the 'View high scores' text is hit
topBarScoresEl.addEventListener("click", displayHighScore);

//clear high scores when 'clear high scores' is hit
highScoreClearEl.addEventListener("click", () => {
  while (highScoresListEl.lastElementChild) {
    highScoresListEl.removeChild(highScoresListEl.lastElementChild);
  }
  scoresArray = [];
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
  topBarScoresEl.addEventListener("click", displayHighScore);
  startContainerEl.style.display = "none";
  questionContainerEl.style.display = "none";
  finalScoreContainerEl.style.display = "none";
  highScoreContainerEl.style.display = "flex";
}

//sets the timers when quiz starts.
function resetTimer() {
  timeEl.innerHTML = `Time: ${countDown}`;
  var x = setInterval(function () {
    //if we reach the end of the questions, end
    if (index === questionsList.length) {
      clearInterval(x);
      return;
    }
    //if we decide to view high scores at any point, end
    if (highScoreContainerEl.style.display == "flex") {
      clearInterval(x);
      index = 0;
      countDown = 90;
      timeEl.innerHTML = `Time: ${countDown}`;
      return;
    }
    //if the countdown reaches 0, end
    if (countDown == 0) {
      clearInterval(x);
      timeEl.innerHTML = "EXPIRED";
      displayFinalScore();
      return;
    }
    countDown--;
    timeEl.innerHTML = `Time: ${countDown}`;
  }, 1000);
}

function checkAnswer(userAnswer) {
  let correctAns = questionsList[index].correct;
  questionLineBrEl.style.visibility = "visible";
  questionResultEl.style.visibility = "visible";
  const myTimeout = setTimeout(() => {
    questionLineBrEl.style.visibility = "hidden";
    questionResultEl.style.visibility = "hidden";
  }, 1000);

  if (userAnswer == correctAns) {
    questionResultEl.innerText = `Correct`;
    index++;
  } else {
    countDown = countDown - 10;
    questionResultEl.innerText = `Incorrect`;
    index++;
  }
  if (index < questionsList.length) {
    //dont want the user to display high scores while the next question is rendering
    topBarScoresEl.removeEventListener("click", displayHighScore);
    const myTimeout = setTimeout(() => {
      //give user back functionality after new question renders
      topBarScoresEl.addEventListener("click", displayHighScore);
      displayQuestion();
    }, 1000);
  } else {
    //dont want the user to display high scores while the final question is rendering
    //functionality is given back once High Scores are visible
    topBarScoresEl.removeEventListener("click", displayHighScore);
    timeEl.innerHTML = "COMPLETED";
    const myTimeout = setTimeout(() => {
      displayFinalScore();
    }, 1000);
  }
}
