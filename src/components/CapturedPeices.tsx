interface CapturedPiecesProps {
    color: "white" | "black";
    pieces: string[];
  }
  
  export function CapturedPieces({ color, pieces }: CapturedPiecesProps) {
    return (
      <div className="p-4 rounded-lg">
        {/* <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {color === "white" ? "White" : "Black"} Captured
        </h3> */}
        <div className="flex gap-1 flex-wrap">
          {pieces.map((piece, i) => (
            <img
              key={i}
              src={`/pieces/${color === "white" ? "w" : "b"}${piece}.svg`}
              alt={`Captured ${piece}`}
              className="w-6 h-6"
            />
          ))}
        </div>
      </div>
    );
  }
  