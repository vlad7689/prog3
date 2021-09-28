class Gazanik extends LeavingCreature {
    constructor(x, y) {
      super(x,y)
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
        this.energy-=0.25
        let newX = emptyCell[0]
        let newY = emptyCell[1]
        matrix[newX][newY] = 3
        matrix[this.x][this.y] = 0
        this.x = newX
        this.y = newY
      }else if(this.energy <= 0){
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