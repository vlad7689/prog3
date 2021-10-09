class Mashroom extends LeavingCreature {
  constructor(x, y, bloomfactor) {
    super(x, y)
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
    if (this.multiply == 2) {
      let emptyCell = this.chooseCell(0);
      var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (emptyCell.length > 2 && this.multiplyfactor == 0) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 4;
        let newMashroom = new Mashroom(newX, newY, 0);
        mashroomArr.push(newMashroom);
        this.multiplyfactor = 1
        this.bloomfactor = 1
        this.multiply = 0
      } else {
        if (temperature > -5) {
          this.bloom()
        }
      }
    }
    this.multiply++
  }

  bloom() {
    let emptyCell = this.chooseCell(0);
    if (emptyCell.length < 3 && this.bloomfactor == 0) {
      for (const i in this.directions) {
        let x = this.directions[i][0]
        let y = this.directions[i][1]
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          matrix[x][y] = 5
          let newMashroom = new Mashroom(x, y, 1)
          mashroomArr.push(newMashroom)
        }
      }
      matrix[this.x][this.y] = 5
      let newMashroom = new Mashroom(this.x, this.y, 1)
      mashroomArr.push(newMashroom)
      this.bloomfactor = 1
    }
  }
}