// DEPENDENCIES (DOM Elements)
var timeEl = document.getElementById("timer");
var questionTitle = document.querySelector("#question-title");
var startbutton = document.getElementById("startbutton");
var startQuiz = document.querySelector("#quiz");
var choiceEl = document.querySelector("#choices");
var scoreboardEl = document.querySelector("#scoreboard");
var container = document.querySelector(".choices");


// DATA
var secondsLeft = 60;
var currentQuestionIndex = 0;
var currentQuestion;

// Function to run the timer
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

//Function to run the quiz and display the questions, creates buttons for each answer choice
function beginQuiz(currentQuestionIndex) {
  localStorage.setItem("currentScore", 0);
  startQuiz.style.display = "none";
    currentQuestion = questionArray[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choiceEl.innerHTML = "";

  for (ans in currentQuestion.answers) {
    var buttonNode = document.createElement("button");
    buttonNode.setAttribute("class", "choices");
    buttonNode.setAttribute("value", currentQuestion.answers[ans]);
    buttonNode.textContent = currentQuestion.answers[ans];
    choiceEl.appendChild(buttonNode);
  };
};

// Function to stop the quiz when time is up, provide intitial entry, and display scorecard
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


// Questions to be asked during the quiz
var questionArray = [
  {
    question: "1. What does js stand for?",
    answers: {
      opt1: 'junior script',
      opt2: 'javascript',
      opt3: 'joviascript',
      opt4: 'java styles'
    },
    correctAnswer: 'javascript'
  },
  {
    question: "2. Where in your HTML file should the js script go?",
    answers: {
      opt1: 'right before the close of the body element',
      opt2: 'in the head element',
      opt3: 'at the very end of the page',
      opt4: 'in the same line as DOCTYPE'
    },
    correctAnswer: 'right before the close of the body element'
  },
  {
    question: "3. Which of these is NOT a primitive?",
    answers: {
      opt1: 'boolean',
      opt2: 'function',
      opt3: 'string',
      opt4: 'number'
    },
    correctAnswer: 'function'
  },
  {
    question: "4. Arrays are wrapped in which of these?",
    answers: {
      opt1: 'parentheses',
      opt2: 'square brackets',
      opt3: 'curly brackets',
      opt4: 'single quotation marks'
    },
    correctAnswer: 'square brackets'
  },
  {
    question: "5. Which of these often accompanies an 'if' statement?",
    answers: {
      opt1: 'how',
      opt2: 'so that',
      opt3: 'because',
      opt4: 'else'
    },
    correctAnswer: 'else'
  },
  {
    question: "6. Why are for-loops used?",
    answers: {
      opt1: 'they stop functions from repeating',
      opt2: 'to use more lines of code',
      opt3: 'so each object in the array is included',
      opt4: 'no one really knows'
    },
    correctAnswer: 'so each object in the array is included'
  },
];

// Sets the start button to run the timer and start the quiz when clicked
startbutton.onclick = function () {
  setTime();
  beginQuiz(currentQuestionIndex);
}

// Function to determine if selected choice is correct, tallies score, handles penalties
container.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  var element = event.target;
  if (element.matches(".choices")) {
    var answer = element.getAttribute("value");

    if (answer === currentQuestion.correctAnswer) {
      localStorage.setItem("isPreviousAnswerCorrect",true);
      var currentScore = parseInt(localStorage.getItem("currentScore"))+1;
      console.log(currentScore);
      localStorage.setItem("currentScore", currentScore);
      console.log("Current score = "+currentScore);
      console.log("isPrevious = "+localStorage.getItem("isPreviousAnswerCorrect"));
    } else {
      localStorage.setItem("isPreviousAnswerCorrect",false);
      if (secondsLeft > 5) {
        secondsLeft = secondsLeft -5;
      };
    };
  }
  
  if(currentQuestionIndex < questionArray.length -1){
    currentQuestionIndex++;
    beginQuiz(currentQuestionIndex);
  } else {
    sendMessage(false);
  };
});