import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const GameSize = 15;

function Square(props) {
    return (
        <button id={props.id} className={(props.value != null ? props.value + " highlight" : "") + " square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function highlight(element) {
    element.classList.add("highlight");
}

function removeHighlight(element) {
    element.classList.remove("highlight");
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                id={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        var sizeBoard = Array(GameSize).fill(0, 0, GameSize);
        return (
            <React.Fragment>
                {sizeBoard.map((value, i) =>
                    <div key={i} className="board-row">
                        {sizeBoard.map((value2, j) =>
                            <React.Fragment key={i * GameSize + j}>
                                {this.renderSquare(i * GameSize + j)}
                            </React.Fragment>)
                        }
                    </div>
                )
                }
            </React.Fragment>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(GameSize * GameSize).fill(null),
                x: 0,
                y: 0,
                isX: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                x: i % GameSize + 1,
                y: (i - i % GameSize) / GameSize + 1,
                isX: this.state.xIsNext ? 'X' : 'O',
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        var btn = document.getElementsByClassName("highlight");
        if (btn.length > 0) removeHighlight(btn[0]);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        var board = Array.from(document.getElementsByClassName("highlight"));
        board.map((btn, index) => removeHighlight(btn));
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move : 'Go to game start';
            return (
                <li id={move} key={move}>
                    <button className="button-81" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                    {console.log(this.state.stepNumber)}
                    <span className={step.isX + " historyStep"}>{step.isX} ({step.x}, {step.y})</span>
                </li>
            );
        });
        let status, nextPlayer;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber === GameSize*GameSize) {
            status = "Draw, try again";
            alert(status);
        }
         else {
            status = "Next player: ";
            nextPlayer = this.state.xIsNext ? 'X' : 'O';
        }
        return (
            <React.Fragment>
                <div className="game">
                    <div className="game-board">
                    <div className="status">{status} <span className={nextPlayer}>{nextPlayer}</span></div>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="sortBtn">
                            <button onClick={() => sortListDir() } className="button-8">Sort</button>
                        </div>
                        <ol className="listMove" id="listMove" style={{ height: 34 * (GameSize - 1) }}>{moves}</ol>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i]
            && squares[i] === squares[i + 1]
            && squares[i] === squares[i + 2]
            && squares[i] === squares[i + 3]
            && squares[i] === squares[i + 4]
            && (i % GameSize <= (GameSize - 5)) // x <= size - 5
        ) {
            for (let id = 0; id < 5; id++) {
                highlight(document.getElementById(i + id))
            }
            return squares[i];
        } else if ((((i - i % GameSize) / GameSize) <= (GameSize - 5)) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + GameSize]
            && squares[i] === squares[i + 2 * GameSize]
            && squares[i] === squares[i + 3 * GameSize]
            && squares[i] === squares[i + 4 * GameSize]
        ) {
            for (let id = 0; id < 5; id++) {
                highlight(document.getElementById(i + GameSize * id))
            }
            return squares[i];
        } else if ((i % GameSize <= (GameSize - 5)) // x <= size - 5
            && (((i - i % GameSize) / GameSize) <= GameSize - 5) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + GameSize + 1]
            && squares[i] === squares[i + 2 * GameSize + 2]
            && squares[i] === squares[i + 3 * GameSize + 3]
            && squares[i] === squares[i + 4 * GameSize + 4]
        ) {
            for (let id = 0; id < 5; id++) {
                highlight(document.getElementById(i + GameSize * id + id))
            }
            return squares[i];
        } else if ((i % GameSize >= 4) // x >= 4
            && (((i - i % GameSize) / GameSize) <= GameSize - 5) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + GameSize - 1]
            && squares[i] === squares[i + 2 * GameSize - 2]
            && squares[i] === squares[i + 3 * GameSize - 3]
            && squares[i] === squares[i + 4 * GameSize - 4]
        ) {
            for (let id = 0; id < 5; id++) {
                highlight(document.getElementById(i + GameSize * id - id))
            }
            return squares[i];
        }
    }
    return null;
}
/////W3school sorl list  //////
function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("listMove");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("li");
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir === "asc") {
                if (Number(b[i].id) > Number(b[i + 1].id)) {
                    /* if next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (Number(b[i].id) < Number(b[i + 1].id)) {
                    /* if next item is alphabetically higher than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    if (dir === "desc") {
        list.reversed = true;
    }
    else {
        list.reversed = false;
    }
}