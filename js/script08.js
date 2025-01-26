const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const resetButton = document.getElementById("reset");
const saveButton = document.getElementById("save");
const progressBar = document.getElementById("progress-bar");

const story = {
  start: {
    text: "You find yourself in a lush garden. What do you do?",
    choices: [
      { text: "Explore the flower beds", next: "flowerBeds" },
      { text: "Inspect the trees", next: "trees" },
    ],
  },
  flowerBeds: {
    text: "The flowers are vibrant and full of life. A bee buzzes by. What next?",
    choices: [
      { text: "Follow the bee", next: "bee" },
      { text: "Pick a flower", next: "pickFlower" },
    ],
  },
  trees: {
    text: "The trees stand tall and majestic. You hear rustling in the leaves. What do you do?",
    choices: [
      { text: "Climb a tree", next: "climbTree" },
      { text: "Look for the source of the rustling", next: "rustling" },
    ],
  },
  bee: {
    text: "The bee leads you to a hidden patch of rare flowers. You feel accomplished!",
    choices: [],
  },
  pickFlower: {
    text: "You pick a flower, and a nearby gardener scolds you. Be mindful of nature!",
    choices: [],
  },
  climbTree: {
    text: "You climb the tree and discover a bird's nest. What a view!",
    choices: [],
  },
  rustling: {
    text: "You find a squirrel darting around. It seems curious about you.",
    choices: [],
  },
};

let currentScene = localStorage.getItem("gameProgress") || "start";
let progress = JSON.parse(localStorage.getItem("gameProgressData")) || [];

// Render the current scene
function renderScene(sceneKey) {
  const scene = story[sceneKey];
  storyElement.textContent = scene.text;
  choicesElement.innerHTML = "";

  // Add scene to progress if it's not already there
  if (!progress.includes(sceneKey)) {
    progress.push(sceneKey);
  }

  // Update the progress bar
  updateProgressBar();

  // Create choice buttons
  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      currentScene = choice.next;
      renderScene(currentScene);
    });
    choicesElement.appendChild(button);
  });
}

// Update the progress bar based on unique scenes visited
function updateProgressBar() {
  const totalScenes = (Object.keys(story).length-1)/2;
  console.log(totalScenes);
  const progressPercentage = (progress.length / totalScenes) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Reset the game
resetButton.addEventListener("click", () => {
  currentScene = "start";
  progress = [];
  localStorage.removeItem("gameProgress");
  localStorage.removeItem("gameProgressData");
  renderScene(currentScene);
});

// Save the game progress
saveButton.addEventListener("click", () => {
  localStorage.setItem("gameProgress", currentScene);
  localStorage.setItem("gameProgressData", JSON.stringify(progress));
  alert("Progress saved!");
});

// Load the saved game progress
if (localStorage.getItem("gameProgress")) {
  currentScene = localStorage.getItem("gameProgress");
  progress = JSON.parse(localStorage.getItem("gameProgressData")) || [];
}

// Start rendering the initial scene
renderScene(currentScene);

