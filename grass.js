class Grass {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.multiply = 0;
     this.multiplySpeed = 8
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
      if (matrix[newX][newY] == 7) {
        matrix[newX][newY] = 1;
        let newGrass = new Grass(newX, newY);
        newGrass.multiplySpeed = 3
        grassArr.push(newGrass);
        this.multiply = 0;
      }else{
        matrix[newX][newY] = 1;
        let newGrass = new Grass(newX, newY);
        grassArr.push(newGrass);
        this.multiply = 0;
      }
    }
  }
}









