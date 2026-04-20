// See my final score when the game ends so that I know my result.
// Enter my name so that my result can be connected to me
// Submit my score so that it can be saved to the shared scoreboard.
// Get a message that tells me if my score was saved successfully or not so that I understand what happened.

// Variables
let finalScore = 0;
let time = 5;
let gameStarted = false;
let gameEnded = false;
let interval = null;

// HTML DOM
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const label1 = document.getElementById('label1');
const input1 = document.getElementById('name');

// UI Functions
button1.addEventListener('click', () => {
  increaseScore();
  if (!gameStarted) {
    startGame()
  }
})

button2.addEventListener('click', () => {
  submitHighScore();
})

input1.style.display = 'none';
label1.style.display = 'none';
button2.style.display = 'none';


// Functions
function increaseScore() {
  finalScore++;
  scoreDisplay.innerText = finalScore;
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
  gameEnded = true;
  clearInterval(interval);
  button1.style.display = 'none';
  input1.style.display = 'block';
  label1.style.display = 'block';
  button2.style.display = 'block';
}

async function submitHighScore() {
  const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
  method: "POST",
  body: JSON.stringify({ name: input1.value, score: finalScore}),
});
}

//TODO
// Start game button text before first click
// Show final score as Final Score: in the end
// After submitted score, show whether the score has been saved or not
