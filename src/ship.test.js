import Ship from "./Ship.js";

test('ship has correct length', () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test('ship starts with 0 hits', () => {
  const ship = new Ship(3);
  expect(ship.hits).toBe(0);
});

test('hit() increases hits by 1', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('isSunk() is false when hits < length', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('isSunk() is true when hits === length', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});