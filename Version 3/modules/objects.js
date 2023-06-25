const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

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
};

// Object for cell size and colors
const cell = new Cell(8, 7, "#0000FF", "#D3D3D3");

// The object for storing data about the canvas
const canvasObject = {
    board: "",
    content: "",

    get getBoard() {
        return this.board;
    },

    /**
     * @param {HTMLElement | null} board
     */
    set setBoard(board) {
        this.board = board;
    },

    get getContent() {
        return this.content;
    },

    /**
     * @param {any} content
     */
    set setContent(content) {
        this.content = content;
    }
};

// The arrays for the entire level and for the redraws
const arrayObjects = {
    rowArray: [],
    changedArray: [],

    // RowArray
    get getRowArray() {
        return this.rowArray;
    },

    /**
     * @param {never[]} rowArray
     */
    set setRowArray(rowArray) {
        this.rowArray = rowArray;
    },

    // ChangedArray
    get getChangedArray() {
        return this.changedArray;
    },

    /**
     * @param {never[]} changedArray
     */
    set setChangedArray(changedArray) {
        this.changedArray = changedArray;
    }
};

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
};

// Sets the type of level, type of game, if the board is drawable, if the game has started, and if the game is stabilized
const typeObjects = {
    typeLevel: 1,
    typeGame: 1,
    drawable: false,
    started: false,
    equalOnce: false,

    // TypeLevel
    // TypeLevel: 1 means pre-populated game, TypeLevel: 2 means drawing on the board 
    get getTypeLevel() {
        return this.typeLevel;
    },

    /**
     * @param {number} typeLevel
     */
    set setTypeLevel(typeLevel) {
        this.typeLevel = typeLevel;
    },

    // TypeGame
    // TypeGame: 1 means boxed game with set borders, TypeGame: 2 means game with looping borders
    get getTypeGame() {
        return this.typeGame;
    },

    /**
     * @param {number} typeGame
     */
    set setTypeGame(typeGame) {
        this.typeGame = typeGame;
    },

    // Drawable
    get getDrawable() {
        return this.drawable
    },

    /**
     * @param {boolean} drawable
     */
    set setDrawable(drawable) {
        this.drawable = drawable;
    },

    // Started
    get getStarted() {
        return this.started;
    },

    /**
     * @param {boolean} started
     */
    set setStarted(started) {
        this.started = started;
    },

    // Equal Once
    get getEqualOnce() {
        return this.equalOnce;
    },

    /**
     * @param {boolean} equalOnce
     */
    set setEqualOnce(equalOnce) {
        this.equalOnce = equalOnce;
    }
};

// Generations the cells have lived
const generationsObject = {
    generations: 0,
    generationsArray: [],

    get getGenerations() {
        return this.generations;
    },

    /**
     * @param {number} generations
     */
    set setGenerations(generations) {
        this.generations = generations;
    },

    get getGenerationsArray() {
        return this.generationsArray;
    },

    /**
     * @param {never[]} generationsArray
     */
    set setGenerationsArray(generationsArray) {
        this.generationsArray = generationsArray;
    },

    increaseGenerations() {
        this.generations++;
    }
};

// Alive count for the cells
const aliveCountObject = {
    aliveCount: 0,
    aliveArray: [],

    get getAliveCount() {
        return this.aliveCount;
    },

    /**
     * @param {number} aliveCount
     */
    set setAliveCount(aliveCount) {
        this.aliveCount = aliveCount;
    },

    get getAliveArray() {
        return this.aliveArray;
    },

    /**
     * @param {never[]} aliveArray
     */
    set setAliveArray(aliveArray) {
        this.aliveArray = aliveArray;
    },

    // Counts all the alive cells in the array, and returns the number
    countAlives(array) {
        this.aliveCount = 0;
        array.forEach(element => {
            element.forEach(index => {
                if (index === 1) {
                    this.aliveCount += 1;
                }
            });
        });

        return this.aliveCount;
    },

    // Creates an array of the alive count of cells of the previous generations
    createArray(aliveCount) {
        if (this.aliveArray.length < 20) {
            this.aliveArray.push(aliveCount);
        } else {
            this.aliveArray.shift();
            this.aliveArray.push(aliveCount);
        }

        return this.aliveArray;
    }
};

export { Cell, cell, canvasObject, arrayObjects, speedObject, typeObjects, generationsObject, aliveCountObject };