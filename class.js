class Grass {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.multiply = 0;
     this.directions = [
       [this.x - 1, this.y - 1],
       [this.x, this.y - 1],
       [this.x + 1, this.y - 1],
       [this.x - 1, this.y],
       [this.x + 1, this.y],
       [this.x - 1, this.y + 1],
       [this.x, this.y + 1],
       [this.x + 1, this.y + 1],
     ];
   }
 
   chooseCell(char) {
     let found = []
     for (const i in this.directions) {
       let x = this.directions[i][0]; 
       let y = this.directions[i][1]; 
       if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
         if (matrix[x][y] == char||matrix[x][y] == 7) {
           found.push(this.directions[i]);
         }
       }
     }
     return found;
   }
 
   mul() {
     this.multiply++;

     let emptyCell = this.chooseCell(0); 
     var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
     if (newCell && this.multiply >= 8) {
       let newX = newCell[0]; 
       let newY = newCell[1]; 
       matrix[newX][newY] = 1; 
       let newGrass = new Grass(newX, newY);
       grassArr.push(newGrass); 
       this.multiply = 0;
      }
    }
}

class GrassEater {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8
    this.directions = [];
  }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ]
  }
  chooseCell(char) {
    this.getNewCordinates()
    let found = []; 
    for (const i in this.directions) {
      let x = this.directions[i][0]; 
      let y = this.directions[i][1]; 
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char || matrix[x][y] == 7) {
          found.push(this.directions[i]);
        }
      }
    }
    return found; 
  }

  move() {    
    let emptyCells = this.chooseCell(0)
    let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; 

    if (emptyCell && this.energy > 0) {
      this.energy--
      let newX = emptyCell[0]
      let newY = emptyCell[1]

      matrix[newX][newY] = 2
      matrix[this.x][this.y] = 0
      this.x = newX
      this.y = newY
    }else if(this.energy <= 0){
      this.die()
    }
  }

  eat() {
    let grassCells = this.chooseCell(1) 
    let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)]; 
    if (grassCell && this.energy > 0) {
      this.energy++
      let newX = grassCell[0]
      let newY = grassCell[1]
      matrix[newX][newY] = 2
      matrix[this.x][this.y] = 0

      for (let i = 0; i < grassArr.length; i++) {
        if(newX == grassArr[i].x && newY == grassArr[i].y){
          grassArr.splice(i, 1)
        }
      }
      this.x = newX
      this.y = newY
    }else{
      this.move()
    }
  }

  mul() {
    let emptyCell = this.chooseCell(0);
    var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; 
    if (newCell && this.energy >= 12) {
      let newX = newCell[0]; 
      let newY = newCell[1]; 
      matrix[newX][newY] = 2; 
      let newGrassEater = new GrassEater(newX, newY);
      grassEaterArr.push(newGrassEater); 
      this.energy = 8;
    }
  }

  die(){
    matrix[this.x][this.y] = 0
    for (let i = 0; i < grassEaterArr.length; i++) {
      if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
        grassEaterArr.splice(i, 1)
      }
    }

  }
}


class Gazanik {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8
    this.directions = [];
  }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ]
  }
  chooseCell(char,char_1,char_2) {
    this.getNewCordinates()
    let found = []; 
    for (const i in this.directions) {
      let x = this.directions[i][0]; 
      let y = this.directions[i][1]; 
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char || matrix[x][y]  == char_1 || matrix[x][y] == char_2) {
          found.push(this.directions[i]);
        }
      }
    }
    return found; 
  }

  move() {    
    let emptyCells = this.chooseCell(1,0,7)
    let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; 

    if (emptyCell && this.energy > 0) {
      this.energy-=0.5
      let newX = emptyCell[0]
      let newY = emptyCell[1]
      matrix[newX][newY] = 3
      matrix[this.x][this.y] = 0
      this.x = newX
      this.y = newY
    }else if(this.energy <= 0){
      this.energy-=0.5
      this.die()
    }
  }

  eat() {
    let grEatCells = this.chooseCell(2,4,5) 
    let grEatCell = grEatCells[Math.floor(Math.random() * grEatCells.length)]; 
    if (grEatCell && this.energy > 0) {
      let newX = grEatCell[0]
      let newY = grEatCell[1]
      if (matrix[newX][newY] == 4 || matrix[newX][newY] == 5){
        this.energy+=0.85
      }else {
        this.energy+=3
      }
      matrix[newX][newY] = 3
      matrix[this.x][this.y] = 0
      for (let i = 0; i < grassEaterArr.length; i++) {
        if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
          grassEaterArr.splice(i, 1)
        }
      }
      for (let i = 0; i < mashroomArr.length; i++) {
        if(newX == mashroomArr[i].x && newY == mashroomArr[i].y){
          mashroomArr.splice(i, 1)
        }
      }
      this.x = newX
      this.y = newY
    }else{
      this.move()
    }
  }

  mul() {
    let emptyCell = this.chooseCell(0,1)
    var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; 
    if (newCell && this.energy >= 12) {
      let newX = newCell[0]; 
      let newY = newCell[1]; 
      matrix[newX][newY] = 3; 
      let newGazanik = new Gazanik(newX, newY);
      gazanikArr.push(newGazanik); 
      this.energy = 8;
    }
  }

  die(){
    matrix[this.x][this.y] = 0
    for (let i = 0; i < gazanikArr.length; i++) {
      if(this.x == gazanikArr[i].x && this.y == gazanikArr[i].y){
        gazanikArr.splice(i, 1)
      }
    }

  }
}

class Mashroom {
  constructor(x, y,bloomfactor) {
    this.x = x;
    this.y = y;
    this.multiplyfactor = 0
    this.multiply = 0
    this.bloomfactor = bloomfactor
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char) {
    let found = []
    for (const i in this.directions) {
      let x = this.directions[i][0]; 
      let y = this.directions[i][1]; 
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char || matrix[x][y] == 7) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    if (this.multiply == 2){
      let emptyCell = this.chooseCell(0); 
      var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (emptyCell.length > 2 && this.multiplyfactor == 0) {
        let newX = newCell[0]; 
        let newY = newCell[1]; 
        matrix[newX][newY] = 4; 
        let newMashroom = new Mashroom(newX, newY,0);
        mashroomArr.push(newMashroom); 
        this.multiplyfactor = 1
        this.bloomfactor = 1
        this.multiply = 0
      }else {
        this.bloom()
        
      }
    }
    this.multiply++
  }

  bloom(){
    let emptyCell = this.chooseCell(0);
    if (emptyCell.length < 3  && this.bloomfactor == 0 ){
      for (const i in this.directions) {
        let x = this.directions[i][0]
        let y = this.directions[i][1]
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          matrix[x][y] = 5
          let newMashroom = new Mashroom(x,y,1)
          mashroomArr.push(newMashroom)
        }
      }
      matrix[this.x][this.y] = 5
      let newMashroom = new Mashroom(this.x,this.y,1)
      mashroomArr.push(newMashroom)
      this.bloomfactor = 1
    }
  }
}

class Rain {
  constructor(x,y){
      this.x = x
      this.y = y
      this.length = 100
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
      ]
      this.globalDirections = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1], // 
        [this.x - 2, this.y - 2],
        [this.x - 2, this.y - 2],
        [this.x - 1, this.y - 2],
        [this.x, this.y - 2],
        [this.x + 1, this.y - 2],
        [this.x + 2, this.y - 2],
        [this.x + 2, this.y - 1],
        [this.x + 2, this.y],
        [this.x - 2, this.y + 2],
        [this.x - 1, this.y + 2],
        [this.x, this.y + 2],
        [this.x + 1, this.y + 2],
        [this.x + 2, this.y + 2],
      ]
      this.dir = Math.floor(Math.random() * this.directions.length)
  }

  getNewCordinates() {
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
        [this.x + 1, this.y],
      ]
      this.globalDirections = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1], // 
        [this.x - 2, this.y - 2],
        [this.x - 2, this.y - 2],
        [this.x - 1, this.y - 2],
        [this.x, this.y - 2],
        [this.x + 1, this.y - 2],
        [this.x + 2, this.y - 2],
        [this.x + 2, this.y - 1],
        [this.x + 2, this.y],
        [this.x - 2, this.y + 2],
        [this.x - 1, this.y + 2],
        [this.x, this.y + 2],
        [this.x + 1, this.y + 2],
        [this.x + 2, this.y + 2],
      ]
  }

  chooseCell(char,directing) {
      this.getNewCordinates()
      let found = []
      if(directing == 0){
        for (const i in this.directions) {
          let x = this.directions[i][0];
          let y = this.directions[i][1];
          if ( x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[x][y] == char) {
              found.push(this.directions[i]);
            }
          }
        }
      }else if (directing == 1){
        for (const i in this.globalDirections) {
          let x = this.globalDirections[i][0];
          let y = this.globalDirections[i][1];
          if ( x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[x][y] == char) {
              found.push(this.globalDirections[i]);
            }
          }
        }
      }
      return found;
  }

  cloudMove(){
      this.getNewCordinates()
      let newX = this.directions[this.dir][0]
      let newY = this.directions[this.dir][1]
      if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length){
        matrix[newX][newY] = 6
        matrix[this.x][this.y] = 0
        this.x = newX
        this.y = newY
      }else{
        this.retry()
      }
  }

  retry(){
    this.dir = Math.floor(Math.random() * this.directions.length)
    let newX = this.directions[this.dir][0]
    let newY = this.directions[this.dir][1]
    if(this.dir % 2 == 1 && newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length){
      this.retry()
    }
  }
   
  raining(){
    let emptyCell = this.chooseCell(0,1);
    var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 7;
        }
    }
 
 
}
