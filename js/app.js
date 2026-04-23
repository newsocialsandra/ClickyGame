// Variables
let finalScore = 0;
let time = 5;
let gameStarted = false;
let gameEnded = false;
let myInterval = null;
const urlScoreBoard = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';


// HTML DOM
const clickButton = document.getElementById('btn1');
const submitButton = document.getElementById('btn2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const highScore = document.getElementById('highScore');
const nameLabel = document.getElementById('label1');
const nameInput = document.getElementById('name');

// UI Functions
clickButton.addEventListener('click', () => {
  increaseScore();
  if (!gameStarted) {
    startGame()
  }
})

submitButton.addEventListener('click', () => {
  submitHighScore();
})

nameInput.style.display = 'none';
nameLabel.style.display = 'none';
submitButton.style.display = 'none';

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
    clickButton.disabled = true;
    endGame()
  }
},1000);
}

function endGame() {
  gameEnded = true;
  clearInterval(myInterval);
  showEndScreen();
}

function showEndScreen() {
clickButton.style.display = 'none';
nameInput.style.display = 'block';
nameLabel.style.display = 'block';
submitButton.style.display = 'block';
}

async function submitHighScore() {
  try {
  const response = await
    fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
  method: "POST",
  body: JSON.stringify({ name: nameInput.value, score: finalScore}),
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

async function getScoreBoardData() {
  try {
    const response = await fetch(urlScoreBoard);
    const data = await response.json();
    const topTen = data.sort((a, b) => b.score - a.score).slice(0, 10);
    renderScoreboard(topTen);
  } catch (error) {
    console.error('Fetch Error', error);
  }
}

function renderScoreboard(topTen) {
  topTen.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.name} – Score:${player.score}`;
    highScore.appendChild(listItem);
  })
}

getScoreBoardData();

// TODO
// "Start game" button text before first click
// Show final score as Final Score: in the end
// Make it so that you can only press "Submit score" button once
// Add restart game button to restart game
