
import Game from './models.js';


function saveGame(game) {
  const gameData = JSON.stringify(game);  
  localStorage.setItem(game.title, gameData);  
}


function getAllGames() {
  const games = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const gameData = localStorage.getItem(key);
    const gameObj = JSON.parse(gameData);  
    const game = new Game(gameObj);  
    games.push(game);
  }
  return games;
}

function outputGamesAsJSON() {
  const games = getAllGames();  
  const gamesJSON = JSON.stringify(games, null, 2);  
  console.log(gamesJSON);  
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

outputGamesAsJSON();  
