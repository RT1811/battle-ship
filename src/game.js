import { renderBoard } from "./render.js";

function initGame(human, computer) {
    const enemyBoardEl = document.querySelector('#enemy-board');
    const statusEl = document.querySelector('#status');

    function updateStatus(message) {
        statusEl.textContent = message;
    }

    function handlePlayerAttack(x, y) {
        const result = computer.gameboard.receiveAttack([x, y]);

        if (result === null) {
            return; // already attacked this cell
        }

        renderBoard(computer.gameboard, 'enemy-board', true);

        if (computer.gameboard.allShipsSunk()) {
            updateStatus("You win!");
            return;
        }

        updateStatus("Computer's turn...");
        computerTurn();
    }

    function computerTurn() {
        computer.randomAttack(human.gameboard);
        renderBoard(human.gameboard, 'player-board', false);

        if (human.gameboard.allShipsSunk()) {
            updateStatus("Computer wins!");
            return;
        }

        updateStatus("Your turn - attack the enemy board");
    }

    enemyBoardEl.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;
        handlePlayerAttack(Number(cell.dataset.x), Number(cell.dataset.y));
    });

    updateStatus("Your turn - attack the enemy board");

}

export { initGame } ;