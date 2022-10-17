import React, { useState } from "react";
import Board from "./Board";
import History from "./History";
import { calculateWinner } from "./utilities.js"

function Game() {
    const GameSize = 10;
    const [game, setGame] = useState({
        GameSize: GameSize,
        history: [{
            squares: Array(GameSize * GameSize).fill(null),
            i: null,
            x: null,
            y: null,
            value: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        prevSquare: null
    });
    const [highlight, setHighlight] = useState();

    const handleClick = (i) => {
        const history = game.history.slice(0, game.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, game.GameSize) || squares[i]) {
            setHighlight(calculateWinner(squares, game.GameSize))
            return;
        } else {
            setHighlight(i)
        }
        squares[i] = game.xIsNext ? 'X' : 'O';
        setGame({
            GameSize: GameSize,
            history : history.concat([{
                squares: squares,
                x: i % game.GameSize + 1,
                y: (i - i % game.GameSize) / game.GameSize + 1,
                value: game.xIsNext ? 'X' : 'O',
                prevSquare : i
            }]),
            stepNumber : history.length,
            xIsNext : !game.xIsNext,
        })
        
    }

    const jumpTo = (step) => {
        setGame({
            GameSize: game.GameSize,
            history : game.history,
            stepNumber : step,
            xIsNext : (step % 2) === 0,
        })
        setHighlight(game.history[step].prevSquare)
    }

    const history = game.history;
    const current = history[game.stepNumber];
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    onClick={(i) => handleClick(i)}
                    squares={current.squares}
                    GameSize={game.GameSize}
                    prevSquare={game.prevSquare}
                    highlight={highlight}
                />
            </div>
                <History props={game} jumpTo={jumpTo} />
        </div>
    )
}

export default Game