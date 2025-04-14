/**
         * Point culture (en Français car je suis un peu obligé): 
         * Dans ce genre de jeu, un mot équivaut à 5 caractères, y compris les espaces. 
         * La précision, c'est le pourcentage de caractères tapés correctement sur tous les caractères tapés.
         * 
         * Sur ce... Amusez-vous bien !
         */

let startTime = null, previousEndTime = null;
let currentWordIndex = 0;
let totalChars = 0;
let correctChars = 0;
const wordsToType = [];
let isGameActive = false;

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

// Modal elements
const startModal = document.getElementById("start-modal");
const endModal = document.getElementById("end-modal");
const startGameBtn = document.getElementById("start-game-btn");
const continueBtn = document.getElementById("continue-btn");
const restartBtn = document.getElementById("restart-btn");
const quitBtn = document.getElementById("quit-btn");
const endMessage = document.getElementById("end-message");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

const startTest = (wordCount = 50) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    totalChars = 0;
    correctChars = 0;
    isGameActive = true;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.dataset.word = word;
        if (index === 0) span.classList.add('current');
        wordDisplay.appendChild(span);
    });

    inputField.value = "";
    inputField.disabled = false;
    results.textContent = "";
    wpmElement.textContent = "WPM:...";
    accuracyElement.textContent = "ACCURACY:...";
    
    inputField.focus();
    centerCurrentWord();
};

const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

const getCurrentStats = () => {
    const now = Date.now();
    const elapsedTime = (now - startTime) / 1000;

    if (elapsedTime === 0) return { wpm: 0, accuracy: 0 };

    const totalCharacters = wordsToType.slice(0, currentWordIndex).join('').length;
    const wpm = (totalCharacters / 5) / (elapsedTime / 60);
    
    const accuracy = (correctChars / Math.max(totalChars, 1)) * 100;

    return { 
        wpm: wpm.toFixed(2), 
        accuracy: Math.min(accuracy, 100).toFixed(2) 
    };
};
const getCompletionMessage = (accuracy) => {
    const accuracyNum = parseFloat(accuracy);
    
    if (accuracyNum >= 98) {
        return "✨ Test completed! Excellent work, it's almost perfect! ✨";
    } else if (accuracyNum >= 90) {
        return "🎉 Test completed! Very good performance, keep it up! 🎉";
    } else if (accuracyNum >= 80) {
        return "👍 Test completed! Good work, but you can still improve! 👍";
    } else if (accuracyNum >= 70) {
        return "🙂 Test completed! Not bad, with a little more practice you'll be at the top! 🙂";
    } else if (accuracyNum >= 50) {
        return "🤔 Test completed! Try to focus on accuracy rather than speed.";
    } else {
        return "💪 Test completed! Don't give up, with practice you will progress! 💪";
    }
};
const animateCorrectWord = (wordElement) => {
    wordElement.classList.add('correct-word-animation');
    setTimeout(() => {
        wordElement.classList.remove('correct-word-animation');
    }, 600);
};

const updateLiveStats = () => {
    if (!startTime || !isGameActive) return;
    
    const stats = getCurrentStats();
    wpmElement.textContent = `WPM: ${stats.wpm}`;
    accuracyElement.textContent = `ACCURACY: ${stats.accuracy}%`;
};

setInterval(updateLiveStats, 500);

const centerCurrentWord = () => {
    if (currentWordIndex >= wordsToType.length) return;
    
    const container = document.querySelector('.word-display-container');
    const currentWord = wordDisplay.children[currentWordIndex];
    if (!currentWord) return;
    
    const containerWidth = container.offsetWidth;
    
    const offset = currentWord.offsetLeft - (containerWidth / 2) + (currentWord.offsetWidth / 2);
    
    wordDisplay.style.transform = `translateX(-${Math.max(0, offset)}px)`;
};

const checkTyping = () => {
    if (currentWordIndex >= wordsToType.length || !isGameActive) return;
    
    const typedWord = inputField.value.trim();
    const correctWord = wordsToType[currentWordIndex];
    const wordElement = wordDisplay.children[currentWordIndex];
    
    let isCorrectSoFar = true;
    for (let i = 0; i < typedWord.length; i++) {
        if (i >= correctWord.length || typedWord[i] !== correctWord[i]) {
            isCorrectSoFar = false;
            break;
        }
    }
    
    if (typedWord.length === 0) {
        wordElement.className = 'current';
    } else if (isCorrectSoFar) {
        wordElement.className = 'current correct';
    } else {
        wordElement.className = 'current wrong';
    }
};

const handleTyping = (event) => {
    if (!isGameActive) return;
    
    if (event.key === " " && inputField.value.trim() !== "") {
        event.preventDefault();

        const typedWord = inputField.value.trim();
        const correctWord = wordsToType[currentWordIndex];
        const wordElement = wordDisplay.children[currentWordIndex];

        totalChars += typedWord.length;
        
        for (let i = 0; i < Math.min(typedWord.length, correctWord.length); i++) {
            if (typedWord[i] === correctWord[i]) {
                correctChars++;
            }
        }

        if (typedWord === correctWord) {
            wordElement.className = 'correct';
            animateCorrectWord(wordElement);
        } else {
            wordElement.className = 'wrong';
        }

        currentWordIndex++;
        if (currentWordIndex < wordsToType.length) {
            wordDisplay.children[currentWordIndex].classList.add('current');
            centerCurrentWord();
        }

        const stats = getCurrentStats();
        wpmElement.textContent = `WPM: ${stats.wpm}`;
        accuracyElement.textContent = `ACCURACY: ${stats.accuracy}%`;

        inputField.value = "";

        if (currentWordIndex >= wordsToType.length) {
            endGame();
        }
    } else {
        checkTyping();
    }
};

const showStartModal = () => {
    startModal.style.display = "flex";
    isGameActive = false;
    inputField.disabled = true;
};

const hideStartModal = () => {
    startModal.style.display = "none";
    inputField.disabled = false;
    inputField.focus();
    isGameActive = true;
};

const endGame = () => {
    isGameActive = false;
    inputField.disabled = true;
    
    const stats = getCurrentStats();
    const message = getCompletionMessage(stats.accuracy);
    
    results.textContent = message;
    
    // Show end game modal
    finalWpm.textContent = `WPM: ${stats.wpm}`;
    finalAccuracy.textContent = `Accuracy: ${stats.accuracy}%`;
    endMessage.textContent = message;
    
    setTimeout(() => {
        endModal.style.display = "flex";
    }, 1000);
};

const continueGame = () => {
    endModal.style.display = "none";
    startTest();
};

const restartGame = () => {
    endModal.style.display = "none";
    modeSelect.value = "easy";
    const event = new Event('change');
    modeSelect.dispatchEvent(event);
    difficultyBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === "easy") {
            btn.classList.add('active');
        }
    });
};

const quitGame = () => {
    endModal.style.display = "none";
    showStartModal();
};

// Theme toggle functionality
const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
};

// Event listeners
inputField.addEventListener("keydown", (event) => {
    startTimer();
    handleTyping(event);
});

inputField.addEventListener("input", checkTyping);

modeSelect.addEventListener("change", () => {
    startTest();
});

const difficultyBtns = document.querySelectorAll('.difficulty-btn');

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        modeSelect.value = btn.dataset.difficulty;
        
        const event = new Event('change');
        modeSelect.dispatchEvent(event);
    });
});

startGameBtn.addEventListener('click', hideStartModal);
continueBtn.addEventListener('click', continueGame);
restartBtn.addEventListener('click', restartGame);
quitBtn.addEventListener('click', quitGame);
themeToggle.addEventListener('click', toggleTheme);

window.addEventListener('resize', centerCurrentWord);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startTest();
    showStartModal();
});

// Show modal on load
showStartModal();