var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var quiz = document.querySelector("#quiz");
var questionsElement = document.querySelector("#questions");
var choices = document.querySelector(".choices");
var results = document.querySelector("#results");
var choicesClass = document.querySelector(".choicesClass");
var correctElement = document.querySelector("#correct");
var wrongElement = document.querySelector("#wrong");
var nextElement = document.querySelector("#nextBtn");
var initialsEl = document.querySelector("initials");
var runningQuestion = 0;
var count = 50;
var highScores = [];


var questions = [
    {
        question: "What does HTML stand for __________.",
        choices: ["A. Hypertext Markup Language", "B. Hyper Mark Language", "C. JSON", "D. Height"],
        answer: "A. Hypertext Markup Language"
    },
    {
        question: "What does CSS stand for _____________.",
        choices: ["A. Cascading Style Sheets", "B. Cascading Sheets Style", "C. Cascading Sheep style", "D. Computer Style Sheets"],
        answer: "A. Cascading Style Sheets"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: [" A. <h6>", "B. <head>", "C. <heading>", "D. <h1>"],
        answer: "D. <h1>"
    },
    {
        question: "What is the correct JavaScript syntax to change the contact of the HTML element below?",
        choices: ["A. document.getElementById(\"demo\").innerHTML = \"Hello World\"", "B. document.getElement(\"p\").innerHTML = Hello World!", "C. #demo.innerHTML = \"Hello World!;\"", "D.document.getElementByNamw(\"p\").innerHTML = Hello World!"],
        answer: "A. document.getElementById(\"demo\").innerHTML = \"Hello World\""
    },
    {
        question: "What is the correct HTML for referring to an external style sheet",
        choices: ["A. <stylesheet>mystyles.css</stylesheet>", "B. <style src= \"mystyle.css\">", "C. <link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", "D. <linkin rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">"],
        answer: "C. <link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">"


    }
]

start.addEventListener("click", startGame)

function startGame() {
    interval = setInterval(function () {
        count -= 1;
        timer.textContent = ("TIMER: " + count);

        if (count === 0) {
            clearInterval(interval);
            score();
        };

    }, 1000);

    start.style.display = 'none';

    renderQuestion();
}

function renderQuestion() {
    if (runningQuestion === questions.length) {
        clearInterval(interval);

        const finalScore = document.getElementById("final-score");
        finalScore.textContent = count;
        score();
    
    };

    var q = questions[runningQuestion];
    choices.innerHTML = "";
    questionsElement.innerHTML = "<p>" + q.question + "</p>";
    for (var i = 0; i < q.choices.length; i++) {

        var p = document.createElement("p");
        p.setAttribute('class', "choicesClass");
        p.textContent = q.choices[i];
        choices.append(p);
    };

    quiz.style.display = 'block';

};


document.addEventListener("click", function () {
    if (event.target.matches("p")) {

        if (event.target.textContent === questions[runningQuestion].answer) {
            correctElement.textContent = "CORRECT"
            correctElement.style.display = 'block';
            runningQuestion++;


        } else {
            wrongElement.textContent = "WRONG";
            wrongElement.style.display = 'block';
            runningQuestion++;
            count -= 6;

        };

    }

});

nextElement.addEventListener("click", nextquestion)

function nextquestion() {
    renderQuestion();
    document.querySelector("#correct").innerHTML = "";
    document.querySelector("#wrong").innerHTML = "";
}


function score() {

    quiz.style.display = "none";
    results.style.display = "block";
};


document.querySelector("#submit").addEventListener("click", function () {
    const initialsElm = document.querySelector("#initials");
    const initials = initialsElm.value.trim();
    const score = count;

    if(initials === "") {
        alert("I pity the fool who doesnt put their initials");
        return ;
    }

    const highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    const newScore = {
        score: score,
        initials: initials
    }

    highscores.push(newScore);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));
      
    window.location.href = "highscore.html";


});












