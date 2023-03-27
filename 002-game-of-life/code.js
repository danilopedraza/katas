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

export {
    nextGrid,
}
