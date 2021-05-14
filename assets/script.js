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

resultsSaveButton.addEventListener("click", function(event){
    event.preventDefault();
    let highScorers = [];
    let highScoreName = userNameInput.value.trim();
    // localStorage.setItem('correctAnswers', correctAnswerCount);

    if(highScoreName === ""){
        return;
    }
    
    highScorers = JSON.parse(localStorage.getItem("highScorers")) || [];
    highScorers.push(highScoreName + " : " + correctAnswerCount);
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
}

// time starting function sets to duration to be filled by fiveMinutes defined on line 19
function countDown(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerClock.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;

        }
        // on choosing an answer display the next question and also flash red if answer is wrong
        answers.onclick = (e)=>{
            //checks for user answer by equating clicked line item by its assigned data-value to be compared with correctAnswer value
            userAnswer = e.target.getAttribute('data-value');
            correctAnswer = quizBank[quizBankIndex].correctAnswer;

            if(userAnswer == correctAnswer){
                chgColorRight();
                correctAnswerCount++;
                console.log(correctAnswerCount);
                localStorage.setItem('correctAnswers', correctAnswerCount);
            }
            if(userAnswer != correctAnswer){
                chgColorWrong();
                timer -= 3;
            }

            if(quizBankIndex < quizBank.length -1){
                quizBankIndex++;
                retrieveQuestion(quizBankIndex);
            }
            else{
                console.log("QUIZ COMPLETE")
                quizResultsReveal();
                let storedNames = JSON.parse(localStorage.getItem("highScorers"))
                // console.log(storedNames[3])
                for (i=0; i < storedNames.length; i++){
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

// displays stored high scorers in local storage



// 6. if all questions are answered correctly or timer hits 0 game is over
// 7. when game is over present input for option to store score for local storage


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
    
]

// -------------------------END OF QUIZ BANK-------------------------------------