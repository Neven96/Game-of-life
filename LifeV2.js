function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {

  // OBJECTS
  // Stores all size and colors of the cell
  class Cell {
    constructor(rectSize, cubeSize, cellColor, backgroundColor) {
      this.rectSize = rectSize;
      this.cubeSize = cubeSize;
      this.cellColor = cellColor;
      this.backgroundColor = backgroundColor;
    }

    get getRectSize() {
      return this.rectSize;
    }

    get getCubeSize() {
      return this.cubeSize;
    }

    get getCellColor() {
      return this.cellColor;
    }

    get getBackgroundColor() {
      return this.backgroundColor;
    }
  }

  // Sets the speed, so that we don't have to use the switch statement each round
  const speedObject = {
    speed: 500,

    get getSpeed() {
      return this.speed;
    },

    /**
     * @param {number} speed
     */
    set setSpeed(speed) {
      this.speed = speed;
    }
  }

  // Sets the type of level, so that pause knows which game to start
  const levelType = {
    typeLevel: 1,

    get getTypeLevel() {
      return this.typeLevel;
    },

    /**
     * @param {number} typeLevel
     */
    set setTypeLevel(typeLevel) {
      this.typeLevel = typeLevel;
    }
  };

  // Sets the type of board, auto-populate or drawing
  const spillType = {
    typeSpill: 1,

    get getTypeSpill() {
      return this.typeSpill;
    },

    /**
     * @param {number} typeSpill
     */
    set setTypeSpill(typeSpill) {
      this.typeSpill = typeSpill;
    }
  }

  const generationsObject = {
    generations: 0,

    get getGenerations() {
      return this.generations;
    },

    /**
     * @param {number} generations
     */
    set setGenerations(generations) {
      this.generations = generations;
    },

    increaseGenerations() {
      this.generations++;
    }
  }

  const aliveCountObject = {
    aliveCount: 0,

    get getAliveCount() {
      return this.aliveCount;
    },

    /**
     * @param {number} aliveCount
     */
    set setAliveCount(aliveCount) {
      this.aliveCount = aliveCount;
    },

    countAlives(array) {
      aliveCount = 0;
      array.forEach(element => {
        element.forEach(index => {
          if (index === 1) {
            aliveCount += 1;
          }
       });
      });

      return aliveCount;
    }
  }

  // Stores the value of pause in an object for easier access and storage
  const pauseObject = {
    pause: false,

    get getPause() {
      return this.pause;
    },

    /**
     * @param {boolean} pause
     */
    set setPause(pause) {
      this.pause = pause;
    },

    //Pauses/unpauses the game
    pauseSpill() {
      if (!this.pause) {
        this.pause = true;
        document.getElementById("pauseKnapp").textContent = "Play";
      } else if (this.pause) {
        this.pause = false;
        typeLevel = levelType.getTypeLevel;
        spilleSpill(typeLevel);
        document.getElementById("pauseKnapp").textContent = "Pause";
      }
    }
  }

  // Global variables
  let rowArray;
  let columnArray;
  let changedArray;

  let started = false;
  let drawable = false;

  // Object for cell size and colors
  const cell = new Cell(8, 7, "#0000FF", "#D3D3D3");

  let playGame;
  // let t1;
  // let t2;
  // let totalTime;
  // let averageTime;

  let aliveArray;
  let equal;
  let equalOnce;

  // Used to show the speed name at the start
  selectSpeed();

  const bane = document.getElementById("bane");
  const innhold = bane.getContext("2d");

  document.getElementById("populateKnapp").onclick = function() {
    spillType.setTypeSpill = 1;
    populateSpill();
  };
  document.getElementById("drawKnapp").onclick = function() {
    spillType.setTypeSpill = 2;
    populateSpill();
  };

  document.getElementById("playBoxedKnapp").onclick = function () { 
    levelType.setTypeLevel = 1;
    startSpill();
  };
  document.getElementById("playInfinityKnapp").onclick = function () { 
    levelType.setTypeLevel = 2;
    startSpill();
  };

  document.getElementById("pauseKnapp").onclick = function () { 
    pauseObject.pauseSpill();
  };
  document.getElementById("fart").onchange = function () { 
    selectSpeed();
  };

  //Creates board
  function populateSpill() {
    clearTimeout(playGame);
    generationsObject.setGenerations = 0;
    aliveCount = aliveCountObject.getAliveCount;

    // totalTime = 0;
    // averageTime = 0;
    // t1 = 0;
    // t2 = 0;

    started = false;
    equalOnce = false;
    pauseObject.setPause = true;

    rowArray = [];
    columnArray = [];
    changedArray = [];
    aliveArray = [];

    let typeSpill = spillType.getTypeSpill;

    // The game auto-populates the board
    if (typeSpill == 1) {


      let percentageAlive = document.getElementById("prosent").value;
      if (percentageAlive <= 0) {
        percentageAlive = 10;
      } else if (percentageAlive >= 50) {
        percentageAlive = 50;
      }

      for (var i = 0; i <= bane.height/(cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width/(cell.getRectSize); j++) {
          randNum = Math.floor((Math.random() * (100/percentageAlive)) + 1);
          if (randNum <= 1) {
            columnArray[j] = 1;
          } else {
            columnArray[j] = 0;
          }
        }
        rowArray[i] = columnArray;
      }

      document.getElementById("populateKnapp").textContent = "Repopulate";
      document.getElementById("drawKnapp").textContent = "Draw";

    // The game is ready for drawing(dotting) the board
    } else if (typeSpill == 2) {
      for (var i = 0; i <= bane.height/(cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width/(cell.getRectSize); j++) {
          columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
      }

      document.getElementById("populateKnapp").textContent = "Populate";
      document.getElementById("drawKnapp").textContent = "Redraw";

      drawable = true;
    }

    drawSpill();

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
  }

  bane.addEventListener('click', function (e) {
    paintLevel(bane, e)
  });

  //Allows painting on grid
  function paintLevel(bane, event) {
    if (drawable) {
      const rect = bane.getBoundingClientRect();
      // Finds the x and y coordinates of the board
      // This is somewhat off from my coordinates, not sure why
      const x = event.clientX - rect.left - 3;
      const y = event.clientY - rect.top - 3;
      // Derives the start coordinates of the cell from the size of it
      let x_true = (Math.floor(x / cell.getRectSize) * cell.getRectSize);
      let y_true = (Math.floor(y / cell.getRectSize) * cell.getRectSize);
      // Derives the index of the cell in the rowArray array
      let x_array_index = x_true / (cell.getRectSize);
      let y_array_index = y_true / (cell.getRectSize);

      if (rowArray[y_array_index][x_array_index] == 0) {
        rowArray[y_array_index][x_array_index] = 1;
      } else if (rowArray[y_array_index][x_array_index] == 1) {
        rowArray[y_array_index][x_array_index] = 0;
      }
      drawSpill();
    }
  }

  //Draws the level
  function drawSpill() {
    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        // If the cell is alive
        if (rowArray[i][j] == 1) {
          innhold.fillStyle = cell.getCellColor;
          innhold.fillRect(j*cell.getRectSize,i*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        // If the cell is alive
        } else {
          innhold.fillStyle = cell.getBackgroundColor;
          innhold.fillRect(j*cell.getRectSize,i*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        }
      }
    }

    aliveCount = aliveCountObject.countAlives(rowArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Redraws the risen/killed cells
  function reDrawSpill(changedArray) {
    for (var i = 0; i < changedArray.length; i++) {
      // If the cell was alive, but is now dead
      if (rowArray[changedArray[i][0]][changedArray[i][1]] == 1) {
        innhold.fillStyle = cell.getBackgroundColor;
        innhold.fillRect(changedArray[i][1]*cell.getRectSize,changedArray[i][0]*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        rowArray[changedArray[i][0]][changedArray[i][1]] = 0;
      // If the cell was dead, but is now alive
      } else if (rowArray[changedArray[i][0]][changedArray[i][1]] == 0) {
        innhold.fillStyle = cell.getCellColor;
        innhold.fillRect(changedArray[i][1]*cell.getRectSize,changedArray[i][0]*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        rowArray[changedArray[i][0]][changedArray[i][1]] = 1;
      }
    }

    generationsObject.increaseGenerations();
    aliveCount = aliveCountObject.countAlives(rowArray);

    if (!equalOnce) {
      if (aliveCount === 0) {
        document.getElementById("stabilizedSpan").textContent = "Life is dead"
        equalOnce = true;
        pauseObject.pauseSpill();
      }
      if (aliveArray.length < 10) {
        aliveArray.push(aliveCount);
      } else {
        aliveArray.shift();
        aliveArray.push(aliveCount);
        equal = aliveArray.every((val, ind, arr) => val === arr[0]);

        if (equal) {
          document.getElementById("stabilizedSpan").textContent = "Life is stabilized"
          equalOnce = true;
          pauseObject.pauseSpill();
        }
      }
    }

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Changes gamespeed
  function selectSpeed() {
    let gameSpeed = document.getElementById("fart").value;
    gameSpeed = parseInt(gameSpeed);
    switch (gameSpeed) {
      case 1:
        speedName = "Slowester";
        speed = 3000;
        break;
      case 2:
        speedName = "Slowest";
        speed = 2250;
        break;
      case 3:
        speedName = "Slower";
        speed = 1250;
        break;
      case 4:
        speedName = "Slow";
        speed = 750;
        break;
      case 5:
        speedName = "Normal";
        speed = 500;
        break;
      case 6:
        speedName = "Fast";
        speed = 250;
        break;
      case 7:
        speedName = "Faster";
        speed = 150;
        break;
      case 8:
        speedName = "Fastest";
        speed = 75;
        break;
      case 9:
        speedName = "Fastester"
        speed = 30;
        break;
      default:
        speedName = "Normal";
        speed = 500;
    }

    document.getElementById("outSpan").textContent = speedName;
    speedObject.setSpeed = speed;
  }

  //Starts the game
  function startSpill() {
    //t1 = performance.now();
    started = true;
    pauseObject.setPause = false;
    drawable = false;
    typeLevel = levelType.getTypeLevel;

    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseKnapp").textContent = "Pause";
    spilleSpill(typeLevel);
  }

  //Runs the game
  function spilleSpill(typeLevel) {
    changedArray = [];
    speed = speedObject.getSpeed;
    // if (generations >= 100) {
    //   t2 = performance.now();
    //   totalTime += t2-t1;
    //   averageTime = totalTime/generations;
    //   console.log("Average time:");
    //   console.log(averageTime);
    //   pauseSpill();
    //   populateSpill(1);
    //   startSpill(2);
    // }
    if (!pauseObject.getPause && started) {
      playGame = setTimeout(function () {
        isPaused(typeLevel);
      }, speed);
    }
  }

  function isPaused(typeLevel) {
    if (!pauseObject.getPause) {
      if (typeLevel === 1) {
        playBoxedSpill();
      } else if (typeLevel === 2) {
        playInfinitySpillV4();
      }
    }
  }

  // Without borders, new render, much faster than every other
  function playInfinitySpillV4() {
    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        // Checks dead cells for the number of neighbours
        if (rowArray[i][j] == 0) {
          switch ((rowArray[mod(i - 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
            + rowArray[mod(i - 1, rowArray.length)][j]
            + rowArray[mod(i - 1, rowArray.length)][mod(j + 1, rowArray[i].length)])
          + (rowArray[i][mod(j - 1, rowArray[i].length)]
            + rowArray[i][mod(j + 1, rowArray[i].length)])
          + (rowArray[mod(i + 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
            + rowArray[mod(i + 1, rowArray.length)][j]
            + rowArray[mod(i + 1, rowArray.length)][mod(j + 1, rowArray[i].length)])) {
            case 3:
              // Alive
              changedArray.push([i, j]);
          }
        } else
          if (rowArray[i][j] == 1) {
            // Checks alive cells for number of neighbours
            switch ((rowArray[mod(i - 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
              + rowArray[mod(i - 1, rowArray.length)][j]
              + rowArray[mod(i - 1, rowArray.length)][mod(j + 1, rowArray[i].length)])
            + (rowArray[i][mod(j - 1, rowArray[i].length)]
              + rowArray[i][mod(j + 1, rowArray[i].length)])
            + (rowArray[mod(i + 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
              + rowArray[mod(i + 1, rowArray.length)][j]
              + rowArray[mod(i + 1, rowArray.length)][mod(j + 1, rowArray[i].length)])) {
              case 2:
                // Stay alive
                break;
              case 3:
                // Stay alive
                break;
              default:
                // Dead
                changedArray.push([i, j]);
            }
          }
      }
    }

    typeLevel = 2;

    reDrawSpill(changedArray);
    spilleSpill(typeLevel);
  }

  // With borders
  function playBoxedSpill() {
    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        // Top row
        if (i == 0) {
          // Top-left corner
          if (j == 0) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j + 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j + 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Top-right corner
          else if (j == rowArray[i].length - 1) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j - 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j - 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j - 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Rest of top row
          else {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j - 1] + rowArray[i][j + 1]
              + rowArray[i + 1][j - 1] + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j - 1]
              + rowArray[i][j + 1]
              + rowArray[i + 1][j - 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
        } // Top row end

        // Bottom row
        else if (i == rowArray.length - 1) {
          // Bottom-left corner
          if (j == 0) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j + 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j + 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Bottom-right corner
          else if (j == rowArray[i].length - 1) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j - 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j - 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j - 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Rest of bottom row
          else {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i][j - 1]
              + rowArray[i][j + 1]
              + rowArray[i - 1][j - 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i][j - 1]
              + rowArray[i][j + 1]
              + rowArray[i - 1][j - 1]
              + rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
        } // Bottom row end

        //Between top and bottom row
        else {
          // Left column
          if (j == 0) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]
              + rowArray[i][j + 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i - 1][j]
              + rowArray[i - 1][j + 1]
              + rowArray[i][j + 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j + 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Right column
          else if (j == rowArray[i].length - 1) {
            if (rowArray[i][j] == 0) {
              switch (rowArray[i - 1][j]
              + rowArray[i - 1][j - 1]
              + rowArray[i][j - 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch (rowArray[i - 1][j]
              + rowArray[i - 1][j - 1]
              + rowArray[i][j - 1]
              + rowArray[i + 1][j]
              + rowArray[i + 1][j - 1]) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
          // Middle of map
          else {
            if (rowArray[i][j] == 0) {
              switch ((rowArray[i - 1][j - 1] + rowArray[i - 1][j] + rowArray[i - 1][j + 1])
              + (rowArray[i][j - 1] + rowArray[i][j + 1])
              + (rowArray[i + 1][j - 1] + rowArray[i + 1][j] + rowArray[i + 1][j + 1])) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (rowArray[i][j] == 1) {
              switch ((rowArray[i - 1][j - 1] + rowArray[i - 1][j] + rowArray[i - 1][j + 1])
              + (rowArray[i][j - 1] + rowArray[i][j + 1])
              + (rowArray[i + 1][j - 1] + rowArray[i + 1][j] + rowArray[i + 1][j + 1])) {
                case 2:
                  // Stay alive
                  break;
                case 3:
                  // Stay alive
                  break;
                default:
                  // Dead
                  changedArray.push([i, j]);
              }
            }
          }
        }
      }
    }

    typeLevel = 1;

    reDrawSpill(changedArray);
    spilleSpill(typeLevel);
  }
}
