const textDisplay = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const wpmDisplay = document.getElementById('wpm').querySelector('span');
const accuracyDisplay = document.getElementById('accuracy').querySelector('span');
const results = document.querySelector('.results');
const trainingArea = document.querySelector('.training-area');

let generatedText = '';
let startTime = null;
let timer = null;

// Random text generation based on difficulty
function generateRandomText(difficulty) {
  const easyWords = 'the quick brown fox jumps over the lazy dog'.split(' ');
  const mediumWords = 'Programming is a skill that improves with consistent practice.'.split(' ');
  const hardWords = 'Complex strings with @symbols, punctuations, and numbers like 123.'.split(' ');

  const wordBank =
    difficulty === 'easy' ? easyWords : difficulty === 'medium' ? mediumWords : hardWords;

  const length = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
  return Array.from({ length }, () => wordBank[Math.floor(Math.random() * wordBank.length)]).join(' ');
}

// Highlight errors in real-time and track WPM
function highlightErrorsAndTrackWPM() {
  const userInputValue = userInput.value;
  const currentTime = new Date();
  const elapsedTimeInMinutes = (currentTime - startTime) / 1000 / 60; // in minutes
  const wordsTyped = userInputValue.trim().split(' ').length;
  const wpm = Math.round(wordsTyped / elapsedTimeInMinutes) || 0;

  // Update WPM display
  wpmDisplay.textContent = wpm;

  // Highlight errors
  let highlightedText = '';
  for (let i = 0; i < generatedText.length; i++) {
    if (i < userInputValue.length) {
      highlightedText +=
        userInputValue[i] === generatedText[i]
          ? `<span class="correct">${generatedText[i]}</span>`
          : `<span class="incorrect">${generatedText[i]}</span>`;
    } else {
      highlightedText += generatedText[i];
    }
  }
  textDisplay.innerHTML = highlightedText;

  // Stop tracking if the user finishes typing
  if (userInputValue === generatedText) {
    clearInterval(timer);
    calculateResults();
  }
}

// Calculate final WPM and accuracy
function calculateResults() {
  const endTime = new Date();
  const totalTime = (endTime - startTime) / 1000 / 60; // in minutes
  const wordsTyped = userInput.value.trim().split(' ').length;
  const wpm = Math.round(wordsTyped / totalTime);

  const correctChars = [...userInput.value].filter(
    (char, index) => char === generatedText[index]
  ).length;
  const accuracy = Math.round((correctChars / generatedText.length) * 100);

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
  results.classList.remove('hidden');
}

// Start training session
startBtn.addEventListener('click', () => {
  const difficulty = difficultySelect.value;
  generatedText = generateRandomText(difficulty);
  textDisplay.textContent = generatedText;
  userInput.value = '';
  userInput.removeAttribute('disabled');
  userInput.focus();
  trainingArea.classList.remove('hidden');
  results.classList.add('hidden');

  startTime = new Date();
  clearInterval(timer);
  timer = setInterval(highlightErrorsAndTrackWPM, 100);
});

// Restart session
restartBtn.addEventListener('click', () => {
  trainingArea.classList.add('hidden');
  userInput.setAttribute('disabled', true);
  clearInterval(timer);
});
