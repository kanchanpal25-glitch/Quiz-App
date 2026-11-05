
const questions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "2. Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "3. Which CSS property changes text color?",
        options: ["background-color", "font-style", "color", "text-align"],
        answer: 2
    },
    {
        question: "4. Which CSS property creates space outside an element?",
        options: ["padding", "margin", "border", "spacing"],
        answer: 1
    },
    {
        question: "5. Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    },
    {
        question: "6. Which keyword declares a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    },
    {
        question: "7. Which method displays a message in the console?",
        options: ["console.log()", "print()", "display()", "show()"],
        answer: 0
    },
    {
        question: "8. Which method selects an element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClassName()",
            "document.getElementByTag()"
        ],
        answer: 1
    },
    {
        question: "9. Which event occurs when a user clicks a button?",
        options: ["onchange", "onmouseover", "onclick", "onload"],
        answer: 2
    },
    {
        question: "10. Which keyword is used to define a function in JavaScript?",
        options: ["method", "function", "define", "func"],
        answer: 1
    }
];

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");

const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

const quizContent = document.getElementById("quiz-content");
const resultContainer = document.getElementById("result-container");

const finalScoreElement = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let userAnswers = Array(questions.length).fill(null);

// Start Quiz Button
startBtn.addEventListener("click", function () {

    startScreen.style.display = "none";
    quizContent.style.display = "block";

    currentQuestion = 0;
    userAnswers = Array(questions.length).fill(null);

    showQuestion();
});

// Show Question
function showQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    q.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        // Previously selected answer
        if (userAnswers[currentQuestion] !== null) {

            button.disabled = true;

            // Correct answer is always green
            if (index === q.answer) {
                button.classList.add("correct");
            }

            // Selected wrong answer is red
            if (
                index === userAnswers[currentQuestion] &&
                index !== q.answer
            ) {
                button.classList.add("wrong");
            }
        }

        // Click on option
        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        optionsElement.appendChild(button);

    });

    // Previous button
    prevButton.disabled = currentQuestion === 0;

    // Next button text
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish Quiz ✓";
    } else {
        nextButton.textContent = "Next →";
    }

    updateScore();
}

// Select Answer
function selectAnswer(selectedIndex) {

    if (userAnswers[currentQuestion] !== null) {
        return;
    }

    userAnswers[currentQuestion] = selectedIndex;

    showQuestion();
}

// Calculate Score
function calculateScore() {

    let total = 0;

    questions.forEach(function (q, index) {

        if (userAnswers[index] === q.answer) {
            total++;
        }

    });

    return total;
}

// Update Score
function updateScore() {

    scoreElement.textContent = `Score: ${calculateScore()}`;

}

// Next Button
nextButton.addEventListener("click", function () {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

});

// Previous Button
prevButton.addEventListener("click", function () {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});

// Show Result
function showResult() {

    quizContent.style.display = "none";
    resultContainer.style.display = "block";

    const total = calculateScore();

    finalScoreElement.textContent =
        `${total} / ${questions.length}`;

    if (total >= 8) {

        resultMessage.textContent =
            "Excellent! You are a Web Development Star! 🌟";

    } else if (total >= 5) {

        resultMessage.textContent =
            "Good job! Keep practicing and improving! 💪";

    } else {

        resultMessage.textContent =
            "Keep learning! Practice makes perfect! 📚";

    }

}

// Restart Quiz
restartButton.addEventListener("click", function () {

    currentQuestion = 0;

    userAnswers = Array(questions.length).fill(null);

    resultContainer.style.display = "none";
    startScreen.style.display = "block";

});

// Initial Screen
quizContent.style.display = "none";
resultContainer.style.display = "none";
startScreen.style.display = "block";
