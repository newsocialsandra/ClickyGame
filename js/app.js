// See my final score when the game ends so that I know my result.
// Enter my name so that my result can be connected to me
// Submit my score so that it can be saved to the shared scoreboard.
// Get a message that tells me if my score was saved successfully or not so that I understand what happened.

// Variables
let score = 0;
let time = 60;
let gameStarted = false;
let gameEnded = false;

// HTML DOM
const button1 = document.getElementById('btn1');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');

// UI Functions
button1.addEventListener('click', () => {
  increaseScore();
  if (!gameStarted) {
    startGame()
  }
})

// Functions
function increaseScore() {
  score++;
  console.log(score);
  scoreDisplay.innerText = score;
}

function startGame() {
  gameStarted = true;
  let myInterval = setInterval(function () {
  time --;
  timeDisplay.innerText = time;

  if (time <= 0) {
    clearInterval(myInterval);
    timeDisplay.innerText = "Time's up!";
    button1.disabled = true;
    endGame()
  }
},1000);
}

function endGame() {
  console.log("Game ended");
  gameEnded = true;
}
