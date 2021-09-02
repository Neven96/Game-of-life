function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
  // Change column and row...
  let columnArray;
  let rowArray;
  let changedArray;

  let pause = false;
  let started = false;
  let drawable = false;

  let cubeSize = 5;

  let playGame;
  let percentageAlive;
  let gameSpeed;
  let speed;
  let typeLevel;
  let typeSpill;
  let generations;
  let t1;
  let t2;
  let time;
  let totalTime;
  let averageTime;
  selectSpeed();

  let bane = document.getElementById("bane");
  let innhold = bane.getContext("2d");

  document.getElementById("populateKnapp").onclick = function() {populateSpill(1)};
  document.getElementById("drawKnapp").onclick = function() {populateSpill(2)};

  bane.addEventListener('click', function(e) {
    paintLevel(bane, e)
  });

  //Creates board
  function populateSpill(type) {
    clearTimeout(playGame);
    generations = 0;
    totalTime = 0;
    averageTime = 0;
    t1 = 0;
    t2 = 0;
    started = false;
    pause = true;
    columnArray = [];
    rowArray = [];
    changedArray = [];
    typeSpill = type;

    if (typeSpill == 1) {


      percentageAlive = document.getElementById("prosent").value;
      if (percentageAlive <= 0) {
        percentageAlive = 10;
      } else if (percentageAlive >= 50) {
        percentageAlive = 50;
      }

      for (var i = 0; i <= bane.height/(2*cubeSize); i++) {
        rowArray = [];
        for (var j = 0; j <= bane.width/(2*cubeSize); j++) {
          randNum = Math.floor((Math.random() * (100/percentageAlive)) + 1);
          if (randNum <= 1) {
            rowArray[j] = 1;
          } else {
            rowArray[j] = 0;
          }
        }
        columnArray[i] = rowArray;
      }
      console.log("Populated");
      console.log(columnArray);
      document.getElementById("populateKnapp").textContent = "Repopulate";
      document.getElementById("drawKnapp").textContent = "Draw";
    } else if (typeSpill == 2) {
      for (var i = 0; i <= bane.height/(2*cubeSize); i++) {
        rowArray = [];
        for (var j = 0; j <= bane.width/(2*cubeSize); j++) {
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

  //Allows own painting of course
  function paintLevel(bane, event) {
    if (drawable) {
      const rect = bane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let x_true = Math.floor(x / 10) * 10;
      let y_true = Math.floor(y / 10) * 10;
      if (columnArray[y_true/(2*cubeSize)][x_true/(2*cubeSize)] == 0) {
        columnArray[y_true/(2*cubeSize)][x_true/(2*cubeSize)] = 1;
      } else if (columnArray[y_true/(2*cubeSize)][x_true/(2*cubeSize)] == 1) {
        columnArray[y_true/(2*cubeSize)][x_true/(2*cubeSize)] = 0;
      }
      drawSpill();
    }
  }

  //Draws the level
  function drawSpill() {
    for (var i = 0; i < columnArray.length; i++) {
      for (var j = 0; j < columnArray[i].length; j++) {
        if (columnArray[i][j] == 1) {
          innhold.fillStyle = "#0000FF";
          innhold.fillRect(j*2*cubeSize,i*2*cubeSize,cubeSize,cubeSize);
        } else {
          innhold.fillStyle = "#FFFF00";
          innhold.fillRect(j*2*cubeSize,i*2*cubeSize,cubeSize,cubeSize);
        }
      }
    }
    document.getElementById("generationsSpan").textContent = generations;
  }

  //Redraws the risen/killed blocks
  function reDrawSpill() {
    for (var i = 0; i < changedArray.length; i++) {
      if (columnArray[changedArray[i][0]][changedArray[i][1]] == 1) {
        innhold.fillStyle = "#FFFF00";
        innhold.fillRect(changedArray[i][1]*2*cubeSize,changedArray[i][0]*2*cubeSize,cubeSize,cubeSize);
        columnArray[changedArray[i][0]][changedArray[i][1]] = 0;
      } else if (columnArray[changedArray[i][0]][changedArray[i][1]] == 0) {
        innhold.fillStyle = "#0000FF";
        innhold.fillRect(changedArray[i][1]*2*cubeSize,changedArray[i][0]*2*cubeSize,cubeSize,cubeSize);
        columnArray[changedArray[i][0]][changedArray[i][1]] = 1;
      }
    }
    document.getElementById("generationsSpan").textContent = generations;
  }

  //Changes gamespeed
  function selectSpeed() {
    gameSpeed = document.getElementById("fart").value;
    gameSpeed = parseInt(gameSpeed);
    switch (gameSpeed) {
      case 1:
        speedName = "Slowester";
        speed = 5000;
        break;
      case 2:
        speedName = "Slowest";
        speed = 2500;
        break;
      case 3:
        speedName = "Slower";
        speed = 1500;
        break;
      case 4:
        speedName = "Slow";
        speed = 1000;
        break;
      case 5:
        speedName = "Normal";
        speed = 750;
        break;
      case 6:
        speedName = "Fast";
        speed = 500;
        break;
      case 7:
        speedName = "Faster";
        speed = 250;
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
        speed = 750;
    }

    document.getElementById("outSpan").textContent = speedName;
  }

  document.getElementById("playBoxedKnapp").onclick = function() {startSpill(1)};
  document.getElementById("playInfinityKnapp").onclick = function() {startSpill(2)};
  document.getElementById("pauseKnapp").onclick = function() {pauseSpill()};
  document.getElementById("fart").onchange = function() {selectSpeed()};

  //Starts the game
  function startSpill(level) {
    t1 = performance.now();
    started = true;
    pause = false;
    drawable = false;
    typeLevel = level;
    spilleSpill();
    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseKnapp").textContent = "Pause";
  }

  //Runs the game
  function spilleSpill() {
    changedArray = [];
    selectSpeed();
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
      if (typeLevel == 1) {
        playGame = setTimeout(playBoxedSpill, speed);
        generations++;
      } else if (typeLevel == 2) {
        playGame = setTimeout(playInfinitySpillV4, speed);
        generations++;
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
      spilleSpill();
      document.getElementById("pauseKnapp").textContent = "Pause";
    }
  }

  // Without borders, new render, much faster than every other
  function playInfinitySpillV4() {
    for (var i = 0; i < columnArray.length; i++) {
      for (var j = 0; j < columnArray[i].length; j++) {
        if (columnArray[i][j] == 0) {
          switch ((columnArray[mod(i-1, columnArray.length)][mod(j-1, columnArray[i].length)] + columnArray[mod(i-1, columnArray.length)][j] + columnArray[mod(i-1, columnArray.length)][mod(j+1, columnArray[i].length)])
          + (columnArray[i][mod(j-1, columnArray[i].length)] + columnArray[i][mod(j+1, columnArray[i].length)])
          + (columnArray[mod(i+1, columnArray.length)][mod(j-1, columnArray[i].length)] + columnArray[mod(i+1, columnArray.length)][j] + columnArray[mod(i+1, columnArray.length)][mod(j+1, columnArray[i].length)])) {
            case 3:
              // Alive
              changedArray.push([i, j]);
          }
        } else
        if (columnArray[i][j] == 1) {
          switch ((columnArray[mod(i-1, columnArray.length)][mod(j-1, columnArray[i].length)] + columnArray[mod(i-1, columnArray.length)][j] + columnArray[mod(i-1, columnArray.length)][mod(j+1, columnArray[i].length)])
          + (columnArray[i][mod(j-1, columnArray[i].length)] + columnArray[i][mod(j+1, columnArray[i].length)])
          + (columnArray[mod(i+1, columnArray.length)][mod(j-1, columnArray[i].length)] + columnArray[mod(i+1, columnArray.length)][j] + columnArray[mod(i+1, columnArray.length)][mod(j+1, columnArray[i].length)])) {
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
    reDrawSpill();
    spilleSpill();
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
              switch (columnArray[i][j+1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j+1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
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
              switch (columnArray[i][j-1] + columnArray[i+1][j] + columnArray[i+1][j-1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j-1] + columnArray[i+1][j] + columnArray[i+1][j-1]) {
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
              switch (columnArray[i][j-1] + columnArray[i][j+1] + columnArray[i+1][j-1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j-1] + columnArray[i][j+1] + columnArray[i+1][j-1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
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
              switch (columnArray[i][j+1] + columnArray[i-1][j] + columnArray[i-1][j+1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j+1] + columnArray[i-1][j] + columnArray[i-1][j+1]) {
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
              switch (columnArray[i][j-1] + columnArray[i-1][j] + columnArray[i-1][j-1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j-1] + columnArray[i-1][j] + columnArray[i-1][j-1]) {
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
              switch (columnArray[i][j-1] + columnArray[i][j+1] + columnArray[i-1][j-1] + columnArray[i-1][j] + columnArray[i-1][j+1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i][j-1] + columnArray[i][j+1] + columnArray[i-1][j-1] + columnArray[i-1][j] + columnArray[i-1][j+1]) {
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
              switch (columnArray[i-1][j] + columnArray[i-1][j+1] + columnArray[i][j+1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i-1][j] + columnArray[i-1][j+1] + columnArray[i][j+1] + columnArray[i+1][j] + columnArray[i+1][j+1]) {
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
              switch (columnArray[i-1][j] + columnArray[i-1][j-1] + columnArray[i][j-1] + columnArray[i+1][j] + columnArray[i+1][j-1]) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch (columnArray[i-1][j] + columnArray[i-1][j-1] + columnArray[i][j-1] + columnArray[i+1][j] + columnArray[i+1][j-1]) {
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
              switch ((columnArray[i-1][j-1] + columnArray[i-1][j] + columnArray[i-1][j+1]) + (columnArray[i][j-1] + columnArray[i][j+1]) + (columnArray[i+1][j-1] + columnArray[i+1][j] + columnArray[i+1][j+1])) {
                case 3:
                  // Alive
                  changedArray.push([i, j]);
              }
            } else if (columnArray[i][j] == 1) {
              switch ((columnArray[i-1][j-1] + columnArray[i-1][j] + columnArray[i-1][j+1]) + (columnArray[i][j-1] + columnArray[i][j+1]) + (columnArray[i+1][j-1] + columnArray[i+1][j] + columnArray[i+1][j+1])) {
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
    reDrawSpill();
    spilleSpill();
  }
}
