// Get the elements 
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');

const modeSelect = document.getElementById('mode');
const roundsInput = document.getElementById('rounds');
const startGameButton = document.getElementById('startGame');
const gameContentDiv = document.getElementById('gameContent');

// Set initial score to be 0 
let userScore = 0;
let computerScore = 0;

let rounds = 0;
let maxRounds = null;

// Show or hide rounds input based on game mode selection
modeSelect.addEventListener('change', () => {
    if (modeSelect.value === 'best of') {
        roundsInput.style.display = 'inline';
    } else {
        roundsInput.style.display = 'none';
        roundsInput.value = '';
    }
});

// Start game and set up the selected mode
startGameButton.addEventListener('click', () => {
    // resets the values
    resetGame();
    if (modeSelect.value === 'best of') {
        maxRounds = parseInt(roundsInput.value);
        if (isNaN(maxRounds) || maxRounds < 1) {
            alert("Please enter a valid number of rounds.");
            return;
        }
    } else {
        maxRounds = null; // Endless mode
    }
    gameContentDiv.style.display = 'block';


    resultDiv.textContent = `Game stated in ${modeSelect.value === `best of` ? `Best of ${maxRounds}` : `Endless`} mode.`;
});

// Get the computer's choice on input
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


// Determine the winner and update the score
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It is a tie!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') || 
        (userChoice === 'paper' && computerChoice === 'rock') || 
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userScore++;
        scoreDiv.textContent = `Your score: ${userScore} | Computer score: ${computerScore}`
        return 'You win!';
    } else {
        computerScore++;
        scoreDiv.textContent = `Your score: ${userScore} | Computer score: ${computerScore}`
        return 'Computer wins!';
    }        
}

// Implement the game play logic
// Handle the button clicks
function playGame(userChoice) {
    // Check if the maxRounds is entered and if the rounds over
    if (maxRounds && rounds >= maxRounds) {
        if (userScore === computerScore) {
            resultDiv.textContent = "Game Over! It's a tie!";
            
        } else {
            resultDiv.textContent = `Game over! ${userScore > computerScore ? 'You win!' : 'Computer wins!'}`;
            
        }
        return;
    }

    // Display the results of the play
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    resultDiv.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;
    
    // Increase the rounds
    rounds++;

    // Check if the game should end in best of x mode
    if (maxRounds && rounds >= maxRounds) {
        if (userScore === computerScore) {
            const finalResult = "Play again to determine the overall winner!";
            resultDiv.textContent += `Game Over! ${finalResult}`;
            return;
        } else {
            const finalResult = userScore > computerScore ? "You are the overall winner!" : "Computer is the overall winner!";
            resultDiv.textContent += `Game Over! ${finalResult}`;
            return;
        }
    }
}

// Add event listeners
rockButton.addEventListener('click', () => playGame('rock'));
paperButton.addEventListener('click', () => playGame('paper'));
scissorsButton.addEventListener('click', () => playGame('scissors'));

// Reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    rounds = 0;
    scoreDiv.textContent = `Your score: ${userScore} | Computer score: ${computerScore}`;
    resultDiv.textContent = 'Game reset';
}