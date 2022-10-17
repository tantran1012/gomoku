import React from "react";
import {calculateWinner, sortListDir} from "./utilities.js"

function History({props, jumpTo}) {
    const history = props.history;
    const current = history[props.stepNumber]
    const winner = calculateWinner(current.squares, props.GameSize);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move : 'Go to game start';
        return (
            <li id={move} key={move}>
                <button className="button-8" onClick={() => jumpTo(move)}>
                    {desc}
                </button>
                <span className={step.value + " historyStep"}>{step.value} ({step.x}, {step.y})</span>
            </li>
        );
    });


    let status, nextPlayer;
    if (winner) {
        status = 'Winner: ' + current.squares[winner[0]];
    } else if (props.stepNumber === props.GameSize * props.GameSize) {
        status = "Draw, try again";
        alert(status);
    }
    else {
        status = "Next player: ";
        nextPlayer = props.xIsNext ? 'X' : 'O';
    }
    return (
        <div className="game-info">
            <div className="status">{status} <span className={nextPlayer}>{nextPlayer}</span></div>
            <div className="sortBtn">
                    <button onClick={sortListDir} className="button-8">Sort</button>
                </div>
            <ol className="listMove" id="listMove" style={{ height: 34 * (props.GameSize - 1) }}>{moves}</ol>
        </div>
    )
}

export default History