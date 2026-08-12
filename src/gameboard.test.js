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

test('placeShip rejects placement that goes off the board (horizontal)', () => {
  const gameboard = new Gameboard();
  const result = gameboard.placeShip(3, [0, 8], "horizontal"); // would need cols 8,9,10 - 10 is out of bounds
  expect(result).toBeNull();
});

test('placeShip rejects placement that goes off the board (vertical)', () => {
  const gameboard = new Gameboard();
  const result = gameboard.placeShip(3, [8, 0], "vertical");
  expect(result).toBeNull();
});

test('placeShip rejects overlapping an existing ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, [0, 0], "horizontal"); // occupies [0,0], [0,1], [0,2]
  const result = gameboard.placeShip(2, [0, 1], "vertical"); // would also touch [0,1]
  expect(result).toBeNull();
});

test('placeShip still succeeds for a valid placement', () => {
  const gameboard = new Gameboard();
  const ship = gameboard.placeShip(3, [0, 0], "horizontal");
  expect(ship).not.toBeNull();
  expect(gameboard.board[0][0].ship).toBe(ship);
});