class Fish extends LeavingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8
        this.directions = []
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
                if (matrix[x][y] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let emptyCells = this.chooseCell(8)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.energy -= 0.25
        if (emptyCell && this.energy > 0) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 9
            matrix[this.x][this.y] = 8
            this.x = newX
            this.y = newY
        } else if (this.energy <= 0) {
            this.die()
        }
    }

    eat() {
        let grEatCells = this.chooseCell(9)
        let grEatCell = grEatCells[Math.floor(Math.random() * grEatCells.length)];
        if (grEatCell && this.energy > 0) {
            for (const i in fishArr) {
                if (fishArr[i].x == grEatCell[0] && fishArr[i].y == grEatCell[1]) {
                    let otheFish = fishArr[i]
                }
            }
            let newX = grEatCell[0]
            let newY = grEatCell[1]
            this.energy += 3
            matrix[newX][newY] = 9
            matrix[this.x][this.y] = 8
            for (let i = 0; i < fishArr.length; i++) {
                if (newX == fishArr[i].x && newY == fishArr[i].y && fishArr[i].state != 'small') {
                    fishArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.move()
        }
    }

    mul() {
        for (let i = 0; i < 3; i++) {
            let emptyCell = this.chooseCell(8)
            var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
            if (newCell && this.energy >= 12) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newX][newY] = 9;
                let newFish = new Fish(newX, newY);
                fishArr.push(newFish);
                if (i == 3) {
                    this.energy = 4;
                }
            }
        }
    }

    die() {
        matrix[this.x][this.y] = 8
        for (let i = 0; i < fishArr.length; i++) {
            if (this.x == fishArr[i].x && this.y == fishArr[i].y) {
                fishArr.splice(i, 1)
            }
        }
    }
}