function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {

  // OBJECTS
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

  // Change column and row...
  let columnArray;
  let rowArray;
  let changedArray;

  let pause = false;
  let started = false;
  let drawable = false;

  let rectSize = 8;
  let cubeSize = 6;
  let cellColor = "#0000FF"
  let backgroundColor = "#D3D3D3"

  let playGame;
  // let t1;
  // let t2;
  // let totalTime;
  // let averageTime;

  let aliveCount;
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
    pauseSpill();
  };
  document.getElementById("fart").onchange = function () { 
    selectSpeed();
  };

  //Creates board
  function populateSpill() {
    clearTimeout(playGame);
    generationsObject.setGenerations = 0;
    aliveCount = 0;

    // totalTime = 0;
    // averageTime = 0;
    // t1 = 0;
    // t2 = 0;

    started = false;
    equalOnce = false;
    pause = true;

    columnArray = [];
    rowArray = [];
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

      for (var i = 0; i <= bane.height/(rectSize); i++) {
        rowArray = [];
        for (var j = 0; j <= bane.width/(rectSize); j++) {
          randNum = Math.floor((Math.random() * (100/percentageAlive)) + 1);
          if (randNum <= 1) {
            rowArray[j] = 1;
          } else {
            rowArray[j] = 0;
          }
        }
        columnArray[i] = rowArray;
      }
      //console.log("Populated");
      //console.log(columnArray);
      document.getElementById("populateKnapp").textContent = "Repopulate";
      document.getElementById("drawKnapp").textContent = "Draw";

    // The game is ready for drawing(dotting) the board
    } else if (typeSpill == 2) {
      for (var i = 0; i <= bane.height/(rectSize); i++) {
        rowArray = [];
        for (var j = 0; j <= bane.width/(rectSize); j++) {
          rowArray[j] = 0;
        }
        columnArray[i] = rowArray;
      }

      document.getElementById("populateKnapp").textContent = "Populate";
      document.getElementById("drawKnapp").textContent = "Redraw";

      drawable = true;
    }

    drawSpill();

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
  }

  bane.addEventListener('click', function (e) {
    paintLevel(bane, e)
  });

  //Allows painting on grid
  function paintLevel(bane, event) {
    if (drawable) {
      const rect = bane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let x_true = Math.floor(x / rectSize) * rectSize;
      let y_true = Math.floor(y / rectSize) * rectSize;
      if (columnArray[y_true/(rectSize)][x_true/(rectSize)] == 0) {
        columnArray[y_true/(rectSize)][x_true/(rectSize)] = 1;
      } else if (columnArray[y_true/(rectSize)][x_true/(rectSize)] == 1) {
        columnArray[y_true/(rectSize)][x_true/(rectSize)] = 0;
      }
      drawSpill();
    }
  }

  //Draws the level
  function drawSpill() {
    for (var i = 0; i < columnArray.length; i++) {
      for (var j = 0; j < columnArray[i].length; j++) {
        // If the cell is alive
        if (columnArray[i][j] == 1) {
          innhold.fillStyle = cellColor;
          innhold.fillRect(j*rectSize,i*rectSize,cubeSize,cubeSize);
        // If the cell is alive
        } else {
          innhold.fillStyle = backgroundColor;
          innhold.fillRect(j*rectSize,i*rectSize,cubeSize,cubeSize);
        }
      }
    }

    aliveCount = countAlives(columnArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Redraws the risen/killed cells
  function reDrawSpill(changedArray) {
    for (var i = 0; i < changedArray.length; i++) {
      // If the cell was alive, but is now dead
      if (columnArray[changedArray[i][0]][changedArray[i][1]] == 1) {
        innhold.fillStyle = backgroundColor;
        innhold.fillRect(changedArray[i][1]*rectSize,changedArray[i][0]*rectSize,cubeSize,cubeSize);
        columnArray[changedArray[i][0]][changedArray[i][1]] = 0;
      // If the cell was dead, but is now alive
      } else if (columnArray[changedArray[i][0]][changedArray[i][1]] == 0) {
        innhold.fillStyle = cellColor;
        innhold.fillRect(changedArray[i][1]*rectSize,changedArray[i][0]*rectSize,cubeSize,cubeSize);
        columnArray[changedArray[i][0]][changedArray[i][1]] = 1;
      }
    }

    generationsObject.increaseGenerations();
    aliveCount = countAlives(columnArray);

    if (!equalOnce) {
      if (aliveArray.length < 10) {
        aliveArray.push(aliveCount);
      } else {
        aliveArray.shift();
        aliveArray.push(aliveCount);
        equal = aliveArray.every((val, ind, arr) => val === arr[0]);

        if (equal) {
          if (aliveArray.at(-1) === 0) {
            document.getElementById("stabilizedSpan").textContent = "Life is dead"
          } else {
            document.getElementById("stabilizedSpan").textContent = "Life is stabilized"
          }
          equalOnce = true;
          pauseSpill();
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
        speed = 300;
        break;
      case 7:
        speedName = "Faster";
        speed = 200;
        break;
      case 8:
        speedName = "Fastest";
        speed = 100;
        break;
      case 9:
        speedName = "Fastester"
        speed = 50;
        break;
      default:
        speedName = "Normal";
        speed = 500;
    }

    document.getElementById("outSpan").textContent = speedName;
    speedObject.setSpeed = speed;
  }

  function countAlives(array) {
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

  //Starts the game
  function startSpill() {
    //t1 = performance.now();
    started = true;
    pause = false;
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
    if (!pause && started) {
      playGame = setTimeout(function () {
        isPaused(typeLevel);
      }, speed);
    }
  }

  function isPaused(typeLevel) {
    if (!pause) {
      if (typeLevel === 1) {
        playBoxedSpill();
      } else if (typeLevel === 2) {
        playInfinitySpillV4();
      }
    }
  }

  //Pauses/unpauses the game
  function pauseSpill() {
    if (!pause) {
      pause = true;
      document.getElementById("pauseKnapp").textContent = "Play";
    } else if (pause) {
      pause = false;
      typeLevel = levelType.getTypeLevel;
      spilleSpill(typeLevel);
      document.getElementById("pauseKnapp").textContent = "Pause";
    }
  }

  // Without borders, new render, much faster than every other
  function playInfinitySpillV4() {
    for (var i = 0; i < columnArray.length; i++) {
      for (var j = 0; j < columnArray[i].length; j++) {
        // Checks dead cells for the number of neighbours
        if (columnArray[i][j] == 0) {
          switch ((columnArray[mod(i - 1, columnArray.length)][mod(j - 1, columnArray[i].length)]
            + columnArray[mod(i - 1, columnArray.length)][j]
            + columnArray[mod(i - 1, columnArray.length)][mod(j + 1, columnArray[i].length)])
          + (columnArray[i][mod(j - 1, columnArray[i].length)]
            + columnArray[i][mod(j + 1, columnArray[i].length)])
          + (columnArray[mod(i + 1, columnArray.length)][mod(j - 1, columnArray[i].length)]
            + columnArray[mod(i + 1, columnArray.length)][j]
            + columnArray[mod(i + 1, columnArray.length)][mod(j + 1, columnArray[i].length)])) {
            case 3:
              // Alive
              changedArray.push([i, j]);
          }
        } else
          if (columnArray[i][j] == 1) {
            // Checks alive cells for number of neighbours
            switch ((columnArray[mod(i - 1, columnArray.length)][mod(j - 1, columnArray[i].length)]
              + columnArray[mod(i - 1, columnArray.length)][j]
              + columnArray[mod(i - 1, columnArray.length)][mod(j + 1, columnArray[i].length)])
            + (columnArray[i][mod(j - 1, columnArray[i].length)]
              + columnArray[i][mod(j + 1, columnArray[i].length)])
            + (columnArray[mod(i + 1, columnArray.length)][mod(j - 1, columnArray[i].length)]
              + columnArray[mod(i + 1, columnArray.length)][j]
              + columnArray[mod(i + 1, columnArray.length)][mod(j + 1, columnArray[i].length)])) {
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
    for (var i = 0; i < columnArray.length; i++) {
      for (var j = 0; j < columnArray[i].length; j++) {
        // Top row
        if (i == 0) {
          // Top-left corner
          if (j == 0) {
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j + 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j + 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
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
          else if (j == columnArray[i].length - 1) {
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j - 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j - 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j - 1]) {
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
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j - 1] + columnArray[i][j + 1]
              + columnArray[i + 1][j - 1] + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j - 1]
              + columnArray[i][j + 1]
              + columnArray[i + 1][j - 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
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
        else if (i == columnArray.length - 1) {
          // Bottom-left corner
          if (j == 0) {
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j + 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j + 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]) {
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
          else if (j == columnArray[i].length - 1) {
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j - 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j - 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j - 1]) {
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
            if (columnArray[i][j] == 0) {
              switch (columnArray[i][j - 1]
              + columnArray[i][j + 1]
              + columnArray[i - 1][j - 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j - 1]
              + columnArray[i][j + 1]
              + columnArray[i - 1][j - 1]
              + columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]) {
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
            if (columnArray[i][j] == 0) {
              switch (columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]
              + columnArray[i][j + 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i - 1][j]
              + columnArray[i - 1][j + 1]
              + columnArray[i][j + 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j + 1]) {
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
          else if (j == columnArray[i].length - 1) {
            if (columnArray[i][j] == 0) {
              switch (columnArray[i - 1][j]
              + columnArray[i - 1][j - 1]
              + columnArray[i][j - 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j - 1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i - 1][j]
              + columnArray[i - 1][j - 1]
              + columnArray[i][j - 1]
              + columnArray[i + 1][j]
              + columnArray[i + 1][j - 1]) {
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
            if (columnArray[i][j] == 0) {
              switch ((columnArray[i - 1][j - 1] + columnArray[i - 1][j] + columnArray[i - 1][j + 1])
              + (columnArray[i][j - 1] + columnArray[i][j + 1])
              + (columnArray[i + 1][j - 1] + columnArray[i + 1][j] + columnArray[i + 1][j + 1])) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch ((columnArray[i - 1][j - 1] + columnArray[i - 1][j] + columnArray[i - 1][j + 1])
              + (columnArray[i][j - 1] + columnArray[i][j + 1])
              + (columnArray[i + 1][j - 1] + columnArray[i + 1][j] + columnArray[i + 1][j + 1])) {
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
