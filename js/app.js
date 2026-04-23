// Nice to have:
// See a scoreboard or ranking so that I can compare my result with others.
// See the scoreboard results in a clear order so that I can easily see the best scores.

// Variables
let finalScore = 0;
let time = 5;
let gameStarted = false;
let gameEnded = false;
let myInterval = null;

let playerScores = {};

// HTML DOM
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const highScore = document.getElementById('highScore');
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
  myInterval = setInterval(function () {
  time --;
  timeDisplay.innerText = time;

  if (time <= 0) {
    timeDisplay.innerText = "Time's up!";
    button1.disabled = true;
    endGame()
  }
},1000);
}

function endGame() {
  gameEnded = true;
  button1.style.display = 'none';
  input1.style.display = 'block';
  label1.style.display = 'block';
  button2.style.display = 'block';
  clearInterval(myInterval);
}

async function submitHighScore() {
  try {
  const response = await
    fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
  method: "POST",
  body: JSON.stringify({ name: input1.value, score: finalScore}),
});

  if (!response.ok) {
  throw new Error('Servern svarade med ett fel');
  }
  showMessage("Yay! Score submitted successfully.", "success");
  }
  catch (error) {
    showMessage("Sorry, something went wrong when submitting your score. Try again.", "error");
    console.error(error);
  }
}
function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.innerText = text;
  messageEl.style.color = type === "success" ? "green" : "red";
}

function getScoreBoardData() {
const url = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';
fetch(url)
  .then(response => {
    console.log('Response object:', response);
    return response.json();
  })
  .then(data => {
    console.log('Scoreboard data:', data);
    data.forEach((player, index) => {
      console.log(`Row ${index + 1}: Name=${player.name}, Score=${player.score}`);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
getScoreBoardData();
//TODO
// Edit GET function to fetch top 10 scoreboard results and show them to the user
// Lägg varje player, index som ett key value pair i objektet playerScores?
// Sortera playerScores efter högst score? Går det?!?!
// Loopa igenom de 10 första paren i playerScores och lägg resultaten i nytt objekt?
// Få in nya objektet i HTML på nå vis?


// Less important todos
// "Start game" button text before first click
// Show final score as Final Score: in the end
// Make it so that you can only press "Submit score" button once
// Add restart game button to restart game
