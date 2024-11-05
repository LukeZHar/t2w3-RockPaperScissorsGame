// Get the elements 
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');

// Set initial score to be 0 
let userScore = 0;
let computerScore = 0;


// get the computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// console.log(getComputerChoice());

// Write the logic for winner!
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

// Listen to the button click events
rockButton.addEventListener('click', () => {
    const computerChoice = getComputerChoice();
    const result = determineWinner('rock', computerChoice);
    resultDiv.textContent = `You chose Rock. Computer chose ${computerChoice}. ${result}`;
})

paperButton.addEventListener('click', () => {
    const computerChoice = getComputerChoice();
    const result = determineWinner('paper', computerChoice);
    resultDiv.textContent = `You chose Paper. Computer chose ${computerChoice}. ${result}`;
})

scissorsButton.addEventListener('click', () => {
    const computerChoice = getComputerChoice();
    const result = determineWinner('scissors', computerChoice);
    resultDiv.textContent = `You chose Scissors. Computer chose ${computerChoice}. ${result}`;
})
