const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

// Create board
function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.addEventListener("click", handleCellClick);
        div.textContent = cell;
        board.appendChild(div);
    });
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || !gameActive) return;

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (cells.every(cell => cell)) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

// Reset game
resetButton.addEventListener("click", () => {
    cells.fill(null);
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    createBoard();
});

// Initialize game
createBoard();
statusText.textContent = "Player X's Turn";
