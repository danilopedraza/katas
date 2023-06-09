// business logic functions

function isCellWithinBoundaries(height, width) {
    return cell =>
        (0 <= cell.row    && cell.row    < height)
    &&  (0 <= cell.column && cell.column < width );
}

function getAllNeighbors(row, column, height, width) {
    const potentialNeighbors = [
        {row: row-1, column: column  },
        {row: row+1, column: column  },
        {row: row  , column: column-1},
        {row: row  , column: column+1},
        {row: row-1, column: column-1},
        {row: row+1, column: column-1},
        {row: row-1, column: column+1},
        {row: row+1, column: column+1},
    ];

    return potentialNeighbors.filter(isCellWithinBoundaries(height, width));
}

function numberOfAliveNeighbors(row, column, grid) {
    const height = grid.length;
    const width = grid[0].length;

    const neighbors = getAllNeighbors(row, column, height, width);
    
    return neighbors.reduce(
        (aliveNeighbors, cell) =>
            aliveNeighbors + (grid[cell.row][cell.column] ? 1 : 0),
        0
    );
}

function cellNewState(alive, aliveNeighbors) {
    const aliveStillAlive = alive && (aliveNeighbors === 2 || aliveNeighbors === 3);
    const deadBecomesAlive = !alive && aliveNeighbors === 3;

    return aliveStillAlive || deadBecomesAlive;
}

function nextCell(rowIndex, grid) {
    return function(cell, columnIndex) {
        const aliveNeighbors = numberOfAliveNeighbors(
            rowIndex,
            columnIndex,
            grid
        );

        return cellNewState(
            cell,
            aliveNeighbors
        );
    }
}

function nextRow(row, rowIndex, grid) {
    return row.map(nextCell(rowIndex, grid));
}

function nextGrid(currentGrid) {
    return currentGrid.map(nextRow);
}

// input parsing functions

function parseGeneration(inputLine) {
    if (!/^Generation [1-9][0-9]*:$/.test(inputLine))
        throw new Error("Invalid first line format");

    return parseInt(inputLine.match(/[0-9]+/));
}

function parseDimensions(inputLine) {
    if (!/^[1-9][0-9]* [1-9][0-9]*$/.test(inputLine))
        throw new Error("Invalid second line format");

    const splitted = inputLine.split(" ");
    return {
        height: parseInt(splitted[0]),
        width: parseInt(splitted[1]),
    };
}

function parseGrid(rows) {
    return rows.map(parseRow);
}

function parseRow(row) {
    const splitted = row.split("");
    return splitted.map(cell => cell === "*");
}

function parseInput(input) {
    const splitted = input.split("\n");

    const generationNumber = parseGeneration(splitted[0]);
    const dimensions = parseDimensions(splitted[1]);
    const grid = parseGrid(splitted.slice(2))


    return {
        generationNumber,
        dimensions,
        grid,
    };
}

function gameOfLifeIteration(currentState) {
    return {
        generationNumber: currentState.generationNumber + 1,
        dimensions: Object.assign({}, currentState.dimensions),
        grid: nextGrid(currentState.grid),
    };
}

function stateToString(state) {
    const firstLine = `Generation ${state.generationNumber}:`;
    const secondLine = `${state.dimensions.height} ${state.dimensions.width}`;
    const lastLines = state.grid.map(
        (row) => {
            const transformedCells = row.map((cell) => cell ? "*" : ".");
            return transformedCells.join("");
        }
    );

    return `${firstLine}\n${secondLine}\n${lastLines.join("\n")}`;
}

const input = 
`Generation 1:
4 8
........
....*...
...**...
........`;

console.log(input);

const currentGeneration = parseInput(input);

const nextGeneration = gameOfLifeIteration(currentGeneration);

console.log(stateToString(nextGeneration));

// the functions called by the tests

export {
    // business logic
    nextGrid,
    // input parsing
    parseGeneration,
    parseDimensions,
    parseGrid,
}
