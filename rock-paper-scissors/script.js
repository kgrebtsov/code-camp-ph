var computerSelection;
var playerSelection;
var playerScore = 0;
var computerScore = 0;
var maxScore = 5;
let isGameOver = false;

const choiceArray = ["Rock", "Paper", "Scissors"];
const newGameBtn = document.querySelector("#newGame");

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

   
}

var buttons = document.querySelectorAll('.selection');

buttons.forEach( button => {
    button.addEventListener('click', function () {
          playRound(button.textContent,  getComputerChoice(choiceArray));
          document.getElementById("player").innerHTML = playerScore;
          document.getElementById("computer").innerHTML = computerScore;
          endGame();
        });
    });



function endGame() {
    if(playerScore===maxScore || computerScore === maxScore){
        isGameOver = true;
    } if (playerScore === maxScore){
        finalScore.innerText = "You won the game! Yay!";
    } else if (computerScore === maxScore){
        finalScore.innerText = "You lost the game. Maybe next time.";
    }
}

newGameBtn.addEventListener("click", function () {
    isGameOver = false;
    playerScore = 0;
    computerScore = 0;
    player.innerText = "0";
    computer.innerText = "0";
    finalScore.innerText = "";
  });