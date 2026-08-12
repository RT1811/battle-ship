import "./styles.css";
import Player from "./Player.js";
import { renderBoard } from "./render.js";
import { initGame } from "./game.js";
import { setupDragAndDrop, renderSetupBoard } from "./dragDrop.js";

const human = new Player("human");
const computer = new Player("computer");

computer.gameboard.placeShip(2, [0, 0], "horizontal");
computer.gameboard.placeShip(3, [2, 2], "horizontal");
computer.gameboard.placeShip(3, [4, 4], "vertical");
computer.gameboard.placeShip(4, [6, 0], "horizontal");
computer.gameboard.placeShip(5, [0, 5], "vertical");

renderSetupBoard(human.gameboard);

setupDragAndDrop(human, () => {
  document.querySelector('#start-game-btn').disabled = false;
});

document.querySelector('#start-game-btn').addEventListener('click', () => {
  document.querySelector('#setup-phase').classList.add('hidden');
  document.querySelector('#game-phase').classList.remove('hidden');

  renderBoard(human.gameboard, 'player-board', false);
  renderBoard(computer.gameboard, 'enemy-board', true);
  initGame(human, computer);
});