import { Chessboard } from "react-chessboard";

export default function ChessBoaordComponent({
  game,
  nextMove,
  prevMove,
}: {
  game: any;
  nextMove: () => void;
  prevMove: () => void;
}) {
  return (
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
  );
}
