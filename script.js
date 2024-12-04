// Sections
const homeScreen = document.querySelector('.container');
const flashcardsSection = document.getElementById('flashcardsSection');
const matchingGameSection = document.getElementById('matchingGameSection');
const quizSection = document.getElementById('quizSection');
const resultsSection = document.getElementById('resultsSection');

// Buttons
const flashcardsBtn = document.getElementById('flashcardsBtn');
const matchingGameBtn = document.getElementById('matchingGameBtn');
const quizBtn = document.getElementById('quizBtn');
const backToHomeFromFlashcards = document.getElementById('backToHomeFromFlashcards');
const backToHomeFromMatchingGame = document.getElementById('backToHomeFromMatchingGame');
const backToHomeFromQuiz = document.getElementById('backToHomeFromQuiz');
const backToHomeFromResults = document.getElementById('backToHomeFromResults');

// Flashcards Logic
const flashcard = document.getElementById('flashcard');
const flashcardQuestion = document.getElementById('flashcardQuestion');
const flashcardAnswer = document.getElementById('flashcardAnswer');  // Add this line to fix the undefined error

// Quiz Logic
const questionText = document.getElementById('quizQuestion');
const quizProgress = document.getElementById('quizProgress');
const optionButtons = document.querySelectorAll('#quizOptions .option');
let currentQuestionIndex = 0;
let correctAnswers = 0; // Track correct answers
let incorrectAnswers = 0; // Track incorrect answers

const questions = [ 
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markdown Language",
      "HyperText Markup Language"
    ],
    correctAnswer: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Cascading Script Sheets",
      "CSS",
      "Cascading Style Systems",
    ],
    correctAnswer: 1
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: [
      "<h6>",
      "<h1>",
      "<head>",
    ],
    correctAnswer: 1
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: [
      "background-color",
      "color",
      "background"
    ],
    correctAnswer: 0
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    options: [
      "alt",
      "src",
      "title"
    ],
    correctAnswer: 0
  },
  {
    question: "Name three popular operating systems.",
    options: [
      "Windows, macOS, Linux",
      "Chrome, Spotify, iTunes",      
    ],
    correctAnswer: 0
  },
  {
    question: "What is a hard drive used for?",
    options: [
      "To store data permanently on the computer.",
      "To process and execute program instructions.",     
    ],
    correctAnswer: 0
  },
  {
    question: "What is the difference between an HDD and an SSD?",
    options: [
      "HDD is mechanical and slower, SSD uses flash memory and is faster.",
      "HDD is faster, while SSD is slower.",     
    ],
    correctAnswer: 0
  },
  {
    question: " What is a motherboard?",
    options: [
      "The part that stores all data in a computer.",
      "The main circuit board in a computer that connects all components.",     
    ],
    correctAnswer: 0
  },
];

// Show the sections when clicking on the buttons
flashcardsBtn.addEventListener('click', () => showSection(flashcardsSection));
matchingGameBtn.addEventListener('click', () => showSection(matchingGameSection));
quizBtn.addEventListener('click', () => showSection(quizSection));

// Function to toggle between sections
function showSection(section) {
  homeScreen.classList.add('hidden');
  flashcardsSection.classList.add('hidden');
  matchingGameSection.classList.add('hidden');
  quizSection.classList.add('hidden');
  resultsSection.classList.add('hidden');

  section.classList.remove('hidden');
}

// Back buttons
backToHomeFromFlashcards.addEventListener('click', () => showSection(homeScreen));
backToHomeFromMatchingGame.addEventListener('click', () => showSection(homeScreen));
backToHomeFromQuiz.addEventListener('click', () => showSection(homeScreen));
backToHomeFromResults.addEventListener('click', () => showSection(homeScreen));

// Load a question
function loadQuestion(index) {
  const question = questions[index];
  questionText.textContent = `${index + 1}. ${question.question}`;
  quizProgress.textContent = `Question ${index + 1} of ${questions.length}`;

  // Update the options dynamically
  optionButtons.forEach((button, i) => {
    button.textContent = question.options[i];
    button.setAttribute('data-correct', i === question.correctAnswer);
    button.disabled = false; // Enable the buttons when the question is loaded
    button.style.backgroundColor = ''; // Reset any previous color
  });
}

// Handle answer selection
optionButtons.forEach(button => {
  button.addEventListener('click', function() {
    const correctAnswer = this.getAttribute('data-correct') === 'true';

    // Disable all buttons after an answer is selected
    optionButtons.forEach(btn => btn.disabled = true);

    // Provide feedback (optional)
    if (correctAnswer) {
      this.style.backgroundColor = 'green'; // Correct answer
      correctAnswers++; // Increment correct answers
    } else {
      this.style.backgroundColor = 'red'; // Incorrect answer
      incorrectAnswers++; // Increment incorrect answers
    }

    // Proceed to the next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
      } else {
        showResults();
      }
    }, 1000); // 1-second delay before moving to next question
  });
});

// Initialize the first question
loadQuestion(currentQuestionIndex);

// Show results after the quiz ends
function showResults() {
  showSection(resultsSection);
  const totalQuestions = questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  resultsSection.querySelector('p').textContent = `Your Score: ${score}%`;
  resultsSection.querySelector('.results-content').innerHTML = `
    <p>Correct: ${correctAnswers} | Incorrect: ${incorrectAnswers}</p>
  `;
}

// Example for retrying the quiz or going back to the home screen from results
document.getElementById('retryQuiz').addEventListener('click', () => {
  currentQuestionIndex = 0;
  correctAnswers = 0; // Reset correct answers
  incorrectAnswers = 0; // Reset incorrect answers
  loadQuestion(currentQuestionIndex);
  showSection(quizSection);

  // Reset button colors when retrying the quiz
  optionButtons.forEach(button => button.style.backgroundColor = '');
});
