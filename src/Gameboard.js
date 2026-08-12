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
        const coordinates = this.getShipCoordinates(length, [x, y], orientation);

        if (!this.isValidPlacement(coordinates)) {
            return null;
        }

        const ship = new Ship(length);

        for (const [cx, cy] of coordinates) {
            this.board[cx][cy].ship = ship;
        }

        this.ships.push(ship);
        return ship;       
    }

    receiveAttack([x,y]) {
        const cell = this.board[x][y];

        if(cell.hit) {
            return null;
        }

        cell.hit = true;

        if(cell.ship !== null) {
            cell.ship.hit();
            return true;
        } else {
            
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

    getShipCoordinates(length, [x, y], orientation) {
        const coordinates = [];

        for (let i = 0; i < length; i++) {
            if (orientation === "horizontal") {
                coordinates.push([x, y + i]);
            } else {
                coordinates.push([x + i, y]);
            }
        }

        return coordinates;
    }

    isValidPlacement(coordinates) {
        return coordinates.every(([cx, cy]) => {
            const onBoard = cx >= 0 && cx < 10 && cy >= 0 && cy < 10;
            if (!onBoard) return false;

            return this.board[cx][cy].ship === null;
        });
    }

}

export default Gameboard;