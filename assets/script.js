var timeEl = document.getElementById("timer");
var task = document.getElementById("question");
var startbutton = document.getElementById("startbutton");
var secondsLeft = 6;

function setTime() {
  var timerInterval = setInterval(function() {
    timeEl.textContent = secondsLeft + " seconds left";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    //sendMessage(true);
    //play sound?
    //enter initials in form box (saved to high scores if >= 5th place)
    //show final score and play again option
    } 
    secondsLeft--;
  }, 1000);
}

var answerList = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

function beginQuiz() {

    for (var i = 0; i < questionArray.length; i++) {
        var quest = questionArray[i].question;
        var ans = questionArray[i].answers;
        var correctAns = questionArray[i].correctAnswer;

        questionArray[i].onclick = (function() {
            return function() {
                task.textContent = quest;

        li1.textContent= ans.opt1;
        li2.textContent= ans.opt2;
        li3.textContent= ans.opt3;
        li4.textContent= ans.opt4;
        // alert(quest);
        task.appendChild(answerList);

        answerList.appendChild(li1);
        answerList.appendChild(li2);
        answerList.appendChild(li3);
        answerList.appendChild(li4);

        answerList.setAttribute("style", "background-color: #333333; padding: 20px;");
        answerList.setAttribute("class", "anslist");
        li1.setAttribute("class", "anslist");
        li2.setAttribute("class", "anslist");
        li3.setAttribute("class", "anslist");
        li4.setAttribute("class", "anslist");
        task.setAttribute("style", "margin-bottom: 20px");
        li1.setAttribute("style", "color: white; background: gray; padding: 10px; margin-left: 35px; margin-bottom: 20px");
        li2.setAttribute("style", "color: white; background: gray; padding: 10px; margin-left: 35px; margin-bottom: 20px");
        li3.setAttribute("style", "color: white; background: gray; padding: 10px; margin-left: 35px; margin-bottom: 20px");
        li4.setAttribute("style", "color: white; background: gray; padding: 10px; margin-left: 35px; margin-bottom: 20px");
        
        answerList.addEventListener("click", function(event) {
            var element = event.target;

            if (element.matches(".anslist")) {
                var state = element.textContent;
                if (state === correctAns) {
                // alert("correct");
                    //add to tally, go to next question and show correct at bottom of next question
                } else {
                    // alert("wrong");
                    secondsLeft = secondsLeft -10;
                    //go to next and show incor
                }
            }
          });

        };
    });

        
};

answerList.addEventListener("click", beginQuiz);

function sendMessage(isTimeUp) {
    if (isTimeUp === true) {
        timeEl.textContent = "Time is up!";
    } else {
        timeEl.textContent = "Quiz Over";
    }
    var done = document.getElementById("question")
    done.textContent = "Quiz Over!"
    var input = document.createElement("input");
    document.getElementById("quiz").appendChild(input);
    localStorage.setItem("Initials", input);
}

startbutton.addEventListener("click", function() {
    setTime();
    startbutton.remove();
    beginQuiz();
})

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
        question: "ABC1",
        answers: {
          opt1: 'DEF1',
          opt2: 'GHI1',
          opt3: 'JKL1',
          opt4: 'MNO1'
        },
        correctAnswer: 'DEF1'
      },
      {
        question: "tjtjetje",
        answers: {
          opt1: 'DEF1',
          opt2: 'GHI1',
          opt3: 'JKL1',
          opt4: 'MNO1'
        },
        correctAnswer: 'DEF1'
      },
  ];
}
