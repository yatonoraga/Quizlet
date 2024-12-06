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
    question: "What is a motherboard?",
    options: [
      "The part that stores all data in a computer.",
      "The main circuit board in a computer that connects all components.",     
    ],
    correctAnswer: 0
  },
  {
    question: "What is RAM in a computer?",
    options: [
      "A type of permanent storage in a computer.",
      "A temporary storage that helps the computer run programs and process data faster.",     
    ],
    correctAnswer: 0
  },
];

// JavaScript for the Matching Game
document.addEventListener('DOMContentLoaded', function() {
  let selectedTerm = null;
  let selectedDefinition = null;

  const termsAndDefinitions = [
    { term: 'HTML', definition: 'HyperText Markup Language' },
    { term: 'CSS', definition: 'Cascading Style Sheets' },
    { term: 'JavaScript', definition: 'A programming language for web development' },
    { term: 'Python', definition: 'A high-level programming language used for various purposes' },
    { term: 'RAM', definition: 'Random Access Memory' },
    { term: 'SSD', definition: 'Solid State Drive' },
    { term: 'HDD', definition: 'Hard Disk Drive' },
    { term: 'API', definition: 'Application Programming Interface' },
    { term: 'LAN', definition: 'Local Area Network' },
    { term: 'IP Address', definition: 'Internet Protocol Address' }
  ];

  // Function to handle tile clicks
  const handleTileClick = (event) => {
    const clickedTile = event.target;
    
    if (clickedTile.classList.contains('tile')) {
      if (clickedTile.classList.contains('term') && !selectedTerm) {
        selectedTerm = clickedTile;
        clickedTile.style.backgroundColor = 'lightblue'; // Highlight selected term
      } else if (clickedTile.classList.contains('definition') && !selectedDefinition) {
        selectedDefinition = clickedTile;
        clickedTile.style.backgroundColor = 'lightgreen'; // Highlight selected definition
      }

      // If both term and definition are selected, check if they match
      if (selectedTerm && selectedDefinition) {
        if (selectedTerm.dataset.id === selectedDefinition.dataset.id) {
          alert('Match Found!');
          selectedTerm.style.backgroundColor = 'lightgreen';
          selectedDefinition.style.backgroundColor = 'lightgreen';
        } else {
          alert('No match, try again!');
          selectedTerm.style.backgroundColor = '';
          selectedDefinition.style.backgroundColor = '';
        }
        // Reset selections
        selectedTerm = null;
        selectedDefinition = null;
      }
    }
  };

  // Generate terms and definitions dynamically
  const gameBoard = document.querySelector('.game-board');
  termsAndDefinitions.forEach((item, index) => {
    const termTile = document.createElement('div');
    termTile.classList.add('tile', 'term');
    termTile.textContent = item.term;
    termTile.dataset.id = index;

    const definitionTile = document.createElement('div');
    definitionTile.classList.add('tile', 'definition');
    definitionTile.textContent = item.definition;
    definitionTile.dataset.id = index;

    gameBoard.appendChild(termTile);
    gameBoard.appendChild(definitionTile);
  });

  // Attach event listener to game board
  gameBoard.addEventListener('click', handleTileClick);

  // Check answers button logic
  document.getElementById('checkAnswers').addEventListener('click', function() {
    const termTiles = document.querySelectorAll('.tile.term');
    const definitionTiles = document.querySelectorAll('.tile.definition');
    let allMatched = true;

    termTiles.forEach(term => {
      const matchingDefinition = document.getElementById('definition-' + term.dataset.id);
      if (term.style.backgroundColor !== 'lightgreen' || matchingDefinition.style.backgroundColor !== 'lightgreen') {
        allMatched = false;
      }
    });

    if (allMatched) {
      alert('All matches are correct!');
    } else {
      alert('Some matches are incorrect, try again.');
    }
  });

  // Back to home button
  document.getElementById('backToHomeFromMatchingGame').addEventListener('click', function() {
    document.getElementById('matchingGameSection').classList.add('hidden');
    document.getElementById('flashcardsSection').classList.add('hidden');
    document.getElementById('quizSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.querySelector('.main').classList.remove('hidden');
  });
});

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

// Initialize the first question
loadQuestion(currentQuestionIndex);

// Load a question
function loadQuestion(index) {
  const question = questions[index];
  questionText.textContent = question.question;
  quizProgress.textContent = `Question ${index + 1} of ${questions.length}`;

  optionButtons.forEach((button, idx) => {
    button.textContent = question.options[idx];
    button.addEventListener('click', () => handleAnswer(idx, question.correctAnswer));
  });
}

// Handle answer selection
function handleAnswer(selectedIdx, correctIdx) {
  if (selectedIdx === correctIdx) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }

  // Move to next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showResults();
  }
}

// Show results
function showResults() {
  quizSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  document.getElementById('correctAnswers').textContent = correctAnswers;
  document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
}
