// =========================
// LOCALSTORAGE DEMO (PART A)
// =========================

console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");
console.log("=== LOCALSTORAGE DEMONSTRATIONS ===");

// Check support
if (typeof(Storage) !== "undefined") {
    console.log("✓ localStorage is supported and available");
} else {
    console.log("✗ localStorage NOT supported");
}

// Basic operations
localStorage.setItem("demo-string", "Hello localStorage!");
localStorage.setItem("demo-number", 42);
localStorage.setItem("demo-object", JSON.stringify({ player: "X", score: 3 }));
localStorage.setItem("demo-array", JSON.stringify([[1,2,3],[4,5,6],[7,8,9]]));

console.log("Stored string:", localStorage.getItem("demo-string"));
console.log("Stored number:", localStorage.getItem("demo-number"));
console.log("Stored object:", JSON.parse(localStorage.getItem("demo-object")));
console.log("Stored 2D array:", JSON.parse(localStorage.getItem("demo-array")));

// Cleanup demo
localStorage.removeItem("demo-string");
localStorage.removeItem("demo-number");
localStorage.removeItem("demo-object");
localStorage.removeItem("demo-array");

console.log("Demo items cleaned up");


// ==========================
// GAME STATE (PART B)
// ==========================

let gameState = {
    board: Array(9).fill(""),
    currentPlayer: "X",
    gameActive: true,
    winner: null
};

console.log("=== GAME STATE MANAGEMENT ===");

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // columns
    [0,4,8], [2,4,6]            // diagonals
];

console.log("Winning combinations:", winningCombos);

// ==========================
// PART C — LOCALSTORAGE INTEGRATION
// ==========================

function saveGameState() {
    localStorage.setItem("tictactoe-game-state", JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem("tictactoe-game-state");
    if (saved) {
        gameState = JSON.parse(saved);
        updateBoardUI();
        updateStatusUI();
    }
}

function clearSavedGame() {
    localStorage.removeItem("tictactoe-game-state");
}


// ==========================
// PART D — WINNER DETECTION
// ==========================

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            gameState.board[a] &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]
        ) {
            return gameState.board[a];
        }
    }
    return null;
}

function checkDraw() {
    return gameState.board.every(cell => cell !== "");
}


// ==========================
// PART E — STATISTICS
// ==========================

let statistics = {
    total: 0,
    xWins: 0,
    oWins: 0,
    draws: 0
};

function saveStatistics() {
    localStorage.setItem("tictactoe-statistics", JSON.stringify(statistics));
}

function loadStatistics() {
    const saved = localStorage.getItem("tictactoe-statistics");
    if (saved) {
        statistics = JSON.parse(saved);
    }
    updateStatsUI();
}


// ==========================
// GAME LOGIC
// ==========================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

function updateBoardUI() {
    cells.forEach((cell, index) => {
        cell.textContent = gameState.board[index];
    });
}

function updateStatusUI() {
    if (!gameState.gameActive && gameState.winner) {
        statusText.textContent = `Player ${gameState.winner} wins!`;
    } else if (!gameState.gameActive) {
        statusText.textContent = "It's a draw!";
    } else {
        statusText.textContent = `Player ${gameState.currentPlayer}'s turn`;
    }
}

function handleMove(index) {
    if (!gameState.gameActive || gameState.board[index] !== "") {
        return;
    }

    gameState.board[index] = gameState.currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameState.gameActive = false;
        gameState.winner = winner;
        updateStats(winner);
    } else if (checkDraw()) {
        gameState.gameActive = false;
        updateStats("draw");
    } else {
        gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
    }

    saveGameState();
    updateBoardUI();
    updateStatusUI();
}

function updateStats(result) {
    statistics.total++;

    if (result === "X") statistics.xWins++;
    else if (result === "O") statistics.oWins++;
    else statistics.draws++;

    saveStatistics();
    updateStatsUI();
}

function updateStatsUI() {
    document.getElementById("total-games").textContent = statistics.total;
    document.getElementById("x-wins").textContent = statistics.xWins;
    document.getElementById("o-wins").textContent = statistics.oWins;
    document.getElementById("draws").textContent = statistics.draws;
}

function newGame() {
    gameState = {
        board: Array(9).fill(""),
        currentPlayer: "X",
        gameActive: true,
        winner: null
    };

    saveGameState();
    updateBoardUI();
    updateStatusUI();

    console.log("New game initialized:", gameState);
}


// ==========================
// EVENT LISTENERS
// ==========================

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        handleMove(parseInt(cell.dataset.index));
    });
});

document.getElementById("new-game").addEventListener("click", newGame);
document.getElementById("reset-stats").addEventListener("click", () => {
    statistics = { total: 0, xWins: 0, oWins: 0, draws: 0 };
    saveStatistics();
    updateStatsUI();
});

// Load saved data on page load
loadStatistics();
loadGameState();
updateBoardUI();
updateStatusUI();
