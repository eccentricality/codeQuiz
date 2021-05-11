const quizContainer = document.getElementById("quizContainer")
const resultsContainer = document.getElementById("resultsContainer")
const startButton = document.getElementById("startButton")


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

window.onload = function() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
}

startButton.onclick = function() {
    if (startMenu.style.display !== 'none') {
        startMenu.style.display = 'none';
    }
    else {
        startMenu.style.display = 'block';

    };
    quizContainer.style.display = 'block';
}

// function to display the quiz
function displayQuiz(){

}

// function to display the results
function displayResults(){

}



// 1. start button: when clicked it starts timer and presents first question
// 2. list items for answer selections: when answer is chosen reveal correctness of answer
// 3. keep track of the number of correct answers to be recalled for final score
// 4. when question is answered correctly replace question with new question
// 5. when question is answered incorrectly subtract time from timer
// 6. if all questions are answered correctly or timer hits 0 game is over
// 7. when game is over present input for option to store score for local storage