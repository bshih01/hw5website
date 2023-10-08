let currentPlayer = 'X';
let moveCount = 0;

function makeMove(button) {
    if ($(button).text() === '') {
        $(button).text(currentPlayer);
        moveCount++;
        if (checkWin()) {
            $('#winMessage').text(currentPlayer + " wins!").show();
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
    const rows = $('tr');
    for (let i = 0; i < rows.length; i++) {
        if ($(rows[i]).children().text() == currentPlayer.repeat(3)) {
            return true;
        }
    }

    /* checking for column wins */
    for (let i = 1; i <= 3; i++) {
        if ($(`td:nth-child(${i})`).text() == currentPlayer.repeat(3)) {
            return true;
        }
    }

    /* checking top left to bottom right diagonal */
    if ($('tr:nth-child(1) td:nth-child(1)').text() == currentPlayer &&
        $('tr:nth-child(2) td:nth-child(2)').text() == currentPlayer &&
        $('tr:nth-child(3) td:nth-child(3)').text() == currentPlayer) {
        return true;
    }

    /* checking bottom right to top left diagonal */
    if ($('tr:nth-child(1) td:nth-child(3)').text() == currentPlayer &&
        $('tr:nth-child(2) td:nth-child(2)').text() == currentPlayer &&
        $('tr:nth-child(3) td:nth-child(1)').text() == currentPlayer) {
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
}
