const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const gameModeSelect = document.getElementById('game-mode');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'human';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWin();
    checkForDraw();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameActive && gameMode === 'ai' && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function checkForWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            statusDisplay.textContent = `Player ${gameState[a]} wins!`;
            return;
        }
    }
}

function checkForDraw() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
    }
}

function makeAIMove() {
    const emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];
        gameState[aiMove] = currentPlayer;
        cells[aiMove].textContent = currentPlayer;

        checkForWin();
        checkForDraw();

        currentPlayer = 'X';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');

    if (gameMode === 'ai' && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function handleGameModeChange() {
    gameMode = gameModeSelect.value;
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
gameModeSelect.addEventListener('change', handleGameModeChange);
