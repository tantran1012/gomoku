const calculateWinner = (squares, size) => {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i]
            && squares[i] === squares[i + 1]
            && squares[i] === squares[i + 2]
            && squares[i] === squares[i + 3]
            && squares[i] === squares[i + 4]
            && (i % size <= ( size - 5)) // x <= size - 5
        ) {
            return ([i, i+1, i+2, i + 3, i+4])
        } else if ((((i - i % size) / size) <= (size - 5)) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + size]
            && squares[i] === squares[i + 2 * size]
            && squares[i] === squares[i + 3 * size]
            && squares[i] === squares[i + 4 * size]
        ) {
            return([i, i + size, i + 2 * size, i + 3 * size, i + 4 * size])
        } else if ((i % size <= (size - 5)) // x <= size - 5
            && (((i - i % size) / size) <= size - 5) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + size + 1]
            && squares[i] === squares[i + 2 * size + 2]
            && squares[i] === squares[i + 3 * size + 3]
            && squares[i] === squares[i + 4 * size + 4]
        ) {
            return([i, i + size + 1, i + 2 * size + 2, i + 3 * size + 3, i + 4 * size + 4])
        } else if ((i % size >= 4) // x >= 4
            && (((i - i % size) / size) <= size - 5) // y <= size - 5
            && squares[i]
            && squares[i] === squares[i + size - 1]
            && squares[i] === squares[i + 2 * size - 2]
            && squares[i] === squares[i + 3 * size - 3]
            && squares[i] === squares[i + 4 * size - 4]
        ) {
            return([i, i + size - 1, i + 2 * size - 2, i + 3 * size - 3, i + 4 * size - 4])
        }
    }
    return null;
}
/////W3school sorl list  //////
const sortListDir = () => {
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

export {calculateWinner, sortListDir}