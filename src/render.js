function renderBoard(gameboard, containerId, hideShips) {
    const container = document.querySelector(`#${containerId}`);
    container.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
        const cell = gameboard.board[x][y];
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;

        if (cell.hit) {
            cellDiv.classList.add(cell.ship ? 'hit' : 'miss');
        } else if (cell.ship && !hideShips) {
            cellDiv.classList.add('ship');
        }

        container.appendChild(cellDiv);
        }
    }
}

export { renderBoard };