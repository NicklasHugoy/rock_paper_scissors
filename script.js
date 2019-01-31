let playerScore = 0, computerScore = 0;

function computerPlay(){
    let randomNumber = Math.floor(Math.random()*3)
    if(randomNumber == 0){
        return "ROCK"
    } else if(randomNumber == 1){
        return "PAPER"
    } else {
        return "SCISSOR"
    }
}

function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase()

    findWinner(playerSelection, computerSelection)
}

function findWinner(playerSelection, computerSelection){
    const playerScoreDisplay = document.querySelector('#player_score');
    const computerScoreDisplay = document.querySelector('#computer_score');

    if(playerSelection == computerSelection){
        printToScreen("It's a tie!")
        return;
    } else if((playerSelection == "ROCK" && computerSelection == "PAPER")
            || (playerSelection == "PAPER" && computerSelection == "SCISSOR")
            || (playerSelection == "SCISSOR" && computerSelection == "ROCK")){
        printToScreen("You Lose! " + computerSelection + " beats " + playerSelection)
        computerScore += 1;
        computerScoreDisplay.textContent = computerScore;
    } else {
        printToScreen("You Win! " + playerSelection + " beats " + computerSelection)
        playerScore += 1;
        playerScoreDisplay.textContent = playerScore;
    }
    
    if(playerScore == 5 || computerScore == 5){
        endGame();
    }
}

function endGame(){
    printScore();
    toggleGamestate();
}

function printScore(){
    const winnerDisplay = document.querySelector('#winner');
    if(playerScore == computerScore){
        winnerDisplay.textContent = "It was a tie";
    } else if(playerScore < computerScore){
        winnerDisplay.textContent = "You've lost the game";
    } else {
        winnerDisplay.textContent = "You've won the game";
    }
}

function printToScreen(message){
    const messageDisplay = document.querySelector('#message');
    messageDisplay.textContent = message;
}

function toggleGamestate(){
    const buttons = document.querySelectorAll('.selection_button');
    buttons.forEach(element => {
        element.disabled = !element.disabled;
    });
    const newGameButton = document.querySelector('#resetGame');
    if (newGameButton.style.display == "none") {
        newGameButton.style.display = "block";
    } else {
        newGameButton.style.display = "none";
    }
}

function newGame(){
    playerScore = 0;
    computerScore = 0;
    document.querySelector('#player_score').textContent = '0';
    document.querySelector('#computer_score').textContent = '0';
    toggleGamestate();
    printToScreen('');
    document.querySelector('#winner').textContent = "";
}

const buttons = document.querySelectorAll('.selection_button');
buttons.forEach(button => {
    button.addEventListener('click', function(e){
        playRound(button.dataset.selection, computerPlay());
    })
});

document.querySelector('#resetGame').addEventListener('click', newGame);

