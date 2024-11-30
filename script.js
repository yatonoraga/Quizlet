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
