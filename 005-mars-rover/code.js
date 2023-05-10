function leftRotated(rover) {
    return {
        x: rover.x,
        y: rover.y,
        orientation: {
            N: "W",
            W: "S",
            S: "E",
            E: "N",
        }[rover.orientation],
    }
}

function rightRotated(rover) {
    return {
        x: rover.x,
        y: rover.y,
        orientation: {
            N: "E",
            E: "S",
            S: "W",
            W: "N",
        }[rover.orientation],
    }
}

function horizontalDisplacement(rover) {
    return {
        N:  0,
        W: -1,
        S:  0,
        E:  1,
    }[rover.orientation];
}

function verticalDisplacement(rover) {
    return {
        N:  1,
        W:  0,
        S: -1,
        E:  0,
    }[rover.orientation];
}

function forwardMoved(rover) {
    return {
        x: rover.x + horizontalDisplacement(rover),
        y: rover.y + verticalDisplacement(rover),
        orientation: rover.orientation,
    };
}

function isRoverWithinBoundaries(rover, plateau) {
    return (0 <= rover.x  && rover.x < plateau.size.width)
        && (0 <= rover.y  && rover.y < plateau.size.length);
}

function isCellFree(x, y, plateau) {
    return !plateau.cells[y][x];
}

function movementPossible(rover, plateau) {
    return isRoverWithinBoundaries(forwardMoved(rover), plateau)
        && isCellFree(forwardMoved(rover).x, forwardMoved(rover).y, plateau);
}

export function movedRover(rover, moves, plateau) {
    switch (moves[0]) {
        case undefined:
            return rover;
        case 'L':
            return movedRover(leftRotated(rover) , moves.slice(1), plateau);
        case 'R':
            return movedRover(rightRotated(rover), moves.slice(1), plateau);
        case 'M':
            if (movementPossible(rover, plateau))
                return movedRover(forwardMoved(rover), moves.slice(1), plateau);
            else
                return rover;          
    }
}

export function movedRovers(rovers, plateau, roverIndex=0) {
    if (roverIndex === rovers.length)
        return rovers;
    
    return movedRovers(
        rovers.map(
            (roverWithMoves, arrIndex) => arrIndex === roverIndex ?
                movedRover(roverWithMoves.rover, roverWithMoves.moves, plateau) :
                roverWithMoves
        ),
        plateau,
        // updated(
        //     plateau,
        //     rovers[roverIndex].rover, 
        //     movedRover(
        //         rovers[roverIndex].rover,
        //         rovers[roverIndex].moves,
        //         plateau
        //     )
        // ),
        roverIndex+1
    );
}
