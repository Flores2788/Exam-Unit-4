
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





function loadGamesFromStorage() {
  games.length = 0; // Clear the array
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.title) {
        games.push(data);
      }
    } catch (e) {
      console.warn("Skipping invalid data", key);
    }
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
          if (!games.some(g => g.title === gameData.title)) {
              const game = new Game(gameData);
              saveGame(game);
          }
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
  const container = document.getElementById("gameRecordContainer");
  container.innerHTML = ""; 

  games.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
          <h2>${game.title}</h2>
          <p>Plays: <span class="playCount">${game.playCount}</span></p>
          <p>Rating: <span class="ratingDisplay">${game.personalRating}</span>/10</p>
          <input type="range" min="0" max="10" value="${game.personalRating}" class="ratingSlider" />
          <button class="playedBtn">Played</button>
          <button class="deleteBtn">Delete</button> <!-- New Delete Button -->
      `;

     
      card.querySelector(".ratingSlider").addEventListener("input", (e) => {
          game.personalRating = parseInt(e.target.value);
          card.querySelector(".ratingDisplay").textContent = game.personalRating;
          updateGameInStorage(game);
      });

      
      card.querySelector(".playedBtn").addEventListener("click", () => {
          game.playCount += 1;
          card.querySelector(".playCount").textContent = game.playCount;
          updateGameInStorage(game);
      });

    
      card.querySelector(".deleteBtn").addEventListener("click", () => {
          deleteGame(game.title); 
          renderGames(); 
      });

      container.appendChild(card);
  });
}

document.getElementById('addGameForm').addEventListener('submit', (event) => {
  event.preventDefault(); 

  const form = event.target;


  const newGame = {
      title: form.title.value,
      designer: form.designer.value,
      year: parseInt(form.year.value),
      players: form.players.value,
      time: form.time.value,
      difficulty: form.difficulty.value,
      url: form.url.value,
      playCount: 0, 
      personalRating: parseInt(form.personalRating.value)
  };


  saveGame(newGame);


  renderGames();


  form.reset();
});

function deleteGame(title) {

  localStorage.removeItem(title);


  const index = games.findIndex((game) => game.title === title);
  if (index !== -1) {
      games.splice(index, 1); 
  }
}


document.getElementById('sortBtn').addEventListener('click', () => {
  const sortOption = document.getElementById('sortOptions').value;

 
  games.sort((a, b) => {
      if (sortOption === 'playCount' || sortOption === 'personalRating') {
          return b[sortOption] - a[sortOption]; 
      } else if (sortOption === 'difficulty') {
          return a[sortOption].localeCompare(b[sortOption]); 
      } else if (sortOption === 'players') {
          return parseInt(a[sortOption]) - parseInt(b[sortOption]); 
      }
  });

  renderGames(); 
});


document.getElementById('exportBtn').addEventListener('click', () => {
  console.log("Exported JSON:\n", outputGamesAsJSON());
});

function updateGameInStorage(game) {
  localStorage.setItem(game.title, JSON.stringify(game));

  const index = games.findIndex(g => g.title === game.title);
  if (index !== -1) {
      games[index] = game; 
  }
}

loadGamesFromStorage();
renderGames();
outputGamesAsJSON();  
