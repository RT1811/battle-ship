# Battleship

A browser-based implementation of the classic **Battleship** game built with vanilla JavaScript.

The project focuses on object-oriented design, test-driven development, DOM manipulation, modular JavaScript, and separating game logic from the user interface.

Built as part of **The Odin Project JavaScript curriculum**.

## Features

* Player vs Computer mode
* Local Player vs Player mode
* Interactive 10×10 gameboards
* Drag-and-drop ship placement
* Horizontal and vertical ship rotation
* Prevention of overlapping ships
* Prevention of ships being placed outside the board
* Randomized computer attacks
* Computer avoids attacking the same position twice
* Hit and miss tracking
* Ship health and sinking detection
* Automatic win detection
* Pass screen for local multiplayer
* Responsive naval-themed interface
* Unit tests for core game logic

## Built With

* JavaScript
* HTML
* CSS
* Webpack
* Jest
* Babel

## Project Structure

```text
src/
├── Gameboard.js
├── Player.js
├── Ship.js
├── dragDrop.js
├── game.js
├── index.js
├── passScreen.js
├── render.js
├── styles.css
├── template.html
├── gameboard.test.js
├── player.test.js
└── ship.test.js
```

### `Ship`

Represents an individual ship.

Ships keep track of:

* Their length
* Number of hits received
* Whether they have been sunk

### `Gameboard`

Responsible for:

* Maintaining the 10×10 board
* Placing ships
* Preventing invalid ship placement
* Receiving attacks
* Recording hits and misses
* Preventing duplicate attacks
* Determining when all ships have been sunk

### `Player`

Represents either a human or computer player.

Each player owns their own `Gameboard`.

Computer players can generate random legal attacks against an opponent's board.

### Rendering and Game Logic

Game state and DOM rendering are kept separate where possible.

The rendering modules handle displaying boards and updating the interface, while the game modules control turns, attacks, setup, and win conditions.

## Installation

Clone the repository:

```bash
git clone git@github.com:RT1811/battle-ship.git
```

Enter the project:

```bash
cd battle-ship
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Testing

Run the Jest test suite with:

```bash
npm test
```

The tests cover core functionality including:

* Ship creation
* Ship damage
* Ship sinking
* Ship placement
* Invalid placement
* Overlapping ships
* Hit and miss handling
* Duplicate attacks
* Game-over detection
* Player creation
* Computer attacks

## Building

Create a production build with:

```bash
npm run build
```

## What I Learned

This project gave me practice with:

* Test-driven development
* Object-oriented JavaScript
* ES modules
* Separating application logic from DOM logic
* Managing game state
* Event-driven programming
* Drag-and-drop interactions
* Working with multidimensional arrays
* Designing interactions between multiple classes
* Handling edge cases and invalid game states
* Bundling applications with Webpack

One of the main challenges was keeping the game logic independent from the interface. Classes such as `Ship`, `Gameboard`, and `Player` handle the underlying state while separate modules are responsible for rendering and browser interaction.

## Future Improvements

Possible additions include:

* Smarter computer targeting after successfully hitting a ship
* Random computer ship placement
* Improved ship-placement previews
* Sound effects
* Additional animations
* Restart/rematch functionality
* Improved mobile controls

## Author

**Ritwick Thakur**

GitHub: `RT1811`
