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