// DEPENDENCIES (DOM Elements) that are global and will be used in multiple places
var timeEl = document.getElementById("timer");
var questionTitle = document.querySelector("#question-title");
var startbutton = document.getElementById("startbutton");
var startQuiz = document.querySelector("#quiz");
var choiceEl = document.querySelector("#choices");
var scoreboardEl = document.querySelector("#scoreboard");
var container = document.querySelector(".choices");
var scorecard = document.getElementById("scorecard");
var highscoresEl = document.getElementById("highscores");
var scoresEl = document.getElementById("scores");

// DATA that is used in multiple places
var secondsLeft = 60;
var currentQuestionIndex = 0;
var currentQuestion;
var timerInterval;

// Function to run the timer that starts it at 60 and has it decrease by 1 every second, if timer reaches zero then do the sendmessage function with an argument of true
function setTime() {
  timerInterval = setInterval(function () {
    timeEl.textContent = secondsLeft + " seconds left";
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage(true);
    } else {
      secondsLeft--;
    }
  }, 1000);
}

//Function to run the quiz at the determined index, hides the initial start quiz elements, and display the questions, creates buttons for each answer choice and add to the container section created
function beginQuiz(currentQuestionIndex) {
  startQuiz.style.display = "none";
  choiceEl.style.display = "flex";
  currentQuestion = questionArray[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  choiceEl.innerHTML = "";

  for (const ans in currentQuestion.answers) {
    var buttonNode = document.createElement("button");
    buttonNode.setAttribute("class", "choices");
    buttonNode.setAttribute("value", currentQuestion.answers[ans]);
    buttonNode.textContent = currentQuestion.answers[ans];
    choiceEl.appendChild(buttonNode);
  }
}

// Function to stop the quiz when time is up, provide intitial entry, listens for keydown events in the input field when Enter is pressed then run handleEnter function, and display scoreboard with current score value
function sendMessage(isTimeUp) {
  if (isTimeUp === true) {
    timeEl.textContent = "Time is up!";
  } else {
    timeEl.textContent = "Quiz Over";
    clearInterval(timerInterval);
  }
  var done = document.getElementById("questions");
  done.textContent = "Quiz Over!";

  var label = document.createElement("Label");
  label.textContent = "Enter Initials: ";
  var input = document.createElement("input");
  input.type = "text";
  input.addEventListener("keydown", function (event) {
    console.log(event);
    if (event.key === "Enter") {
      handleEnter(event);
    }
  });
  localStorage.setItem("Initials", input);
  input.setAttribute("class", "scorecard");
  input.setAttribute("value", "");
  input.setAttribute("style", "line-height: 32px");
  input.textContent = "";
  done.appendChild(document.createElement("BR"));
  done.appendChild(label);
  done.appendChild(input);

  scoreboardEl.textContent =
    "Your Score Is: " + localStorage.getItem("currentScore");
}

// Sets the start button to run the timer and start the quiz at question index 0 and a current score of 0 when clicked
startbutton.onclick = function () {
  setTime();
  localStorage.setItem("currentScore", 0);
  beginQuiz(currentQuestionIndex);
};

// If a click occurs on a choice button and it matches the correct answer then store that the previous answer was correct and display that at the bottom of the next question section and also add 1 to the current score - if the clicked button does not equal the correct answer then do the same but display incorrect instead of correct and reduce the timer by 5 seconds instead of adding a point to current score
container.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  console.log(event);
  event.preventDefault();
  event.stopPropagation();
  var element = event.target;
  var answer = element.getAttribute("value");
  document.getElementById("feedback").innerHTML = "";
  if (answer === currentQuestion.correctAnswer) {
    localStorage.setItem("isPreviousAnswerCorrect", true);
    var previousEl = document.createElement("h3");
    previousEl.textContent = "Correct!";
    var previous = document.getElementById("feedback");
    previous.appendChild(previousEl);

    console.log(localStorage.getItem("currentScore"));
    var currentScore = parseInt(localStorage.getItem("currentScore")) + 1;
    console.log(currentScore);
    localStorage.setItem("currentScore", currentScore);
    console.log("Current score = " + currentScore);
    console.log(
      "isPrevious = " + localStorage.getItem("isPreviousAnswerCorrect")
    );
  } else {
    localStorage.setItem("isPreviousAnswerCorrect", false);

    var previousEl = document.createElement("h3");
    previousEl.textContent = "Incorrect!";
    var previous = document.getElementById("feedback");
    previous.appendChild(previousEl);

    var currentScore = parseInt(localStorage.getItem("currentScore"));
    console.log("Current score = " + currentScore);
    console.log(
      "isPrevious = " + localStorage.getItem("isPreviousAnswerCorrect")
    );
    if (secondsLeft > 5) {
      secondsLeft = secondsLeft - 5;
    }
  }

  // If there are still more questions to be asked then increase the index by 1 and run the quiz function again with the new index, otherwise have the timer display "quiz over" and show the high scores if any exist
  if (currentQuestionIndex < questionArray.length - 1) {
    currentQuestionIndex++;
    beginQuiz(currentQuestionIndex);
  } else {
    document.getElementById("feedback").innerHTML = "";
    sendMessage(false);
    if (localStorage.getItem("highscores")) {
      loadHigh();
    }
  }
});

// Upon enter in input field, create object in array with key value pair for initials and current score - if highscores exists then push adds new inputs to array without over-writing previous ones, if not then enters the new data to local storage - after entering it hides the input field and label and refreshes the high scores list to include new entry (if top 5)
function handleEnter(event) {
  const highscores = JSON.parse(localStorage.getItem("highscores"));
  var currentScore = parseInt(localStorage.getItem("currentScore"));
  var initials = event.target.value;
  if (highscores) {
    console.log(highscores + "highscores");
    highscores.push({ initials: initials, score: currentScore });
    localStorage.setItem("highscores", JSON.stringify(highscores));
  } else {
    localStorage.setItem(
      "highscores",
      JSON.stringify([
        {
          initials: initials,
          score: currentScore,
        },
      ])
    );
  }
  document.getElementById("scores");
  event.target.style.display = "none";
  document.querySelector("label").style.display = "none";
  loadHigh();
}
// This function displays the high scores that are stored in local storage by clearing the high scores element then creating an oredered list of up to 5 items composed of the 5 stored high scores with the highest score value in descending order and appends the items to the list and the list to the highscoresEl determined using the variable at the top
function loadHigh(event) {
  highscoresEl.innerHTML = "High Scores:";
  var orderedListEl = document.createElement("ol");
  const highscores = JSON.parse(localStorage.getItem("highscores"));
  highscores.sort(scoreSort);
  const numberOfScores = Math.min(highscores.length, 5);
  for (let i = 0; i < numberOfScores; i++) {
    console.log(highscores[i]);
    const highscoreLI = document.createElement("li");
    highscoreLI.textContent =
      highscores[i].initials + ": " + highscores[i].score;
    orderedListEl.appendChild(highscoreLI);
  }
  highscoresEl.appendChild(orderedListEl);
}

// This function determines the sort to be descending (a-b is ascending, b-a is descending)
function scoreSort(a, b) {
  return b.score - a.score;
}

// This displays the high scores when the view high scores element is clicked on, but only if there are highscores stored in local storage
scoresEl.addEventListener("click", function (event) {
  if (localStorage.getItem("highscores")) {
    loadHigh();
  }
});

// Questions to be asked during the quiz and the determined correct answer for comparison
var questionArray = [
  {
    question: "1. What does js stand for?",
    answers: {
      opt1: "junior script",
      opt2: "javascript",
      opt3: "joviascript",
      opt4: "java styles",
    },
    correctAnswer: "javascript",
  },
  {
    question: "2. Where in your HTML file should the js script go?",
    answers: {
      opt1: "right before the close of the body element",
      opt2: "in the head element",
      opt3: "at the very end of the page",
      opt4: "in the same line as DOCTYPE",
    },
    correctAnswer: "right before the close of the body element",
  },
  {
    question: "3. Which of these is NOT a primitive?",
    answers: {
      opt1: "boolean",
      opt2: "function",
      opt3: "string",
      opt4: "number",
    },
    correctAnswer: "function",
  },
  {
    question: "4. Arrays are wrapped in which of these?",
    answers: {
      opt1: "parentheses",
      opt2: "square brackets",
      opt3: "curly brackets",
      opt4: "single quotation marks",
    },
    correctAnswer: "square brackets",
  },
  {
    question: "5. Which of these often accompanies an 'if' statement?",
    answers: {
      opt1: "how",
      opt2: "so that",
      opt3: "because",
      opt4: "else",
    },
    correctAnswer: "else",
  },
  {
    question: "6. Why are for-loops used?",
    answers: {
      opt1: "they stop functions from repeating",
      opt2: "to use more lines of code",
      opt3: "so each object in the array is included",
      opt4: "no one really knows",
    },
    correctAnswer: "so each object in the array is included",
  },
];
