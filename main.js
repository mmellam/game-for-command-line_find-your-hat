const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.userPosX = 0;
    this.userPosY = 0;
    this.runningGame = true;
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""))
    }
  } 

  static generateField(nrOfRows, nrOfColumns) {
    const randomField = [];
    
    const randomizeFieldCharacter = function() {
      const random = Math.random() > 0.8;
      return random ? hole : fieldCharacter;
    }

    const generateRow = function() {
      const row = [];
      for (let i = 0; i < nrOfColumns; i++) {
        row.push(randomizeFieldCharacter());
      };
      return row;
    }
    // push set nr of rows to the field
    for (let i = 0; i < nrOfRows; i++) {
      randomField.push(generateRow());
    }
    // randomize hat position for x,y 
    const randomizeHat = function() {
      let x = Math.floor(Math.random() * nrOfColumns);
      let y = Math.floor(Math.random() * nrOfRows);
      randomField[y][x] = hat;
      if (x === 0 && y === 0) {
        randomizeHat();
      }
    }
    randomizeHat();
    // set start character at the top left of field
    randomField[0][0] = pathCharacter;
    return randomField;
  }

  promptUser() {
    const move = prompt('Which way will you move? ');
    switch (move) {
      case 'r':
        this.userPosX++;
        break;
      case 'd':
        this.userPosY++;
        break;
      case 'l':
        this.userPosX--;
        break;
      case 'u':
        this.userPosY--;
        break;
      case 'exit':
        this.runningGame = false;
        console.log('Goodbye!');
        break;
      default: 
        console.log('Unknown character - please enter enter r for right, l for left, u for up, or d for down.');
        this.promptUser();
    }
  }

  isFieldCharacter() {
    return this.field[this.userPosY][this.userPosX] === fieldCharacter;
  }

  isHole() {
    return this.field[this.userPosY][this.userPosX] === hole;
  }

  isHat() {
    return this.field[this.userPosY][this.userPosX] === hat;
  }

  isOutOfField() {
    return this.field[this.userPosY] === undefined || this.field[this.userPosY][this.userPosX] === undefined;
  }

  runGame() {
    console.log('Welcome to the Find Your Hat Game! \nTo move, enter r for right, l for left, u for up, or d for down. Enter \'exit\' to leave the game.');
    
    while (this.runningGame) {
      this.print();
      //console.log(this.userPosX, this.userPosY);
      this.promptUser();

      if (this.isOutOfField()) {
        console.log("Sorry, you moved out of the field! Start a new game from the terminal.");
        this.runningGame = false;
        break;
      } else if (this.isFieldCharacter()) {
        this.field[this.userPosY][this.userPosX] = pathCharacter;
      } else if (this.isHole()) {
        console.log("Oh no, you fell into a hole! Sorry, start a new game.");
        this.runningGame = false;
        break;
      } else if (this.isHat()) {
        this.field[this.userPosY][this.userPosX] = 'X';
        this.print();
        console.log("You found it! You have won the game. See you in a new game!");
        this.runningGame = false;
      } 
    }
  }
}


const myField = new Field(Field.generateField(5, 10));

myField.runGame(); 









