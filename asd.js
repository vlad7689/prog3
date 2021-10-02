class LeavingCreature {
   constructor(x, y) {
      this.x = x
      this.y = y
   }
}

let gamecolor = 0
let origclr = ['green', 'yellow', 'red', 'white', '#bd682f', '#7a3c12', '#8a8a8a50', 'blue']
let exclr = ['#469c5d', '#dbc046', '#ab3a3a', '#a88859', '#a3886c', '#806f5e', '#c2c2c250', '#8ea8d1']
let cosclr = ['#6d178a', '#5c5c5c', '#27008a', '#0b031a', '#005737', '#002e1d', '#a3812950', '#a7ab5c']
let color;
let n = 100
let side = 7
let matrix = []
let grassArr = []
let grassEaterArr = []
let gazanikArr = []
let mashroomArr = []
let rainArr = []
let cloudweight = []
let fishArr = []
let allObjectArr = [grassArr, grassEaterArr, gazanikArr, mashroomArr, rainArr]
let oceanCoords = []
let earthCoords = []


for (let i = 0; i < n; i++) {
   matrix[i] = []
   for (let j = 0; j < n; j++) {
      let round = Math.floor(Math.random() * 10000)
      if (round % 200 == 0) {
         matrix[i][j] = 4
      } else if (round % 50 == 0) {
         matrix[i][j] = 3
      } else if (round % 15 == 0) {
         matrix[i][j] = 2
      } else if (round % 2 == 0) {
         matrix[i][j] = 1
      } else {
         matrix[i][j] = 0
      }
   }
}

for (let x = 0; x < matrix.length; x++) {
   for (let y = 0; y < matrix[x].length; y++) {
      if (y > matrix[x].length * (3 / 4)) {
         oceanCoords.push([x, y])
      } else {
         earthCoords.push([x, y])
      }
   }
}

for (let i = 0; i < n; i++) {
   for (let j = 0; j < n; j++) {
      for (let s = 0; s < oceanCoords.length; s++) {
         if (i == oceanCoords[s][0] && j == oceanCoords[s][1]) {
            matrix[i][j] = 8
         }
      }
   }
   for (let i = 0; i < oceanCoords.length; i++) {
      let round = Math.floor(Math.random() * 10000)
      if (round % 2500 == 0) {
         matrix[oceanCoords[i][0]][oceanCoords[i][1]] = 9
      }
   }
}

for (var j = 0; j < 12; j++) {
   cloudweight.push(Math.floor(Math.random() * 10) + 5)
   matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix.length)] = 6
}

function setup() {
   createCanvas(n * side, n * side)
   background('gold')
   noStroke()

   for (var x = 0; x < matrix.length; x++) {
      for (var y = 0; y < matrix[x].length; y++) {
         if (matrix[x][y] == 1) {
            var gr = new Grass(x, y);
            grassArr.push(gr);
         } else if (matrix[x][y] == 2) {
            var grEat = new GrassEater(x, y);
            grassEaterArr.push(grEat);
         } else if (matrix[x][y] == 3) {
            var gazan = new Gazanik(x, y);
            grassEaterArr.push(gazan);
         } else if (matrix[x][y] == 4) {
            var mashr = new Mashroom(x, y, 0)
            mashroomArr.push(mashr)
         } else if (matrix[x][y] == 6) {
            var cloud = new Rain(x, y,)
            rainArr.push(cloud)
         }else if (matrix[x][y] == 9) {
            var fish = new Fish(x, y)
            fishArr.push(fish)
         }
      }
   }
}
function draw() {
   for (let i = 0; i < 3; i++) {
      document.getElementsByTagName('div')[i].onclick = function coloring() { gamecolor = i + 1 }
   }
   frameRate(3)
   if (gamecolor == '1') {
      color = origclr
   } else if (gamecolor == '2') {
      color = exclr
   } else if (gamecolor == '3') {
      color = cosclr
   } else[
      color = origclr
   ]
   for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
         if (matrix[x][y] == 1) {
            fill(color[0])
         } else if (matrix[x][y] == 2) {
            fill(color[1])
         } else if (matrix[x][y] == 3) {
            fill(color[2])
         } else if (matrix[x][y] == 4) {
            fill(color[4])
         } else if (matrix[x][y] == 5) {
            fill(color[5])
         } else if (matrix[x][y] == 7) {
            fill(color[7])
         } else if (matrix[x][y] == 8) {
            fill(color[7])
         } else if (matrix[x][y] == 9) {
            fill('orange')
         } else if (matrix[x][y] == 0) {
            fill(color[3])
         }
         rect(y * side, x * side, side, side)
         if (mashroomArr.length < 35) {
            console.log(1);
            let newX = earthCoords[Math.floor(Math.random() * earthCoords.length)][0]
            let newY = earthCoords[Math.floor(Math.random() * earthCoords.length)][1]
            for (let i = 0; i < allObjectArr.length; i++) {
               for (let j = 0; j < allObjectArr[i].length; j++) {
                  if (newX == allObjectArr[i][j].x && newY == allObjectArr[i][j].y) {
                     allObjectArr[i].splice(j, 1)
                     break
                  }
               }
            }
            matrix[newX][newY] = 4
            let mashr = new Mashroom(newX, newY, 0)
            mashroomArr.push(mashr)

         }

         allObjectArr = [grassArr, grassEaterArr, gazanikArr, mashroomArr, rainArr]

         for (let s = 0; s < oceanCoords.length; s++) {
            if (x == oceanCoords[s][0] && y == oceanCoords[s][1] && matrix[x][y] != 8 && matrix[x][y] != 6 && matrix[x][y] != 9) {
               matrix[x][y] = 8
            }
         }
      }
   }
   let j = 0
   for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
         if (matrix[x][y] == 6) {
            fill(color[6])
            stroke(color[6])
            strokeWeight(cloudweight[j++] * side)
            rect(y * side, x * side, side, side)
         }
      }
   }
   noStroke()
   for (const i in grassArr) {
      grassArr[i].mul();
   }
   for (const i in grassEaterArr) {
      grassEaterArr[i].mul()
      grassEaterArr[i].eat()
   } for (const i in gazanikArr) {
      gazanikArr[i].mul()
      gazanikArr[i].eat()
   } for (const i in mashroomArr) {
      mashroomArr[i].mul()
   } for (const i in rainArr) {
      rainArr[i].cloudMove()
      rainArr[i].raining()
   }for (const i in fishArr) {
      fishArr[i].mul()
      fishArr[i].eat()
   }

}



