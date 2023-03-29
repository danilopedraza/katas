// business logic functions

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

    return potentialNeighbors.filter(
        cell =>  
            (0 <= cell.row    && cell.row    < height)
         && (0 <= cell.column && cell.column < width )
    );
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
    if ((aliveNeighbors === 2 || aliveNeighbors === 3) && alive)
        return true;
    if (aliveNeighbors === 3 && !alive)
        return true;
    else
        return false;
}

function nextGrid(currentGrid) {
    const height = currentGrid.length;
    const width = currentGrid[0].length;

    const newGrid = Array(height).fill().map(
        (row, rowIndex) => Array(width).fill().map(
            (cell, columnIndex) => {
                const aliveNeighbors = numberOfAliveNeighbors(
                    rowIndex,
                    columnIndex,
                    currentGrid
                );

                return cellNewState(
                    currentGrid[rowIndex][columnIndex],
                    aliveNeighbors
                );
            }
        )
    );

    return newGrid;
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

function generationToString(state) {
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

console.log(generationToString(nextGeneration));

// the functions called by the tests

export {
    // business logic
    nextGrid,
    // input parsing
    parseGeneration,
    parseDimensions,
    parseGrid,
}
