@echo off
mkdir jquery 2>nul
mkdir chess.js 2>nul
mkdir css 2>nul
mkdir js 2>nul

echo Descargando jQuery...
curl -L -o "jquery/jquery.min.js" "https://code.jquery.com/jquery-3.7.1.min.js"

echo Descargando chess.js...
curl -L -o "chess.js/chess.min.js" "https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"

echo Descargando chessboard CSS...
curl -L -o "css/chessboard-1.0.0.min.css" "https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css"

echo Descargando chessboard JS...
curl -L -o "js/chessboard-1.0.0.min.js" "https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"

mkdir img 2>nul
mkdir img\chesspieces 2>nul
mkdir img\chesspieces\wikipedia 2>nul

echo Descargando piezas de ajedrez...
curl -L -o "img/chesspieces/wikipedia/wP.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wP.png"
curl -L -o "img/chesspieces/wikipedia/wR.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wR.png"
curl -L -o "img/chesspieces/wikipedia/wN.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wN.png"
curl -L -o "img/chesspieces/wikipedia/wB.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wB.png"
curl -L -o "img/chesspieces/wikipedia/wQ.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wQ.png"
curl -L -o "img/chesspieces/wikipedia/wK.png" "https://chessboardjs.com/img/chesspieces/wikipedia/wK.png"
curl -L -o "img/chesspieces/wikipedia/bP.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bP.png"
curl -L -o "img/chesspieces/wikipedia/bR.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bR.png"
curl -L -o "img/chesspieces/wikipedia/bN.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bN.png"
curl -L -o "img/chesspieces/wikipedia/bB.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bB.png"
curl -L -o "img/chesspieces/wikipedia/bQ.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bQ.png"
curl -L -o "img/chesspieces/wikipedia/bK.png" "https://chessboardjs.com/img/chesspieces/wikipedia/bK.png"

echo ¡Completado! Ahora abre index.html en tu navegador.
pause
