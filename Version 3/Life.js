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
	canvasObject.setBoard = document.getElementById("board");
	const board = canvasObject.getBoard;

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
		prepareGame();
	};

	// Starts a game confied to the size of the board
	document.getElementById("playBoxedKnapp").onclick = function () { 
		typeObjects.setTypeLevel = 1;
		startGame();
	};

	// Starts a game where the borders loop around
	document.getElementById("playInfinityKnapp").onclick = function () { 
		typeObjects.setTypeLevel = 2;
		startGame();
	};

	// Pauses the game
	document.getElementById("pauseKnapp").onclick = function () { 
		pauseObject.pauseGame();
	};

	// Gets the game speed form user input
	document.getElementById("speed").onchange = function () { 
		selectSpeed();
	};

	if (!typeObjects.getStarted) {
		// Eventlisteners for painting on the board
		board.addEventListener("mousedown", function (event) {
		paintLevel(board, event)
		});
		board.addEventListener("mousemove", function (event) {
		paintLevel(board, event)
		});
		// Eventlisteners for stopping painting on the board
		board.addEventListener("mouseup", function (event) {
		stopPainting(event)
		});
		board.addEventListener("mouseleave", function (event) {
		stopPainting(event)
		});
	}
	
	// Allows to right-clicking the board without the meny popping up
	board.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
}