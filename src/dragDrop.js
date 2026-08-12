function setupDragAndDrop(player, onAllShipsPlaced) {
    const shipTray = document.querySelector('#ship-tray');
    const setupBoard = document.querySelector('#setup-board');
    const rotateBtn = document.querySelector('#rotate-btn');

    let orientation = 'horizontal';
    let draggedLength = null;
    let draggedElement = null;
    let shipsPlaced = 0;

    const totalShips = 5;

    function handleRotate() {
        orientation =
            orientation === 'horizontal'
                ? 'vertical'
                : 'horizontal';

        rotateBtn.textContent =
            `Rotate: ${orientation === 'horizontal'
                ? 'Horizontal'
                : 'Vertical'}`;
    }

    function handleDragStart(e) {
        if (!e.target.classList.contains('draggable-ship')) return;

        draggedLength = Number(e.target.dataset.length);
        draggedElement = e.target;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();

        const cell = e.target.closest('.cell');

        if (!cell || draggedLength === null) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        const ship = player.gameboard.placeShip(
            draggedLength,
            [x, y],
            orientation
        );

        if (ship !== null) {
            draggedElement.remove();
            shipsPlaced++;

            renderSetupBoard(player.gameboard);

            if (shipsPlaced === totalShips) {
                onAllShipsPlaced();
            }
        }

        draggedLength = null;
        draggedElement = null;
    }

    rotateBtn.addEventListener('click', handleRotate);
    shipTray.addEventListener('dragstart', handleDragStart);
    setupBoard.addEventListener('dragover', handleDragOver);
    setupBoard.addEventListener('drop', handleDrop);

    return function cleanup() {
        rotateBtn.removeEventListener('click', handleRotate);
        shipTray.removeEventListener('dragstart', handleDragStart);
        setupBoard.removeEventListener('dragover', handleDragOver);
        setupBoard.removeEventListener('drop', handleDrop);
    };
}

function renderSetupBoard(gameboard) {
    const container = document.querySelector('#setup-board');
    container.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
        const cell = gameboard.board[x][y];
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;
        if (cell.ship) cellDiv.classList.add('ship');
        container.appendChild(cellDiv);
        }
    }
}

export { setupDragAndDrop, renderSetupBoard };