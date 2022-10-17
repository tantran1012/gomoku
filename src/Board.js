import React from "react";
import Square from "./Square";

function Board(props) {
    const renderSquare = (i) => {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                prevSquare={props.prevSquare === i ? true : false}
                highlight={props.highlight ? 
                            (typeof(props.highlight) === 'object' ? 
                                (props.highlight.includes(i) ? true : false) : 
                                (props.highlight === i ? props.highlight : null)) 
                            : props.highlight 
                        }
            />
        )
    }
    var sizeBoard = Array(props.GameSize).fill(1, 0, props.GameSize)
    return (
        <React.Fragment>
            {sizeBoard.map((value, i) => (
                <div key={i} className="board-row">
                    {sizeBoard.map((value2, j) => (
                        <React.Fragment key={i * props.GameSize + j}>
                            {renderSquare(i * props.GameSize + j)}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}

export default Board;
