import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { parse } from "@mliebelt/pgn-parser";

function App() {
  const [pgn, setPgn] = useState<string>("");
  const [game, setGame] = useState<Chess>(new Chess());

  const playGame = () => {
    let gameNotations = parse(pgn, { startRule: "game" });
    gameNotations.moves.forEach((move: any, index: number) => {
      setTimeout(() => {
        setGame((prevGame) => {
          const newGame = new Chess(prevGame.fen());
          newGame.move(move.notation.notation);
          return newGame;
        });
      }, 1000 * index);
    });
  };

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
          onClick={playGame}
          title="add game"
          className="bg-purple-600 p-3 w-full rounded-lg text-white font-medium transition-all duration-300 hover:bg-purple-700"
        >
          Add Game
        </button>
      </div>

      <div className="mt-10 w-full max-w-md">
        <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <Chessboard position={game.fen()} />
        </div>
      </div>
    </div>
  );
}

export default App;
