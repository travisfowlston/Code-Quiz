/* GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score */

/* Created an array of questions for the quiz */
var theQuestions = [
  {
    question: "What is JavaScript?",
    a: "A markup language",
    b: "A programming language",
    c: "A database management system",
    d: "An operating system",
    answer: "b",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    a: "var",
    b: "let",
    c: "const",
    d: "All of the above",
    answer: "d",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    a: "Number",
    b: "Boolean",
    c: "String",
    d: "Array",
    answer: "d",
  },
  {
    question:
      "What is the correct syntax for a function declaration in JavaScript?",
    a: "function myFunction()",
    b: "func myFunction()",
    c: "def myFunction()",
    d: "fn myFunction()",
    answer: "a",
  },
  {
    question: "How do you add a comment in JavaScript?",
    a: "// This is a comment",
    b: "Nothing",
    c: "/* This is a comment */",
    d: "# This is a comment",
    answer: "a",
  },
  {
    question:
      "What is the output of the following code?\nconsole.log(10 + '5');",
    a: "10",
    b: "5",
    c: "105",
    d: "Error",
    answer: "c",
  },
  {
    question: "How do you check the type of a variable in JavaScript?",
    a: "typeOf",
    b: "typeof",
    c: "type",
    d: "typeof()",
    answer: "b",
  },
  {
    question:
      "Which method is used to add elements to the end of an array in JavaScript?",
    a: "push()",
    b: "pop()",
    c: "shift()",
    d: "unshift()",
    answer: "a",
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    a: "It refers to the current function",
    b: "It refers to the global object",
    c: "It refers to the parent object",
    d: "It refers to the current object",
    answer: "d",
  },
  {
    question: "What is the correct way to create a new object in JavaScript?",
    a: "var obj = {}",
    b: "var obj = new Object()",
    c: "var obj = Object.create({})",
    d: "All of the above",
    answer: "d",
  },
];

// All the Global variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// All of the DOM elements
const startCard = document.querySelector(".card");
const startButton = document.querySelector("button");
const questionContainer = document.querySelector(".question-container");
const questionText = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const feedbackContainer = document.querySelector(".feedback");
const scoreContainer = document.querySelector(".score");
const Timer = document.querySelector("#timer");

// This function starts the quiz
function startQuiz() {
  startCard.classList.add("hide");
  questionContainer.classList.remove("hide");
  startTimer();
  displayQuestion();
}

// This function displays the current question based on the index of the question
function displayQuestion() {
  const currentQuestion = theQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  const options = ["a", "b", "c", "d"];
  options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = currentQuestion[option];
    optionButton.classList.add("btn", "btn-primary", "option");
    optionButton.setAttribute("data-option", option);
    optionButton.addEventListener("click", handleAnswer);
    optionsContainer.appendChild(optionButton);
  });
}

// This function handles the answer selected by the user and also displays the feedback
function handleAnswer(event) {
  const selectedOption = event.target.getAttribute("data-option");
  const currentQuestion = theQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    score++;
    feedbackContainer.textContent = "Correct!";
    feedbackContainer.classList.remove("incorrect");
    feedbackContainer.classList.add("correct");
  } else {
    timeLeft -= 3;
    feedbackContainer.textContent = "Incorrect!";
    feedbackContainer.classList.add("incorrect");
  }

  feedbackContainer.classList.remove("hide");
  setTimeout(() => {
    feedbackContainer.classList.add("hide");
    currentQuestionIndex++;

    if (currentQuestionIndex < theQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}

// This function ends the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hide");
  scoreContainer.textContent = `Your score: ${score}`;
  scoreContainer.classList.remove("hide");
  feedbackContainer.classList.add("hide");
  Timer.classList.add("hide");
}

// This function starts the timer and also displays the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// This listens for the start button to be clicked
startButton.addEventListener("click", startQuiz);
