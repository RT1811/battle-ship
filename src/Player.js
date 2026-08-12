import Gameboard from "./Gameboard.js";

class Player {
    constructor(playerType) {
        this.type = playerType;
        this.gameboard = new Gameboard();
    }

    randomAttack(enemyBoard) {
        let x;
        let y;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (enemyBoard.board[x][y].hit);

        return enemyBoard.receiveAttack([x,y]);
    }
}

export default Player;