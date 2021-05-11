const startButton = document.getElementById("startButton")
const quizRules = document.getElementById("quizRules")
const qrQuitButton = document.getElementById("quitButton")
const qrContinueButton = document.getElementById("continueButton")
const quizBody = document.getElementById("quizBody")
const questionText = document.getElementById("questions");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");

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
    retrieveQuestion();
}

// -------------------------QUIZ BANK BEGIN----------------------------------------

const quizBank = [
    {
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
        question: "If you type the following code in the console window, what result will you get?\n'3 > 2 > 1 === false;'",
        answers: {
            a: "True",
            b: "False"
        },
        correctAnswer: "b"
    },
    {
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

let numberOfQuestions = 0;

// retrieve questions from array of stored question objects and innerText to display in body
function retrieveQuestion(){
    let retrievedQuestion = quizBank[0].question;
    let retrievedAnswerA = quizBank[0].answers;
    let retrievedAnswerB = quizBank[0].answers[1];
    let retrievedAnswerC = quizBank[0].answers[2];
    let retrievedAnswerD = quizBank[0].answers[3];

    questionText.innerText = retrievedQuestion;
    answerA.innerText = retrievedAnswerA;
    answerB.innerText = retrievedAnswerB;
    answerC.innerText = retrievedAnswerC;
    answerD.innerText = retrievedAnswerD;
}

// 1. start button: when clicked it starts timer and shows first question
// 2. list items for answer selections: when answer is chosen reveal correctness of answer
// 3. keep track of the number of correct answers to be recalled for final score
// 4. when question is answered correctly replace question with new question
// 5. when question is answered incorrectly subtract time from timer
// 6. if all questions are answered correctly or timer hits 0 game is over
// 7. when game is over present input for option to store score for local storage