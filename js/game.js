// Get the button element
let captureButton = document.getElementById("captureBtn");

// Define the event handler function
function startGame() {
  // Get the canvas element and its context
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  // Define the game variables
  let pokemon; // The pokemon image
  let pokeball; // The pokeball image
  let score; // The score counter
  let pokemonX; // The pokemon x position
  let pokemonY; // The pokemon y position

  // Load the images
  pokemon = new Image();
  pokemon.src = "../img/pngfind.com-pokeball-png-1032129.png";
  pokeball = new Image();
  pokeball.src = "../img/pngfind.com-pokeball-png-1032129.png";

  // Set up the game
  function setup() {
    // Initialize the score
    score = 0;
    // Set the canvas size
    canvas.width = 800;
    canvas.height = 600;
    // Move the pokemon to a random position
    movePokemon();
    // Start the game loop
    requestAnimationFrame(draw);
  }

  // Draw the game
  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the pokemon
    ctx.drawImage(pokemon, pokemonX, pokemonY, pokemon.width / 2, pokemon.height / 2);
    // Draw the pokeball
    ctx.drawImage(
      pokeball,
      mouseX - pokeball.width / 4,
      mouseY - pokeball.height / 4,
      pokeball.width / 2,
      pokeball.height / 2
    );
    // Check for collision
    if (collide(mouseX, mouseY, pokemonX + pokemon.width / 4, pokemonY + pokemon.height / 4)) {
      // Increase the score
      score++;
      // Move the pokemon to a new random position
      movePokemon();
    }
    // Display the score
    ctx.fillStyle = "black";
    ctx.font = "32px Arial";
    ctx.fillText("Score: " + score, 10, 40);
    // Request the next frame
    requestAnimationFrame(draw);
  }

  // Move the pokemon to a random position
  function movePokemon() {
    // Generate a random x position within the canvas bounds
    pokemonX = Math.floor(Math.random() * (canvas.width - pokemon.width / 2));
    // Generate a random y position within the canvas bounds
    pokemonY = Math.floor(Math.random() * (canvas.height - pokemon.height / 2));
  }

  // Check for collision between two points using the distance formula
  function collide(x1, y1, x2, y2) {
    // Calculate the distance between the points
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // Return true if the distance is less than a threshold (50 pixels)
    return distance < 50;
  }

  // Get the mouse position relative to the canvas
  function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Define the mouse position variables
  let mouseX = 0;
  let mouseY = 0;

  // Add a mousemove event listener to update the mouse position variables
  canvas.addEventListener("mousemove", function (event) {
    let mousePos = getMousePos(event);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  });

  // Call the setup function once the images are loaded
  pokeball.onload = setup;
}

// Add the click event listener to the button
captureButton.addEventListener("click", startGame);
