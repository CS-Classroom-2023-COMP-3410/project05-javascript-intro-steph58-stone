const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = [];

const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreDisplay = document.getElementById('score');
const reviewContainer = document.getElementById('review-container');

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionContainer.innerHTML = `
        <p>${currentQuestion + 1}. ${questionData.question}</p>
        ${questionData.options.map((opt, index) => `
            <label>
                <input type="radio" name="answer" value="${index}"> ${opt}
            </label>
        `).join('')}
    `;
}

nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }
    userAnswers[currentQuestion] = parseInt(selectedOption.value);
    if (userAnswers[currentQuestion] === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
});

submitButton.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    submitButton.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;

    reviewContainer.innerHTML = questions.map((q, index) => `
        <div>
            <p>${index + 1}. ${q.question}</p>
            <p>Your Answer: ${q.options[userAnswers[index]] || 'No Answer'}</p>
            <p>Correct Answer: ${q.options[q.correct]}</p>
        </div>
    `).join('');
});

loadQuestion();
