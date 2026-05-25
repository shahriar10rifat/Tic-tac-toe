import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) return;

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);

    let status = winner
        ? "Winner: " + winner
        : "Next Player: " + (xIsNext ? "X" : "O");

    return (
        <>
            <div className="status">{status}</div>

            {[0, 3, 6].map((row) => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map((col) => {
                        const i = row + col;
                        return (
                            <Square
                                key={i}
                                value={squares[i]}
                                onSquareClick={() => handleClick(i)}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentMove(move);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>

            <div className="game-info">
                <h2>Reviews</h2>

                {history.map((_, move) => {
                    const label =
                        move === 0 ? "Game Start" : "Review Move " + move;

                    return (
                        <button
                            key={move}
                            onClick={() => jumpTo(move)}
                            className={move === 0 ? "startBtn" : ""}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return null;
}
