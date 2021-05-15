const startButton = document.getElementById("startButton");
const quizRules = document.getElementById("quizRules");
const qrQuitButton = document.getElementById("quitButton");
const qrContinueButton = document.getElementById("continueButton");
const quizBody = document.getElementById("quizBody");
const questionText = document.getElementById("questions");
const answers = document.getElementById("answers");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");
const totalQuestions = document.getElementById("totalQuestions");
const resultsTotalQuestions = document.getElementById("resultsTotalQuestions");
const answerChoices = document.querySelectorAll("choice");
const timerClock = document.getElementById("timerTime");
const quizResults = document.getElementById("quizResults");
const resultsSaveButton = document.getElementById("resultsSave");
const resultsRestartButton = document.getElementById("resultsRestart");
const resultsBest = document.getElementById("resultsBest");
const userName = document.getElementById("userName");
const userScore = document.getElementById("userScore");
const userNameInput = document.getElementById("userNameInput");

let quizBankIndex = 0;
let userAnswer = null;
let correctAnswerCount = 0;
let fiveMinutes = 60 * 5;

// on click of start button transitions quiz rules in by adding class that reveals
startButton.onclick = ()=>{
    quizRules.classList.add("activateDivs");
}

// on click goes back to the quiz start button
qrQuitButton.onclick = ()=>{
    quizRules.classList.remove("activateDivs");
}

// on click starts the quiz with first question
qrContinueButton.onclick = ()=>{
    quizRules.classList.remove("activateDivs");
    quizBody.classList.add("activateDivs");
    retrieveQuestion(0);
    countDown(fiveMinutes);
}

// reloads the page to start over again
resultsRestartButton.onclick = ()=>{
    location.reload();
}

// changes color back to original on wrong answer
answers.addEventListener("click", function(){
    var self = quizBody;
        oldBg = quizBody.style.background;
    setTimeout(function(){
        self.style.background = oldBg;
    }, 150);
})

// creates an array of high scorers trying to save their score into local storage to be retrieved later for comparison
resultsSaveButton.addEventListener("click", function(event){
    event.preventDefault();
    let highScorers = [];
    let highScoreName = userNameInput.value.trim();
    // localStorage.setItem('correctAnswers', correctAnswerCount);

    // user must put in a name or storing will not happen and tells player to put in a name
    if(highScoreName === ""){
        alert("Please enter your name if you wish to save!");
        return;
    }
    
    highScorers = JSON.parse(localStorage.getItem("highScorers")) || [];
    highScorers.push(highScoreName + " : " + correctAnswerCount);

    // immediately generate high score saved and display on the score board before being stored away on local storage for next run
    let ul = document.getElementById("highScorePlacement");
    let name = highScoreName + " : " + correctAnswerCount;
    let li = document.createElement("li");

    li.appendChild(document.createTextNode(name));
    ul.appendChild(li);

    localStorage.setItem("highScorers", JSON.stringify(highScorers));

    userNameInput.value = "";
})

// retrieve questions from array of stored question objects and innerText to display in body
function retrieveQuestion(index){
    let retrievedQuestion = "[" + quizBank[index].number + "] " + quizBank[index].question;
    let retrievedAnswerA = quizBank[index].answers.a;
    let retrievedAnswerB = quizBank[index].answers.b;
    let retrievedAnswerC = quizBank[index].answers.c;
    let retrievedAnswerD = quizBank[index].answers.d;
    let correctAnswer = quizBank[quizBankIndex].correctAnswer;

    // prints object definition into proper divs to present question and answer choices
    questionText.innerText = retrievedQuestion;
    answerA.innerText = retrievedAnswerA;
    answerB.innerText = retrievedAnswerB;
    answerC.innerText = retrievedAnswerC;
    answerD.innerText = retrievedAnswerD;

    // keeps track of question count
    totalQuestions.innerText = quizBank[index].number + " out of " + quizBank.length + " Questions"
    resultsTotalQuestions.innerText = quizBank.length;
}

// time starting function sets to duration to be filled by fiveMinutes defined on line 19
function countDown(duration) {
    var timer = duration, minutes, seconds;
    // interval function to mimic countdown set to minutes and seconds
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerClock.innerText = minutes + ":" + seconds;

        // ends quiz if time hits 0
        if (--timer < 0) {
            timer = duration;
            quizResultsReveal();
        }
        // on choosing an answer display the next question and also flash red if answer is wrong
        answers.onclick = (e)=>{
            //checks for user answer by equating clicked line item by its assigned data-value to be compared with correctAnswer value
            userAnswer = e.target.getAttribute('data-value');
            correctAnswer = quizBank[quizBankIndex].correctAnswer;
            
            // flashes green if correct answer and stores it to be called so it can be concatenate with username before being stored
            if(userAnswer == correctAnswer){
                chgColorRight();
                correctAnswerCount++;
                localStorage.setItem('correctAnswers', correctAnswerCount);
            }
            // decreases time by 3 seconds if wrong answer and flashes red
            if(userAnswer != correctAnswer){
                chgColorWrong();
                timer -= 30;
            }

            if(quizBankIndex < quizBank.length -1){
                quizBankIndex++;
                retrieveQuestion(quizBankIndex);
            }
            else{
                quizResultsReveal();
                let storedNames = JSON.parse(localStorage.getItem("highScorers"))
                
                // iterates over stored names and appends new player to display under high score column
                for (let i=0; i < storedNames.length; i++){
                    let ul = document.getElementById("highScorePlacement");
                    let name = storedNames[i];
                    let li = document.createElement("li");

                    li.appendChild(document.createTextNode(name));
                    ul.appendChild(li);
                }
            }

        }    
    }, 1000);

}

// end quiz and show results page with option to save results while removing quizBody
function quizResultsReveal(){
    quizBody.classList.remove("activateDivs");
    quizResults.classList.add("activateDivs");
    userScore.innerText = localStorage.getItem('correctAnswers');
}

// change screen color when wrong answer to change back for flashing effect
function chgColorWrong(){
    quizBody.style.backgroundColor = "red";
}

function chgColorRight(){
    quizBody.style.backgroundColor = "green";
}

// -------------------------QUIZ BANK BEGIN----------------------------------------

const quizBank = [
    {
        number: "1",
        question: "JavaScript is a _____-side programming language.",
        answers: {
            a: "Client",
            b: "Server",
            c: "Both",
            d: "None"
        },
        correctAnswer: "c"
    },
    {
        number: "2",
        question: "If you type the following code in the console window, what result will you get?\n'3 > 2 > 1 === false;'",
        answers: {
            a: "True",
            b: "False",
            c: null,
            d: null
        },
        correctAnswer: "b"
    },
    {
        number: "3",
        question: "Which of the following will write the message 'Hello DataFlair!' in an alert box?",
        answers: {
            a: "alertBox('Hello DataFlair!');",
            b: "alert(Hello DataFlair!);",
            c: "msgAlert('Hello DataFlair!');",
            d: "alert('Hello DataFlair!');"
        },
        correctAnswer: "d"
    },
    {
        number: "4",
        question: "How do you find the minimum of x and y using JavaScript?",
        answers: {
            a: "min(x,y);",
            b: "Math.min(x,y);",
            c: "Math.min(xy);",
            d: "min(xy);"
        },
        correctAnswer: "d"
    },
    {
        number: "5",
        question: "Which JavaScript label catches all the values, except for the ones specified?",
        answers: {
            a: "catch",
            b: "label",
            c: "try",
            d: "default"
        },
        correctAnswer: "d"
    },
    {
        number: "6",
        question: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        answers: {
            a: "if(x 2)",
            b: "if(x = 2)",
            c: "if(x == 2)",
            d: "if(x != 2 )"
        },
        correctAnswer: "c"
    },
    {
        number: "7",
        question: "What will this code return? 'Boolean(3<7)'",
        answers: {
            a: "true",
            b: "false",
            c: "NaN",
            d: "SyntaxError"
        },
        correctAnswer: "a"
    },
    {
        number: "8",
        question: "Which is the correct JavaScript syntax to change this HTML content? 'Hello World!'",
        answers: {
            a: "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
            b: "document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;",
            c: "document.getElementById(test).innerHTML = “Hello DataFlair!”;",
            d: "document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;"
        },
        correctAnswer: "a"
    },
    {
        number: "9",
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<javascript>",
            b: "<script>",
            c: "<scripting>",
            d: "<js>"
        },
        correctAnswer: "b"
    },
    {
        number: "10",
        question: "How do you write an 'if' statement for executing some code if 'i' is NOT equal to 5?",
        answers: {
            a: "if (i != 5)",
            b: "if i =! 5 then",
            c: "if i <> 5",
            d: "if (i <> 5)"
        },
        correctAnswer: "a"
    },
]
// -------------------------END OF QUIZ BANK-------------------------------------