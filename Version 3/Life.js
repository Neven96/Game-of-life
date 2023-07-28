import { myHeaders } from "./modules/header.js";
import { canvasObject, typeObjects } from "./modules/objects.js";
import { selectSpeed } from "./modules/selectSpeed.js";
import { paintLevel, stopPainting } from "./modules/paintLevel.js";
import { prepareGame } from "./modules/prepareGame.js";
import { startGame } from "./modules/startGame.js";
import { prepareBoard } from "./modules/prepareBoard.js";
import { pauseObject } from "./modules/pauseGame.js";

document.addEventListener("DOMContentLoaded", domLoaded, false);
function domLoaded() {
	// Gets the canvas and its context
	const board = canvasObject.setBoard = document.getElementById("board");

	canvasObject.setContent = board.getContext("2d");

	// Used to show the speed name at the start
	selectSpeed();
	// Sets the board to show the cells at start
	prepareBoard();

	// Buttons and their actions
	// Readies a pre-populated game board
	document.getElementById("populateKnapp").onclick = function() {
		typeObjects.setTypeGame = 1;
		prepareGame();
	};

	// Readies the board for drawing 
	document.getElementById("drawKnapp").onclick = function() {
		typeObjects.setTypeGame = 2;

		// Eventlisteners for painting on the board
		board.addEventListener("mousedown", paintEvent);
		board.addEventListener("mousemove", paintEvent);

		// Eventlistener for stopping painting on the board
		// Is called on the entire page for better handling
		document.addEventListener("mouseup", stopPaintEvent);

		prepareGame();
	};

	// The functions which the mousedown and mousemove events calls
	function paintEvent(event) {
		paintLevel(board, event);
	}

	// The function which the mouseup event calls
	function stopPaintEvent(event) {
		stopPainting(event);
	}

	// Starts a game confined to the size of the board
	document.getElementById("playBoxedKnapp").addEventListener("click", function () {
		startClickEvent(1);
	});

	// Starts a game where the borders loop around
	document.getElementById("playInfinityKnapp").addEventListener("click", function () {
		startClickEvent(2);
	});

	// Function to be called when either start button is clicked
	function startClickEvent(typeLevel) {
		typeObjects.setTypeLevel = typeLevel;

		// Removes the eventlisteners for drawing when the game is started
		board.removeEventListener("mousedown", paintEvent);
		board.removeEventListener("mousemove", paintEvent);
		document.removeEventListener("mouseup", stopPaintEvent);

		startGame();
	}

	// Pauses/unpauses the game
	document.getElementById("pauseKnapp").onclick = function () { 
		pauseObject.pauseGame();
	};

	// Gets the game speed form user input
	document.getElementById("speed").onchange = function () { 
		selectSpeed();
	};
	
	// Allows to right-clicking the board without the menu popping up
	board.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
}