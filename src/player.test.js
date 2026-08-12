import Player from "./Player.js";
import Gameboard from "./Gameboard.js";

test('player has a gameboard', () => {
  const player = new Player("human");
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('player type is stored correctly', () => {
  const human = new Player("human");
  const computer = new Player("computer");
  expect(human.type).toBe("human");
  expect(computer.type).toBe("computer");
});

test('computer makes a legal attack on the enemy board', () => {
  const computer = new Player("computer");
  const enemy = new Player("human");

  const result = computer.randomAttack(enemy.gameboard);
  expect(typeof result).toBe("boolean");
});

test('computer never attacks the same cell twice', () => {
  const computer = new Player("computer");
  const enemy = new Player("human");

  for (let i = 0; i < 20; i++) {
    computer.randomAttack(enemy.gameboard);
  }

  let attackedCells = 0;

  for (const row of enemy.gameboard.board) {
    for (const cell of row) {
      if (cell.hit) attackedCells++;
    }
  }

  expect(attackedCells).toBe(20);
});