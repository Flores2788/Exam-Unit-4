
import Game from './models.js';


const games = [
  {
    title: "Terraforming Mars",
    designer: "Jacob Fryxelius",
    artist: "Isaac Fryxelius",
    publisher: "FryxGames",
    year: 2016,
    players: "1–5",
    time: "120 mins",
    difficulty: "Medium-Heavy",
    url: "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    playCount: 136,
    personalRating: 8
  },
  {
    title: "Flip 7",
    designer: "Eric Olsen",
    artist: "O'Neil Mabile",
    publisher: "The Op Games",
    year: 2024,
    players: "3–99",
    time: "20 mins",
    difficulty: "Light",
    url: "https://boardgamegeek.com/boardgame/420087/flip-7",
    playCount: 5,
    personalRating: 0
  },
  {
    title: "Wingspan",
    designer: "Elizabeth Hargrave",
    artist: "Beth Sobel, Natalia Rojas, Ana Maria Martinez",
    publisher: "Stonemaier Games",
    year: 2019,
    players: "1–5",
    time: "40–70 mins",
    difficulty: "Medium",
    url: "https://boardgamegeek.com/boardgame/266192/wingspan",
    playCount: 38,
    personalRating: 7
  },
  {
    title: "Cascadia",
    designer: "Randy Flynn",
    artist: "Beth Sobel",
    publisher: "Flatout Games",
    year: 2021,
    players: "1–4",
    time: "30–45 mins",
    difficulty: "Medium",
    url: "https://boardgamegeek.com/boardgame/295947/cascadia",
    playCount: 3,
    personalRating: 8
  },
  {
    title: "Ticket to Ride",
    designer: "Alan R. Moon",
    artist: "Julien Delval, Cyrille Daujean",
    publisher: "Days of Wonder",
    year: 2004,
    players: "2–5",
    time: "30–60 mins",
    difficulty: "Light",
    url: "https://boardgamegeek.com/boardgame/9209/ticket-ride",
    playCount: 423,
    personalRating: 6
  }
];


games.forEach(gameData => {
  const game = new Game(gameData);  
  saveGame(game);  
});


function loadGamesFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const gameData = localStorage.getItem(key);
    const gameObj = JSON.parse(gameData);
    const game = new Game(gameObj);
    games.push(game); 
  }
}

function outputGamesAsJSON() {
  return JSON.stringify(games, null, 2); 
}

function saveGame(game) {
  const gameData = JSON.stringify(game);
  localStorage.setItem(game.title, gameData);  
  games.push(game);  
}


function importGamesFromJSON(jsonData) {
  try {
    const gamesArray = JSON.parse(jsonData); 
    gamesArray.forEach(gameData => {
      const game = new Game(gameData);  
      saveGame(game);  
    });
  } catch (error) {
    console.error("Error importing games:", error);
  }
}


document.getElementById('importSource').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file && file.type === 'application/json') {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const jsonData = e.target.result;  
      importGamesFromJSON(jsonData); 
      console.log("Games imported successfully!");
      console.log(games);  
    };
    
    reader.onerror = function(error) {
      console.error("Error reading file:", error);
    };
    
    reader.readAsText(file);  
  } else {
    alert("Please select a valid JSON file.");
  }
});

function renderGames() {
  const container = document.getElementById("gameList");
  container.innerHTML = ""; // Clear before rendering

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.style.border = "1px solid #ccc";
    card.style.padding = "1em";
    card.style.margin = "1em 0";
    card.style.borderRadius = "8px";

    card.innerHTML = `
      <h2>${game.title}</h2>
      <p><strong>Designer:</strong> ${game.designer}</p>
      <p><strong>Artist:</strong> ${game.artist}</p>
      <p><strong>Publisher:</strong> ${game.publisher}</p>
      <p><strong>Year:</strong> ${game.year}</p>
      <p><strong>Players:</strong> ${game.players}</p>
      <p><strong>Time:</strong> ${game.time}</p>
      <p><strong>Difficulty:</strong> ${game.difficulty}</p>
      <p><strong>Play Count:</strong> ${game.playCount}</p>
      <label>
        Rating:
        <input type="range" min="0" max="10" value="${game.personalRating}">
      </label>
      <button>Played</button>
      <a href="${game.url}" target="_blank">More Info</a>
    `;

    container.appendChild(card);
  });
}
renderGames();
loadGamesFromLocalStorage();




games.forEach(gameData => {
  const game = new Game(gameData);  
  saveGame(game);  
});

document.getElementById('exportBtn').addEventListener('click', () => {
  console.log("Exported JSON:\n", outputGamesAsJSON());
});

outputGamesAsJSON();  
