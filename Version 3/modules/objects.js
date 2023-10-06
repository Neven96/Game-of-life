import { myHeaders } from "../helpers/header.js";

// OBJECTS
// Object for cell size and colors
const cell = {
    rectSize: 8,
    cellSize: 7,
    cellColor: "#2C3E4C",
    backgroundColor: "#FFFFFF",

    /**
     * @param {int} rectSize
     */
    set setRectSize(rectSize) {this.rectSize = rectSize;},

    get getRectSize() {return this.rectSize;},

    /**
     * @param {int} cellSize
     */
    set setCellSize(cellSize) {this.cellSize = cellSize;},

    get getCellSize() {return this.cellSize;},

    /**
     * @param {string} cellColor
     */
    set setCellColor(cellColor) {this.cellColor = cellColor;},

    get getCellColor() {return this.cellColor;},

    /**
     * @param {string} backgroundColor
     */
    set setBackgroundColor(backgroundColor) {this.backgroundColor = backgroundColor;},

    get getBackgroundColor() {return this.backgroundColor;}
};

// The object for storing data about the canvas
const canvasObject = {
    board: "",
    content: "",

    /**
     * @param {HTMLElement | null} board
     */
    set setBoard(board) {this.board = board;},

    get getBoard() {return this.board;},

    /**
     * @param {any} content
     */
    set setContent(content) {this.content = content;},

    get getContent() {return this.content;}
};

// The arrays for the entire level and for the redraws
const arrayObjects = {
    rowArray: [],
    changedArray: [],

    // RowArray
    /**
     * @param {any[]} rowArray
     */
    set setRowArray(rowArray) {this.rowArray = rowArray;},
    
    get getRowArray() {return this.rowArray;},

    // ChangedArray
    /**
     * @param {any[]} changedArray
     */
    set setChangedArray(changedArray) {this.changedArray = changedArray;},

    get getChangedArray() {return this.changedArray;}
};

// Sets the speed, so that we don't have to use the switch statement each round
const speedObject = {
    speed: 500,

    /**
     * @param {number} speed
     */
    set setSpeed(speed) {this.speed = speed;},

    get getSpeed() {return this.speed;},
};

// Sets the type of level, type of game, if the board is drawable, if the game has started, and if the game is stabilized
const typeObjects = {
    typeLevel: 1,
    typeGame: 1,
    drawable: false,
    started: false,
    equalOnce: false,

    // TypeLevel
    // TypeLevel: 1 means pre-populated game
    // TypeLevel: 2 means drawing on the board 
    /**
     * @param {number} typeLevel
     */
    set setTypeLevel(typeLevel) {this.typeLevel = typeLevel;},

    get getTypeLevel() {return this.typeLevel;},

    // TypeGame
    // TypeGame: 1 means boxed game with set borders
    // TypeGame: 2 means game with looping borders
    /**
     * @param {number} typeGame
     */
    set setTypeGame(typeGame) {this.typeGame = typeGame;},

    get getTypeGame() {return this.typeGame;},

    // Drawable
    /**
     * @param {boolean} drawable
     */
    set setDrawable(drawable) {this.drawable = drawable;},

    get getDrawable() {return this.drawable},

    // Started
    /**
     * @param {boolean} started
     */
    set setStarted(started) {this.started = started;},

    get getStarted() {return this.started;},

    // Equal Once
    /**
     * @param {boolean} equalOnce
     */
    set setEqualOnce(equalOnce) {this.equalOnce = equalOnce;},

    get getEqualOnce() {return this.equalOnce;}
};

// Generations the cells have lived
const generationsObject = {
    generations: 0,
    generationsArray: [],

    /**
     * @param {number} generations
     */
    set setGenerations(generations) {this.generations = generations;},

    get getGenerations() {return this.generations;},

    /**
     * @param {any[]} generationsArray
     */
    set setGenerationsArray(generationsArray) {this.generationsArray = generationsArray;},

    get getGenerationsArray() {return this.generationsArray;},

    increaseGenerations() {
        this.generations++;
    }
};

// Alive count for the cells
const aliveCountObject = {
    aliveCount: 0,
    aliveArray: [],

    /**
     * @param {number} aliveCount
     */
    set setAliveCount(aliveCount) {this.aliveCount = aliveCount;},

    get getAliveCount() {return this.aliveCount;},

    /**
     * @param {any[]} aliveArray
     */
    set setAliveArray(aliveArray) {this.aliveArray = aliveArray;},

    get getAliveArray() {return this.aliveArray;},

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
    addToAliveArray(aliveCount) {
        if (this.aliveArray.length < 20) {
            this.aliveArray.unshift(aliveCount);
        } else {
            this.aliveArray.pop();
            this.aliveArray.unshift(aliveCount);
        }

        return this.aliveArray;
    }
};

// Values for making painting and unpainting multiple cells possible
const paintObject = {
    addPaint: false,
    locked: false,

    /**
     * @param {boolean} addPaint
     */
    set setAddPaint(addPaint) {this.addPaint = addPaint;},

    get getAddPaint() {return this.addPaint;},

    /**
     * @param {boolean} locked
     */
    set setLocked(locked) {this.locked = locked;},

    get getLocked() {return this.locked;}
};

export { cell, canvasObject, arrayObjects, speedObject, typeObjects, generationsObject, aliveCountObject, paintObject };