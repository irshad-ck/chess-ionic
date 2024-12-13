import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useGameStore } from "../store/useGameStore"; // Assuming new useGameStore is updated
import Square from "./Square";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
import socket from "../socket/socket";
import { FindingMatch } from "./popups/FindingMatch";
import DisconnectedPopup from "./popups/DisconnectedPopup";
import GameOverPopup from "./popups/GameOverPopup";
import { PromotionPopup } from "./PromotionPopup";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const Chessboard: React.FC = () => {
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;
  // const [myPeice, setMyPeice] = useState("");
  const {
    game,
    selectedSquare,
    validMoves,
    selectSquare,
    moveHistory,
    myPiece,
    setMyPiece,
    setCallbackFunction,
    makeMove,
    isMatching,
    setIsMatching,
    isOpponentDisconnected,
    setIsOpponentDisconnected,
    resetGame,
    addMessage,
  } = useGameStore(); // Use the old logic for game state management

  const initializeSocket = () => {
    socket.connectToSocket(() => {
      if (socket.socket?.connected) {
        console.log("scoket connected");
        // setIsMatching(true);
        socket.listenRoomJoin((myPeiceColor) => {
          resetGame();
          setMyPiece(myPeiceColor.slice(0, 1)?.toLowerCase() as "w" | "b");
          setIsMatching(false);
        });
        socket.listenReceiveMessage(({ message, peice }) => {
          addMessage({ message, peice });
        });
        socket.listenChangeMove(({ from, to, promotion }) => {
          if (promotion) {
            // If it's a promotion move, first set up promotion state
            useGameStore.getState().setPromotion({
              isPromoting: true,
              from,
              to,
              color: useGameStore.getState().game.turn(),
            });
            // Then execute the promotion
            useGameStore
              .getState()
              .promoteToSelected(promotion as "b" | "q" | "r" | "n");
          } else {
            makeMove(from, to);
          }
        });

        socket.listenOpponentDisconnected((data) => {
          // console.log("on disconnect: ", data);
          onQuit();
          setIsOpponentDisconnected(true);
        });
        //
        const handleMove = (
          from: string,
          to: string,
          promotionPiece?: string
        ) => {
          socket.onMakeMove({ from, to, promotion: promotionPiece });
        };

        setCallbackFunction(handleMove);
      }
      // socket.socket?.on("opponentDisconnected", (data) => {
      //   // setIsOpponentDisconnected(true);
      //   // setMessage(data?.message);
      // });
    });
  };

  useEffect(() => {
    initializeSocket();
  }, []);

  const onQuit = () => {
    socket.socket?.disconnect();
    setIsOpponentDisconnected(false);
    // setIsGameQuit(true);
    // setQuit(true); // Set quit status globally
  };

  const onWait = () => {
    if (socket.socket) {
      resetGame();
      // socket.emit("playerAction", "wait");
      socket.reAssignSocket();
      initializeSocket();
      setIsMatching(true);
      setIsOpponentDisconnected(false);
    }
  };

  const renderSquare = (fileIndex: number, rankIndex: number) => {
    const position =
      myPiece === "b"
        ? `${files[fileIndex]}${ranks[7 - rankIndex]}`
        : `${files[fileIndex]}${ranks[rankIndex]}`;
    const piece = game.get(position); // Get the piece at this position
    const isLightSquare = (fileIndex + rankIndex) % 2 === 0;

    const isCheck =
      game.isCheck() && piece?.type === "k" && piece?.color === game.turn();
    // Check if the square is part of the last move
    const lastMove = moveHistory[moveHistory.length - 1];
    const [lastMoveFrom, lastMoveTo] = lastMove ? lastMove.split("-") : [];
    const isLastMove = position === lastMoveFrom || position === lastMoveTo;
    const isValidMove = validMoves.includes(position);
    const isOpponentsPeice = piece.color ? myPiece !== piece.color : false;
    return (
      <motion.div
        key={`${fileIndex}${rankIndex}`}
        className={clsx(
          "relative",
          (fileIndex + rankIndex) % 2 === 0
            ? currentTheme.lightSquare
            : currentTheme.darkSquare,
          "transition-colors duration-500 flex items-center justify-center",
          isCheck && "shadow-[inset_0_0_0_4px_rgba(248,113,113,1)]", // Red border for check
          isValidMove
            ? isOpponentsPeice
              ? "shadow-[inset_0_0_0_4px_rgba(248,113,113,1)]" // Red border for opponent's piece
              : "shadow-[inset_0_0_0_4px_rgba(34,197,94,1)]" // Green border for valid move
            : "",
          isLastMove && "shadow-[inset_0_0_0_4px_rgba(234,179,8,1)]" // Yellow border for last move
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (rankIndex * 8 + fileIndex) * 0.01 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          console.log("clicjed");
          selectSquare(position);
        }}
      >
        <Square
          key={position}
          isLight={
            isLightSquare ? currentTheme.lightSquare : currentTheme.darkSquare
          }
          position={position}
          isCheck={isCheck}
          piece={piece ? `${piece.color}${piece.type}` : undefined}
          isSelected={selectedSquare === position}
          isValidMove={isValidMove}
          isOpponentsPeice={isOpponentsPeice}
          isLastMove={isLastMove}
          // onClick={() => selectSquare(position)}
          theme="classic" // Use the new board theme logic if needed
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      className="relative max-w-[600px] w-full aspect-square"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isMatching && <FindingMatch />}
      {isOpponentDisconnected && !game.isGameOver() && (
        <DisconnectedPopup onQuit={onQuit} onWait={onWait} />
      )}
      <GameOverPopup onWait={onWait} />
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 overflow-hidden rounded-lg shadow-2xl border border-black/10">
        {ranks.map((_, rankIndex) =>
          files.map((_, fileIndex) => renderSquare(fileIndex, rankIndex))
        )}
      </div>

      <motion.div
        className="absolute -left-8 inset-y-0 flex flex-col justify-around font-mono font-medium"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {ranks.map((rank) => (
          <div key={rank} className="text-sm">
            {rank}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute -bottom-8 inset-x-0 flex justify-around font-mono font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {files.map((file) => (
          <div key={file} className="text-sm">
            {file}
          </div>
        ))}
      </motion.div>
      <PromotionPopup />
    </motion.div>
  );
};
