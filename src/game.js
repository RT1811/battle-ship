import { renderBoard } from "./render.js";
import { showPassScreen } from "./passScreen.js";

function initGame(mode, players) {
    let turnIndex = 0;

    const enemyBoardEl = document.querySelector('#enemy-board');
    const statusEl = document.querySelector('#status');

    function updateStatus(message) {
        statusEl.textContent = message;
    }

    function attacker() { return players[turnIndex]; }
    function defender() { return players[1 - turnIndex]; }

    function renderCurrentTurn() {
        renderBoard(attacker().gameboard, 'player-board', false);
        renderBoard(defender().gameboard, 'enemy-board', true);
        updateStatus(`${attacker().type === 'human' ? "Your" : "Computer's"} turn`);
    }

    function handleAttack(x, y) {
        const result = defender().gameboard.receiveAttack([x, y]);

        if (result === null) return;

        renderBoard(defender().gameboard, 'enemy-board', true);

        if (defender().gameboard.allShipsSunk()) {
            updateStatus(
                `${attacker().type === 'human' ? 'You win' : 'Computer wins'}!`
            );
            return;
        }

        turnIndex = 1 - turnIndex;

        if (attacker().type === 'computer') {
            attacker().randomAttack(defender().gameboard);

            if (defender().gameboard.allShipsSunk()) {
                renderBoard(defender().gameboard, 'player-board', false);
                updateStatus('Computer wins!');
                return;
            }

            // Switch back to the human after computer attacks
            turnIndex = 1 - turnIndex;

            renderCurrentTurn();
        } else if (mode === 'pvp') {
            showPassScreen(
                'Pass to the other player, then click Ready',
                renderCurrentTurn
            );
        } else {
            renderCurrentTurn();
        }
    }

    enemyBoardEl.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;
        handleAttack(Number(cell.dataset.x), Number(cell.dataset.y));
    });

    renderCurrentTurn();
}

export { initGame };