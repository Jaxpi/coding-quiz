var timeEl = document.getElementById("timer");
var questionTitle = document.querySelector("#question-title");
var startbutton = document.getElementById("startbutton");
var secondsLeft = 60;
var startQuiz = document.querySelector("#quiz");
var currentQuestionIndex = 0;
var choiceEl = document.querySelector("#choices");
var scoreboardEl = document.querySelector("#scoreboard");

function setTime() {
  var timerInterval = setInterval(function () {
    timeEl.textContent = secondsLeft + " seconds left";
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage(true);
    } else {
      secondsLeft--;
    }
  }, 1000);
}

function beginQuiz(currentQuestionIndex) {
  localStorage.setItem("currentScore", 0);
  startQuiz.style.display = "none";
    var currentQuestion = questionArray[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choiceEl.innerHTML = "";

  for (ans in currentQuestion.answers) {
    var buttonNode = document.createElement("button");
    buttonNode.setAttribute("class", "choices");
    buttonNode.setAttribute("value", currentQuestion.answers[ans]);
    buttonNode.textContent = currentQuestion.answers[ans];
    choiceEl.appendChild(buttonNode);
  };

  var container = document.querySelector(".choices");

  container.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var element = event.target;
    if (element.matches(".choices")) {
      var answer = element.getAttribute("value");

      if (answer === currentQuestion.correctAnswer) {
        localStorage.setItem("isPreviousAnswerCorrect",true);
        var currentScore = parseInt(localStorage.getItem("currentScore"))+1;
        localStorage.setItem("currentScore", currentScore);
        console.log("Current score = "+currentScore);
        console.log("isPrevious = "+localStorage.getItem("isPreviousAnswerCorrect"));
      } else {
        localStorage.setItem("isPreviousAnswerCorrect",false);
        if (secondsLeft > 5) {
          secondsLeft = secondsLeft -5;
        };
      }
    }
    if(currentQuestionIndex < questionArray.length -1){
      currentQuestionIndex++;
      beginQuiz(currentQuestionIndex);
    } else {
      sendMessage(false);
    };
  });
};

function sendMessage(isTimeUp) {
  if (isTimeUp === true) {
    timeEl.textContent = "Time is up!";
  } else if (isTimeUp === false) {
    timeEl.textContent = "Quiz Over";
  }
  var done = document.getElementById("questions")
  done.textContent = "Quiz Over!";

  var label = document.createElement("Label");
  label.innerHTML = "Enter Initials ";
  var input = document.createElement("input");
  input.type="text";
  localStorage.setItem("Initials", input);
  input.setAttribute("class", "scorecard");
  input.setAttribute("value", "");
  input.setAttribute("style", "line-height: 32px");
  input.textContent = "";
  done.appendChild(document.createElement("BR"));
  done.appendChild(label);
  done.appendChild(input);

  scoreboardEl.textContent = "Your Score Is: " + localStorage.getItem("currentScore");
}

var questionArray = [
  {
    question: "What does js stand for?",
    answers: {
      opt1: 'junior script',
      opt2: 'javascript',
      opt3: 'joviascript',
      opt4: 'java styles'
    },
    correctAnswer: 'javascript'
  },
  {
    question: "Question 2",
    answers: {
      opt1: 'correct',
      opt2: 'GHI1',
      opt3: 'JKL1',
      opt4: 'MNO1'
    },
    correctAnswer: 'correct'
  },
  {
    question: "Question 3",
    answers: {
      opt1: 'DEF1',
      opt2: 'correct',
      opt3: 'JKL1',
      opt4: 'MNO1'
    },
    correctAnswer: 'correct'
  },
];

startbutton.onclick = function () {
  setTime();
  beginQuiz(currentQuestionIndex);
}