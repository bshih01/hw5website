let currentPlayer = 'X';
let moveCount = 0;
let table = [];

$(document).ready(() => {
    /* creating the array representation of table */
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(0);
        }
        table.push(row);
    }
    /* creating the tic tac toe grid on the website */
    let grid = $("#tictactoe");
    let tableContent = '';
    for (let i = 0; i < 3; i++) {
        tableContent += '<tr>';
        for (let j = 0; j < 3; j++) {
            tableContent += `<td><button onclick="makeMove(this, ${i}, ${j})" class="cell"></button></td>`;
        }
        tableContent += '</tr>';
    }
    grid.html(tableContent);
});

function makeMove(button, row, col) {
    console.log(table);
    if ($(button).text() === '') {
        $(button).text(currentPlayer);
        table[row][col] = currentPlayer;
        moveCount++;
        if (checkWin()) {
            $('#winMessage').text(currentPlayer + " wins!").show();
            $('button.cell').prop('disabled', true);
        } else if (moveCount == 9) {
            $('#winMessage').text("Stalemate! Game over.").show();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            $('#currentPlayerTurn').text("Player " + currentPlayer + "'s Turn");
        }
        $(button).prop('disabled', true);
    }
}

function checkWin() {
    /* checking for row wins */
    for (let row of table) {
        if (row && row.every(cell => cell == row[0] && cell != 0)) {
            return true;
        }
    }

    /* checking for column wins */
    for (let col = 0; col < table[0].length; col++) {
        let val = table[0][col];
        if (table.every(row => row[col] == val && val != 0)) {
            return true;
        }
    }

    /* checking diagonals */
    if (table[1][1] != 0 && 
        ((table[0][0] == table[1][1] && table[1][1] == table[2][2]) ||
         (table[0][2] == table[1][1] && table[1][1] == table[2][0]))) {
            return true;
    }

    return false;
}

function startNewGame() {
    $('button.cell').text('').prop('disabled', false);
    $('#winMessage').hide();
    $('#currentPlayerTurn').text("Player X's Turn");
    moveCount = 0;
    currentPlayer = 'X';
    table.forEach(row => row.fill(0));
}
