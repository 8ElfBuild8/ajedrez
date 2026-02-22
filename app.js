const game = new Chess();
let board = null;
let vsComputer = false;

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;
    if (vsComputer && game.turn() === 'b') return false;
}

function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';
    updateStatus();
    if (vsComputer && !game.game_over()) {
        window.setTimeout(makeComputerMove, 250);
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

function updateStatus() {
    let status = '';
    const turn = game.turn() === 'w' ? 'blancas' : 'negras';
    if (game.in_checkmate()) {
        status = 'Jaque mate. ' + (game.turn() === 'w' ? 'Negras' : 'Blancas') + ' ganan.';
    } else if (game.in_draw()) {
        status = 'Tablas.';
    } else {
        status = 'Turno de ' + turn + (game.in_check() ? ' — Jaque!' : '');
    }
    document.getElementById('status').textContent = status;
}

function makeComputerMove() {
    const moves = game.moves();
    if (moves.length === 0) return;
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move);
    board.position(game.fen());
    updateStatus();
}

function getBoardSize() {
    const container = document.getElementById('board');
    const maxWidth = Math.min(container.offsetWidth || 520, 520);
    return maxWidth;
}

function initBoard() {
    const width = getBoardSize();
    const config = {
        draggable: true,
        position: 'start',
        width: width,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    };
    
    if (board) {
        board.destroy();
    }
    board = Chessboard('board', config);
    updateStatus();
}

$(document).ready(function() {
    initBoard();

    // Resize board on window resize
    $(window).on('resize', function() {
        const width = getBoardSize();
        board.resize(width);
    });

    $('#newBtn').on('click', function() {
        game.reset();
        board.start();
        updateStatus();
    });

    $('#undoBtn').on('click', function() {
        game.undo();
        board.position(game.fen());
        updateStatus();
    });

    $('#flipBtn').on('click', function() {
        board.flip();
    });

    $('#vsComputer').on('change', function(e) {
        vsComputer = e.target.checked;
    });
});
