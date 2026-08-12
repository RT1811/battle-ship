import "./styles.css";
import Player from "./Player.js";
import { renderBoard } from "./render.js";
import { initGame } from "./game.js";

const human = new Player("human");
const computer = new Player("computer");

// temporary manual placement for now - real placement UI comes later
human.gameboard.placeShip(3, [0, 0], "horizontal");
human.gameboard.placeShip(4, [2, 2], "vertical");
computer.gameboard.placeShip(3, [1, 1], "horizontal");
computer.gameboard.placeShip(4, [5, 5], "vertical");

renderBoard(human.gameboard, 'player-board', false);
renderBoard(computer.gameboard, 'enemy-board', true);

initGame(human, computer);