const { useState, useEffect } = React;

// Winning combinations (same as Activity 10)
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// ----------------------
// Square Component
// ----------------------
function Square({ value, onClick }) {
  return (
    <div className="cell" onClick={onClick}>
      {value}
    </div>
  );
}

// ----------------------
// Board Component
// ----------------------
function Board({ board, onSquareClick }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}

// ----------------------
// Main Game Component
// ----------------------
function Game() {

  // Game state
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    xWins: 0,
    oWins: 0,
    draws: 0
  });

  // ----------------------
  // Local Storage Load
  // ----------------------
  useEffect(() => {
    const savedGame = localStorage.getItem("tictactoe-game-state");
    const savedStats = localStorage.getItem("tictactoe-statistics");

    if (savedGame) {
      const g = JSON.parse(savedGame);
      setBoard(g.board);
      setCurrentPlayer(g.currentPlayer);
      setGameActive(g.gameActive);
      setWinner(g.winner);
      setMoveCount(g.moveCount);
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // ----------------------
  // Save to Local Storage
  // ----------------------
  useEffect(() => {
    localStorage.setItem("tictactoe-game-state", JSON.stringify({
      board,
      currentPlayer,
      gameActive,
      winner,
      moveCount
    }));
  }, [board, currentPlayer, gameActive, winner, moveCount]);

  useEffect(() => {
    localStorage.setItem("tictactoe-statistics", JSON.stringify(stats));
  }, [stats]);

  // ----------------------
  // Game Logic
  // ----------------------
  function checkWinner(board) {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleMove(index) {
    if (!gameActive || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const win = checkWinner(newBoard);

    if (win) {
      setBoard(newBoard);
      setWinner(win);
      setGameActive(false);
      setMoveCount(moveCount + 1);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        xWins: win === "X" ? prev.xWins + 1 : prev.xWins,
        oWins: win === "O" ? prev.oWins + 1 : prev.oWins
      }));
      return;
    }

    if (!newBoard.includes("")) {
      setBoard(newBoard);
      setGameActive(false);
      setMoveCount(moveCount + 1);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        draws: prev.draws + 1
      }));
      return;
    }

    setBoard(newBoard);
    setMoveCount(moveCount + 1);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function newGame() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameActive(true);
    setWinner(null);
    setMoveCount(0);
  }

  function resetStats() {
    setStats({ total: 0, xWins: 0, oWins: 0, draws: 0 });
  }

  // ----------------------
  // Status Message
  // ----------------------
  let statusMessage = "";

  if (!gameActive && winner) {
    statusMessage = `Player ${winner} wins!`;
  } else if (!gameActive) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Player ${currentPlayer}'s turn`;
  }

  // ----------------------
  // UI Render
  // ----------------------
  return (
    <div className="game-container">

      <Board board={board} onSquareClick={handleMove} />

      <div className="status">
        {statusMessage} | Move #{moveCount}
      </div>

      <div className="controls">
        <button onClick={newGame}>New Game</button>
        <button onClick={resetStats}>Reset Statistics</button>
      </div>

      <div className="stats">
        <h3>Statistics</h3>
        <p>Total Games: {stats.total}</p>
        <p>X Wins: {stats.xWins}</p>
        <p>O Wins: {stats.oWins}</p>
        <p>Draws: {stats.draws}</p>
      </div>
    </div>
  );
}

// ----------------------
// Render Game
// ----------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
