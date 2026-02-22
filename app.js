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
  width: 520,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

document.addEventListener('DOMContentLoaded', () => {
  // Ensure jQuery is loaded
  if (typeof jQuery === 'undefined') {
    console.error('jQuery not loaded');
    document.getElementById('board').innerHTML = '<p style="color:red">Error: jQuery no se ha cargado. Verifica tu conexión a internet.</p>';
    return;
  }
  
  // Ensure Chessboard is loaded
  if (typeof Chessboard === 'undefined') {
    console.error('Chessboard not loaded');
    document.getElementById('board').innerHTML = '<p style="color:red">Error: Chessboard no se ha cargado. Verifica tu conexión a internet.</p>';
    return;
  }
  
  try {
    board = Chessboard('board', config);
    console.log('Chessboard initialized successfully');
  } catch (e) {
    console.error('Error initializing chessboard:', e);
    document.getElementById('board').innerHTML = '<p style="color:red">Error al cargar el tablero. Recarga la página.</p>';
  }
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
