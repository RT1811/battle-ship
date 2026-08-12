import "./styles.css";
import Player from "./Player.js";
import { initGame } from "./game.js";
import { setupDragAndDrop, renderSetupBoard } from "./dragDrop.js";
import { showPassScreen } from "./passScreen.js";

let gameMode = null;
const human1 = new Player("human");
let player2;

document.querySelector('#vs-computer-btn').addEventListener('click', () => {
    gameMode = 'pvc';
    player2 = new Player("computer");
    player2.gameboard.placeShip(2, [0, 0], "horizontal");
    player2.gameboard.placeShip(3, [2, 2], "horizontal");
    player2.gameboard.placeShip(3, [4, 4], "vertical");
    player2.gameboard.placeShip(4, [6, 0], "horizontal");
    player2.gameboard.placeShip(5, [0, 5], "vertical");

    startSetupPhase(human1, undefined, player2);
});

document.querySelector('#vs-human-btn').addEventListener('click', () => {
    gameMode = 'pvp';
    player2 = new Player("human");
    startSetupPhase(human1, player2);
});

function startSetupPhase(player1, humanPlayer2, computerPlayer) {
    document.querySelector('#mode-select').classList.add('hidden');
    document.querySelector('#setup-phase').classList.remove('hidden');

    const startBtn = document.querySelector('#start-game-btn');

    if (humanPlayer2 === undefined) {
        runSetupFor(player1, () => {
            startBtn.disabled = false;
        });

        startBtn.addEventListener('click', () => {
            document.querySelector('#setup-phase').classList.add('hidden');
            document.querySelector('#game-phase').classList.remove('hidden');
            initGame('pvc', [player1, computerPlayer]);
        }, { once: true });

    } else {
        runSetupFor(player1, () => {
            startBtn.disabled = false;
        });

        startBtn.addEventListener('click', () => {
            startBtn.disabled = true;
            showPassScreen(`Pass to Player 2, then click Ready to place their ships`, () => {
                resetSetupBoard();
                runSetupFor(humanPlayer2, () => {
                    startBtn.disabled = false;
                });

                startBtn.addEventListener('click', () => {
                    document.querySelector('#setup-phase').classList.add('hidden');
                    document.querySelector('#game-phase').classList.remove('hidden');
                    initGame('pvp', [player1, humanPlayer2]);
                }, { once: true });
            });
        }, { once: true });
    }
}

function runSetupFor(player, onAllShipsPlaced) {
    resetShipTray();
    renderSetupBoard(player.gameboard);
    setupDragAndDrop(player, onAllShipsPlaced);
}

function resetShipTray() {
    const shipTray = document.querySelector('#ship-tray');
    shipTray.innerHTML = '';

    const lengths = [2, 3, 3, 4, 5];
    lengths.forEach((length) => {
        const tile = document.createElement('div');
        tile.classList.add('draggable-ship');
        tile.draggable = true;
        tile.dataset.length = length;
        tile.textContent = `Ship (${length})`;
        shipTray.appendChild(tile);
    });
}

function resetSetupBoard() {
    document.querySelector('#setup-board').innerHTML = '';
}