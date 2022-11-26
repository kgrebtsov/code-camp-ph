var computerSelection;
var playerSelection;
var playerScore;
var computerScore;
const choiceArray = ["Rock", "Paper", "Scissors"];

function getComputerChoice (arr){
    computerSelection = _.sample(arr);
    computerSelection = _.lowerCase(computerSelection);
    return computerSelection;
}


function getPlayerSelection(){
    let playerInput = prompt("What will you play against the computer?");
    playerSelection = _.lowerCase(playerInput);
    return playerSelection;
}

function playRound (playerSelection, computerSelection){
    if (playerSelection === computerSelection){
        console.log ("Its a tie, try againg");
    } 
    else if (playerSelection === 'rock') {
        if (computerSelection === 'scissors') {
            playerScore++;
            console.log ("You win! Rock beats Scissors!");           
        } else {
            computerScore++;
            console.log ("You lose! Paper beats Rock!");
        }
    }
    // Paper beats Rock
    else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            playerScore++;
            console.log ("You win! Paper beats Rock!");
        } else {
            computerScore++;
            console.log ("You lose! Scissors beats Paper!");
        }
    }
    // Scissors beat Paper
    else if (playerSelection === 'scissors') {
        if (computerSelection === 'paper') {
            playerScore++
            console.log ("You win! Scissors beats Paper!");
        } else {
            computerScore++
            console.log ("You lose! Rock beats Scissors!");
            
        }
}
}

function game (){
    for (let i = 0; i < 5; i++){
        getPlayerSelection();
        console.log(playerSelection);
        getComputerChoice(choiceArray);
        console.log(computerSelection);
       playRound(playerSelection, computerSelection);
    }

    if (playerScore > computerScore) {
        console.log ("We have a winner - you!");
    } else console.log ("Your computer master won!");
}

game();