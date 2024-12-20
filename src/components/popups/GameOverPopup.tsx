import React from "react";
import { useGameStore } from "../../store/useGameStore";
import clsx from "clsx";
import { useThemeStore } from "../../store/useThemeStore";
import { themes } from "../../config/themes";
import socket from "../../socket/socket"
interface Props {
    onWait: () => void;
  }

  const GameOverPopup: React.FC<Props> = ({ onWait }) => {
    const { gameOver, myPiece, game } = useGameStore();
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme)!;
  
    if (!gameOver.isOver) return null;
  
    const getGameOverMessage = () => {
      if (gameOver.isOver && gameOver.reason === 'timeout') {
        const isWinner =
          (gameOver.winner === 'White' && myPiece === 'w') ||
          (gameOver.winner === 'Black' && myPiece === 'b');
          socket.socket?.disconnect();
        return {
          title: `${gameOver.winner} Wins by Timeout!`,
          message: isWinner
            ? 'Congratulations! You won on time!'
            : 'Game Over! You lost on time.',
        };
      }
  
      // Fall back to default messages
      if (game.isCheckmate()) {
        const winner = game.turn() === 'w' ? 'Black' : 'White';
        const isWinner =
          (winner === 'White' && myPiece === 'w') ||
          (winner === 'Black' && myPiece === 'b');
        return {
          title: `${winner} Wins!`,
          message: isWinner
            ? 'Congratulations! You won the game!'
            : 'Game Over! Better luck next time!',
        };
      }
      if (game.isDraw()) return { title: 'Draw!', message: 'The game ended in a draw.' };
      if (game.isStalemate())
        return { title: 'Stalemate!', message: 'The game ended in a stalemate.' };
      if (game.isThreefoldRepetition())
        return { title: 'Draw!', message: 'Draw by threefold repetition.' };
  
      return { title: 'Game Over!', message: 'The game has ended.' };
    };
  
    const { title, message } = getGameOverMessage();
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className={clsx(
            'p-8 rounded-lg shadow-xl text-center max-w-md mx-4',
            currentTheme.background,
            currentTheme.text
          )}
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <button
            onClick={onWait}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  };
  

export default GameOverPopup;
