// Have the game to end automatically when the time is over (60s) so that the rules are clear and fair.
// See my final score when the game ends so that I know my result.
// Enter my name so that my result can be connected to me
// Submit my score so that it can be saved to the shared scoreboard.
// Get a message that tells me if my score was saved successfully or not so that I understand what happened.

// Variables
let score = 0;

let time = 60;

// HTML DOM
const button1 = document.getElementById('btn1');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');


// UI Functions
button1.addEventListener('click', () => {
  increaseScore();
})

// Functions
function increaseScore() {
  score++;
  console.log(score);
  scoreDisplay.innerText = score;
}

myInterval = setInterval(function () {
  timeDisplay.innerHTML = time -= 1;
}, 1000);

