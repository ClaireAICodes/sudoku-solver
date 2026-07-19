const gridElement = document.getElementById('grid');
const solveBtn = document.getElementById('solveBtn');
const clearBtn = document.getElementById('clearBtn');
const message = document.getElementById('message');

// Initialize the 9x9 grid
for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.classList.add('cell');
    // Only allow numbers 1-9
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^1-9]/g, '');
    });
    gridElement.appendChild(input);
}

const inputs = Array.from(document.querySelectorAll('.cell'));

clearBtn.addEventListener('click', () => {
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('solved');
    });
    message.textContent = '';
    message.className = 'message';
});

solveBtn.addEventListener('click', () => {
    const board = inputs.map(input => input.value === '' ? 0 : parseInt(input.value));
    
    if (isValidBoard(board)) {
        const result = solveSudoku([...board]);
        if (result) {
            applySolution(board, result);
            message.textContent = "Solved successfully!";
            message.className = 'message success';
        } else {
            message.textContent = "No solution exists for this puzzle.";
            message.className = 'message error';
        }
    } else {
        message.textContent = "Invalid puzzle: conflicts detected in rows, columns, or boxes.";
        message.className = 'message error';
    }
});

function isValidBoard(board) {
    // Check rows
    for (let i = 0; i < 9; i++) {
        const row = new Set();
        for (let j = 0; j < 9; j++) {
            const val = board[i * 9 + j];
            if (val !== 0) {
                if (row.has(val)) return false;
                row.add(val);
            }
        }
    }
    
    // Check columns
    for (let j = 0; j < 9; j++) {
        const col = new Set();
        for (let i = 0; i < 9; i++) {
            const val = board[i * 9 + j];
            if (val !== 0) {
                if (col.has(val)) return false;
                col.add(val);
            }
        }
    }
    
    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const box = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = boxRow * 3 + i;
                    const col = boxCol * 3 + j;
                    const val = board[row * 9 + col];
                    if (val !== 0) {
                        if (box.has(val)) return false;
                        box.add(val);
                    }
                }
            }
        }
    }
    
    return true;
}

function solveSudoku(board) {
    // Find empty cell
    let emptyIndex = -1;
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) {
            emptyIndex = i;
            break;
        }
    }
    
    // No empty cells = solved
    if (emptyIndex === -1) {
        return board;
    }
    
    const row = Math.floor(emptyIndex / 9);
    const col = emptyIndex % 9;
    
    // Try numbers 1-9
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[emptyIndex] = num;
            const result = solveSudoku(board);
            if (result) return result;
            board[emptyIndex] = 0;
        }
    }
    
    return null;
}

function isSafe(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row * 9 + i] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i * 9 + col] === num) return false;
    }
    
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[(startRow + i) * 9 + (startCol + j)] === num) return false;
        }
    }
    
    return true;
}

function applySolution(original, solution) {
    inputs.forEach((input, index) => {
        if (original[index] === 0) {
            input.value = solution[index];
            input.classList.add('solved');
        }
    });
}