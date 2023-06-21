# Conway's Game of Life
This is an implementation of Conway's Game of Life written in JavaScript.

The game board is a 2D grid where each cell can be in two states, alive or dead. Each round, every cell interacts with its eight neighbours (cells that are horizontally, vertically, or diagonally adjacent) according to the following rules:

A live cell with fewer than two live neighbours dies, as if by underpopulation.
A live cell with two or three live neighbours lives on to the next generation.
A live cell with more than three live neighbours dies, as if by overpopulation.
A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
Game Variables
gameBoard: The main game board on which the cells are drawn.
stepsSlider and intervalSlider: These are sliders that control the number of steps and the interval time between each step respectively.
stepsValueLabel and intervalValueLabel: These labels show the current value of the steps and interval sliders.
board: A 2D array representing the current state of the game board.
Controls
Left-click on a cell: Toggles the state of the cell (alive or dead).
Drag with left-click held down: Set cells to alive.
stepsSlider: Controls how many steps will be taken.
intervalSlider: Controls the interval time in milliseconds between each step.
Functions
setGame(): Initializes the game board with all cells as dead.
updateCell(id, life): Updates a cell's state according to its ID and the provided boolean value for life.
createNextBoard(): Initializes a new board for the next step.
updateBoard(): Updates the game board according to the board 2D array.
countNeighbors(i, j): Returns the number of alive neighbours of a cell at position (i, j).
nextStep(): Performs one step in the simulation.
clearBoard(): Stops the simulation and clears the board.
addShape(shape): Adds a predefined shape to the game board.
Predefined Shapes
The script also includes predefined patterns that can be added to the game board:

Glider
Light-weight spaceship (lwss)
Tumbler
Pentadecathlon
Queen Bee Shuttle
Figure Eight
Glider Gun
Two Prehasslers
How to use
To use, simply load the script in a browser. Use the sliders to adjust the number of steps and the time interval between each step. Left click on a cell to toggle its state. You can add one of the predefined shapes by calling addShape(shapeName) in the browser console, where shapeName is the name of the predefined shape (glider, lwss, tumbler, etc.).
