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

export function moved(rover, moves) {
    switch (moves[0]) {
        case undefined:
            return rover;
        case 'L':
            return moved(leftRotated(rover) , moves.slice(1));
        case 'R':
            return moved(rightRotated(rover), moves.slice(1));
        case 'M':
            return moved(forwardMoved(rover), moves.slice(1));
    }
}
