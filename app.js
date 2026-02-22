const game = new Chess();
let board = null;
let vsComputer = false;

function onDragStart (source, piece, position, orientation) {
  if (game.game_over()) return false;
  if (vsComputer && game.turn() === 'b') return false;
}

function onDrop (source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  updateStatus();
  window.setTimeout(() => {
    if (vsComputer && !game.game_over()) {
      makeComputerMove();
    }
  }, 250);
}

function onSnapEnd () {
  board.position(game.fen());
}

function updateStatus () {
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

function makeComputerMove () {
  const moves = game.moves();
  if (moves.length === 0) return;
  const move = moves[Math.floor(Math.random() * moves.length)];
  game.move(move);
  board.position(game.fen());
  updateStatus();
}

const config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};

document.addEventListener('DOMContentLoaded', () => {
  board = Chessboard('board', config);
  updateStatus();

  document.getElementById('newBtn').addEventListener('click', () => {
    game.reset();
    board.start();
    updateStatus();
  });

  document.getElementById('undoBtn').addEventListener('click', () => {
    game.undo();
    board.position(game.fen());
    updateStatus();
  });

  document.getElementById('flipBtn').addEventListener('click', () => {
    board.flip();
  });

  document.getElementById('vsComputer').addEventListener('change', (e) => {
    vsComputer = e.target.checked;
  });
});
