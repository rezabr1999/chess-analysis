import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { parse } from "@mliebelt/pgn-parser";

function App() {
  const [pgn, setPgn] = useState<string>("");
  const [game, setGame] = useState<Chess>(new Chess());
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const addGame = () => {
    let gameNotations = parse(pgn, { startRule: "game" });
    const parsedMoves = gameNotations.moves.map(
      (move: any) => move.notation.notation
    );
    setMoves(parsedMoves);
    setGame(new Chess());
    setCurrentMove(0);
    setPgn("");
  };

  function nextMove() {
    if (currentMove < moves.length) {
      const newGame = new Chess();
      for (let i = 0; i <= currentMove; i++) {
        newGame.move(moves[i]);
      }
      setGame(newGame);
      setCurrentMove(currentMove + 1);
    }
  }

  function prevMove() {
    if (currentMove > 0) {
      const newGame = new Chess();
      for (let i = 0; i < currentMove - 1; i++) {
        newGame.move(moves[i]);
      }
      setGame(newGame);
      setCurrentMove(currentMove - 1);
    }
  }

  return (
    <div className="p-5 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl text-center text-white font-semibold mb-6">
          Chess PGN Viewer
        </h1>
        <input
          title="paste game"
          placeholder="Paste your PGN"
          type="text"
          className="p-3 w-full outline-none bg-gray-700 rounded-lg text-gray-300 placeholder-gray-500 mb-5 focus:ring-2 focus:ring-purple-600"
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
        />
        <button
          onClick={addGame}
          title="add game"
          className="bg-purple-600 p-3 w-full rounded-lg text-white font-medium transition-all duration-300 hover:bg-purple-700"
        >
          Add Game
        </button>
      </div>

      <div className="mt-10 w-full max-w-md">
        <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden flex flex-col gap-3">
          <Chessboard position={game.fen()} />
          <div className="flex gap-4 p-3">
            <button
              onClick={prevMove}
              title="prev"
              type="button"
              className="p-4 bg-emerald-600 rounded-lg flex-1"
            >
              Prev Move
            </button>

            <button
              onClick={nextMove}
              title="next"
              type="button"
              className="p-4 bg-sky-700 rounded-lg flex-1"
            >
              Next Move
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
