import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";

interface SquareProps {
  square: string; // Square notation (e.g., 'e4', 'a1')
  isLight: boolean; // Determines the color of the square
  piece: string | null; // FEN notation for the piece (e.g., 'p' for black pawn)
  isSelected: boolean; // If the square is currently selected
  isValidMove: boolean; // If the square is a valid move
  isOpponentsPeice: boolean; // If the square is a valid move
}

const Square: React.FC<SquareProps> = ({
  piece,
  isValidMove,
  isOpponentsPeice,
}) => {
  // Determine piece styles
  const pieceClasses = `text-center text-xl font-bold ${
    piece && piece.toUpperCase() === piece ? "text-black" : "text-white"
  }`;
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;

  return (
    <>
      {piece && (
        <span className={pieceClasses}>
          <img
            className={`${
              piece == "bp" || piece == "wp"
                ? "h-[22px] md:h-[47px]"
                : "h-[25px] md:h-[55px]"
            }`}
            src={`/pieces/${currentTheme.type}/${piece}.svg`}
            alt={piece}
          />
        </span>
      )}
      {isValidMove ? (
        isOpponentsPeice ? (
          <div className="absolute w-4 h-4 bg-red-500 rounded-full opacity-70 z-20"></div>
        ) : (
          <div className="absolute w-4 h-4 bg-green-500 rounded-full opacity-70 z-20"></div>
        )
      ) : null}
    </>
  );
};

export default Square;
