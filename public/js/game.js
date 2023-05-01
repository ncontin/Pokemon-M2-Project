/* // Define the pokemon names and images
const pokemonNames = ["Charmander", "Squirtle", "Bulbasaur"];
const pokemonImages = ["charmander.png", "squirtle.png", "bulbasaur.png"];

// Define the game rules
const gameRules = {
  Charmander: { wins: "Bulbasaur", loses: "Squirtle" },
  Squirtle: { wins: "Charmander", loses: "Bulbasaur" },
  Bulbasaur: { wins: "Squirtle", loses: "Charmander" },
};

// Get the HTML elements
const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const buttons = document.querySelectorAll("button");

// Add a click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", playGame);
});

// Define the game logic
function playGame(event) {
  // Get the player's choice from the button id
  let playerPokemon = event.target.id;
  // Display the player's choice image and name
  playerChoice.src = `../images/${pokemonImages[pokemonNames.indexOf(playerPokemon)]}`;
  playerChoice.alt = playerPokemon;
  // Get a random index for the computer's choice
  let randomIndex = Math.floor(Math.random() * pokemonNames.length);
  // Get the computer's choice from the random index
  let computerPokemon = pokemonNames[randomIndex];
  // Display the computer's choice image and name
  computerChoice.src = `../images/${pokemonImages[randomIndex]}`;
  computerChoice.alt = computerPokemon;
  // Compare the choices and determine the winner
  if (playerPokemon === computerPokemon) {
    // It's a tie
    resultText.textContent = "It's a tie!";
    resultText.style.color = "gray";
  } else if (gameRules[playerPokemon].wins === computerPokemon) {
    // Player wins
    resultText.textContent = `${playerPokemon} beats ${computerPokemon}. You win!`;
    resultText.style.color = "green";
  } else {
    // Computer wins
    resultText.textContent = `${computerPokemon} beats ${playerPokemon}. You lose!`;
    resultText.style.color = "red";
  }
}
 */
