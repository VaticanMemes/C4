// Function to generate the Connect 4 board
function createTable(rows, cols) {
    const container = document.getElementById('game-board');

    // Create a table element
    const table = document.createElement('table');

    // Counter for unique indexes
    let index = 0;

    // Generate rows and cells
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr'); // Create a row
        for (let j = 0; j < cols; j++) {
        const cell = document.createElement('td'); // Create a cell
        cell.id = index; // Set the unique index as cell id
        index++; // Increment the index
        row.appendChild(cell); // Add cell to the row
        }
        table.appendChild(row); // Add row to the table
    }

    // Append the table to the container
    container.appendChild(table);
    }

// Call the function to create the table
createTable(6, 7);