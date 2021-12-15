//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");




class GameMatch {
  constructor() {
    this.turn = 0;
    this.id = gameList.length + 1000;
    this.players = [];
    this.round = 0;
  }
}




class Character {
  constructor(name, race, profession) {
    console.log(name, race, profession)
    this.id = characterList.length + 1000;
    this.name = name
    this.race = race
    this.profession = profession
    this.equipment = {
      head: {},
      chest: {},
      legs: {},
      arm_p: {},
      arm_s: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: 99,
      defense: 50,
      speed: 20,
      hp_current: 1200,
      hp_max: 9999999
    }
    //This method searches for an item in the itme list with this name
    //And adds it to this character's inventory
    this.pickupItem = function(searchName) {
      console.log(this);
      for (var item of item_list) {
        console.log(item.name);
        if (item.name == searchName) {
          console.log("Found a match!");
          this.inventory.push(item);
          break;
        }
      }
    }
    //This method searches for a given slot and overwrites
    //it with an empty object
    this.unequipItem = function(slot) {
      for (var slotName in this.equipment) {
        console.log(slotName);
        if (slotName == slot) {
          console.log("Found item slot. Removing.");
          this.equipment.slotName = {};
          break;
        }
      }
    }
  }
}




//This method searches for an item in the itme list with this name
//And adds it to this character's inventory
this.pickupItem = function(searchName) {
  console.log(this);
  for (var item of item_list) {
    console.log(item.name);
    if (item.name == searchName) {
      console.log("Found a match!");
      this.inventory.push(item);
      break;
    }
  }
}

//This method searches for a given slot and overwrites
//it with an empty object
this.unequipItem = function(slot) {
  for (var slotName in this.equipment) {
    console.log(slotName);
    if (slotName == slot) {
      console.log("Found item slot. Removing.");
      this.equipment.slotName = {};
      break;
    }
  }
}

// This holds all possible items
var item_list = [{
    name: 'Battle Axe',
    slot: 'arm_p',
    bonuses: {
      attack: 5
    }
  },
  {
    name: 'Shield',
    slot: 'arm_s',
    bonuses: {
      defense: 5
    }
  }
];


//Create character list with two default characters
var gameList = [];
var characterList = [];
characterList.push(new Character('Kyojuro Rengoku', 'Human', 'Demon Slayer'))
characterList.push(new Character('Marth', 'Human', 'Dragon Slayer'))
//  for (var i in characterList) {
//    characterList.pickupItem("Sword");
//  }

// Create a GET endpoint
app.get('/game', (req, res) => {
  var foundGame = gameList.find(game => game.id == req.query.gameid);
//if a game was found we can manipulate it
  if (foundGame) {
    //check to see if the user sent the addcharacter param ($addcharacter=xxxx)
    if (req.query.addcharacter) {
      //check to see if there is room in this game's playerlist to add a character
      if (foundGame.players.length < 2) {
        // Find the character with the given addcharacter id
        var foundProfile = characterList.find(characterList.find(character => character.id == req.query.addcharacter))
        //If the character was found add it's id to this game's characterList
        if (foundProfile) {
          foundGame.players.push(foundProfile.id)
        }
      }
    }
  //Render a template called 'profile' from the views Folders
  //And send it a variable called "SendData"
  res.render('game', {
    sendData: foundGame
  })
} else {
  res.redirect('/newgame');
}
})

app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
});

// Create a GET endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid);

  if (foundProfile) {
  //Render a template called 'profile' from the views Folders
  //And send it a variable called "SendData"
  res.render('profile', {
    sendData: foundProfile
  })
} else {
  res.redirect('/newprofile');
}
})

//This endpoint creates a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('Killer Queen', 'Stand', 'Bites Za Dusto'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
});

//Start an http listen server
app.listen(3000);
