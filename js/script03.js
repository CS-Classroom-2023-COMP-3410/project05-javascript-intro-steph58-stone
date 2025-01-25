const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    resetGameInfo();
}

function flipCard() {
    if (this.classList.contains('flipped') || secondCard) return;

    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            matchedPairs++;
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            firstCard = null;
            secondCard = null;

            if (matchedPairs === symbols.length) {
                clearInterval(interval);
                alert(`You win! Completed in ${moves} moves and ${timer} seconds.`);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
}

function resetGameInfo() {
    moves = 0;
    matchedPairs = 0;
    timer = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;
    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

restartButton.addEventListener('click', startGame);

// Start the game on page load
startGame();
