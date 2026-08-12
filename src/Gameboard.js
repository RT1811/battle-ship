import Ship from "./Ship.js"

class Gameboard {
    constructor() {
        this.board = this.createEmptyBoard();
        this.ships = [];
        this.missedAttacks = [];
    }

    createEmptyBoard() {
        const board = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push({ ship: null, hit: false });
            }
            board.push(row);
        }
        return board;
    }

    placeShip(length, [x,y], orientation) {
        const ship = new Ship(length);
        if (orientation == "horizontal") {
            for(let i = y; i < y + length; i++) {
                this.board[x][i].ship = ship;
            }

        } else {
            for(let i = x; i < x + length; i++) {
                this.board[i][y].ship = ship;
            }
        }

        this.ships.push(ship);
        return ship;        
    }

    receiveAttack([x,y]) {
        const cell = this.board[x][y];
        if(cell.ship !== null) {
            cell.ship.hit();
            cell.hit = true;
            return true;
        } else {
            cell.hit = true;
            this.missedAttacks.push([x,y]);
            return false;
        }
    }

    allShipsSunk() {
        return this.ships.length > 0 && this.ships.every((ship) => ship.isSunk());
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }

}

export default Gameboard;