import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

test('places a ship at given coordinates', () => {
  const gameboard = new Gameboard();
  const ship = gameboard.placeShip(3, [0, 0], "horizontal");
  
  expect(gameboard.board[0][0].ship).toBe(ship);
  expect(gameboard.board[0][1].ship).toBe(ship);
  expect(gameboard.board[0][2].ship).toBe(ship);
});

test('receiveAttack records a hit on a ship', () => {
  const gameboard = new Gameboard();
  const ship = gameboard.placeShip(3, [0, 0], "horizontal");
  
  gameboard.receiveAttack([0, 1]);
  expect(ship.hits).toBe(1);
});

test('receiveAttack records a missed shot', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([5, 5]);
  expect(gameboard.missedAttacks).toContainEqual([5, 5]);
});

test('allShipsSunk returns false when ships remain', () => {
  const gameboard = new Gameboard();
  const ship = gameboard.placeShip(1, [0, 0], "horizontal");
  
  expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk returns true once every ship is sunk', () => {
  const gameboard = new Gameboard();
  const ship = gameboard.placeShip(1, [0, 0], "horizontal");
  
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.allShipsSunk()).toBe(true);
});