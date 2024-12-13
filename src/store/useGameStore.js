import { create } from 'zustand';
import { Chess } from 'chess.js';
export const useGameStore = create((set, get) => ({
    game: new Chess(),
    currentPlayer: 'w',
    selectedSquare: null,
    validMoves: [],
    myPiece: null,
    isMatching: true,
    moveHistory: [],
    whiteCaptured: [],
    blackCaptured: [],
    timer: {
        white: 600,
        black: 600,
    },
    gameOver: {
        isOver: false,
        reason: null,
        winner: null,
    },
    promotion: null,
    setGameOver: ({ reason, winner }) => set({
        gameOver: {
            isOver: true,
            reason,
            winner,
        },
    }),
    isWhiteTurn: true,
    messages: [],
    theme: 'system',
    boardTheme: 'classic',
    callbackFunction: null,
    quit: false, // New state for quit status
    wait: false, // New state for wait status
    isOpponentDisconnected: false,
    setIsOpponentDisconnected: (isOpponentDisconnected) => set({ isOpponentDisconnected }),
    setGame: (game) => set({ game }),
    resetGame: () => {
        set({
            game: new Chess(),
            currentPlayer: 'w',
            selectedSquare: null,
            validMoves: [],
            moveHistory: [],
            whiteCaptured: [],
            blackCaptured: [],
            timer: {
                white: 600,
                black: 600,
            },
            gameOver: {
                isOver: false,
                reason: null,
                winner: null,
            },
            isWhiteTurn: true,
            isMatching: true,
            quit: false,
            wait: false,
            messages: [],
        });
    },
    setQuit: (quit) => set({ quit }),
    setWait: (wait) => set({ wait }),
    selectSquare: (square) => {
        const { game, currentPlayer, selectedSquare, validMoves, myPiece } = get();
        const piece = game.get(square);
        if (piece && piece.color === currentPlayer && myPiece === piece.color) {
            const moves = game.moves({ square: square, verbose: true });
            set({
                selectedSquare: square,
                validMoves: moves.map((move) => move.to),
            });
        }
        else if (selectedSquare && validMoves.includes(square)) {
            get().makeMove(selectedSquare, square);
        }
        else {
            set({ selectedSquare: null, validMoves: [] });
        }
    },
    makeMove: (from, to) => {
        const { game } = get();
        try {
            // Check if this is a pawn promotion move
            const piece = game.get(from);
            const isPromotion = piece?.type === 'p' &&
                ((piece.color === 'w' && to[1] === '8') ||
                    (piece.color === 'b' && to[1] === '1'));
            if (isPromotion) {
                set({
                    promotion: {
                        isPromoting: true,
                        from,
                        to,
                        color: piece.color // Store the color of the promoting piece
                    }
                });
                return true;
            }
            const capturedPiece = game.get(to);
            const moveResult = game.move({ from, to, promotion: 'q' });
            if (moveResult) {
                const newHistory = [...get().moveHistory, `${from}-${to}`];
                if (capturedPiece) {
                    if (capturedPiece.color === 'b') {
                        set((state) => ({
                            blackCaptured: [...state.blackCaptured, capturedPiece.type],
                        }));
                    }
                    else {
                        set((state) => ({
                            whiteCaptured: [...state.whiteCaptured, capturedPiece.type],
                        }));
                    }
                }
                const newGame = new Chess(game.fen());
                if (newGame.isCheckmate() || newGame.isStalemate() || newGame.isDraw()) {
                    set({
                        gameOver: {
                            isOver: true,
                            reason: newGame.isCheckmate() ? 'Checkmate' : newGame.isStalemate() ? 'Stalemate' : 'Draw',
                            winner: newGame.turn() === 'w' ? 'White' : 'Black',
                        }
                    });
                }
                set({
                    game: newGame,
                    currentPlayer: newGame.turn(),
                    selectedSquare: null,
                    validMoves: [],
                    moveHistory: newHistory,
                    isWhiteTurn: newGame.turn() === 'w',
                });
                // Trigger callback if exists
                const { callbackFunction } = get();
                if (callbackFunction) {
                    callbackFunction(from, to);
                }
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Invalid move:', error);
            return false;
        }
    },
    setMyPiece: (piece) => set({ myPiece: piece }),
    setIsMatching: (isMatching) => set({ isMatching }),
    addMessage: ({ message, peice }) => set((state) => ({
        messages: [
            ...state.messages,
            {
                id: Date.now().toString(),
                message,
                peice,
                timestamp: new Date(),
            },
        ],
    })),
    setTheme: (theme) => set({ theme: theme }),
    setBoardTheme: (theme) => set({ boardTheme: theme }),
    updateTimer: (color) => set((state) => ({
        timer: {
            ...state.timer,
            [color === 'w' ? 'white' : 'black']: state.timer[color === 'w' ? 'white' : 'black'] - 1,
        },
    })),
    setCallbackFunction: (fn) => set({ callbackFunction: fn }),
    triggerCallback: (from, to) => {
        const { callbackFunction } = get();
        if (callbackFunction) {
            callbackFunction(from, to);
        }
    },
    setPromotion: (promotion) => set({ promotion }),
    promoteToSelected: (piece) => {
        const { promotion, game } = get();
        if (!promotion)
            return;
        try {
            const { from, to } = promotion;
            const moveResult = game.move({ from, to, promotion: piece });
            if (moveResult) {
                const capturedPiece = moveResult.captured;
                const newHistory = [...get().moveHistory, `${from}-${to}`];
                if (capturedPiece) {
                    if (moveResult.color === 'w') {
                        set((state) => ({
                            blackCaptured: [...state.blackCaptured, capturedPiece],
                        }));
                    }
                    else {
                        set((state) => ({
                            whiteCaptured: [...state.whiteCaptured, capturedPiece],
                        }));
                    }
                }
                const newGame = new Chess(game.fen());
                // Check game end conditions...
                set({
                    game: newGame,
                    currentPlayer: newGame.turn(),
                    selectedSquare: null,
                    validMoves: [],
                    moveHistory: newHistory,
                    isWhiteTurn: newGame.turn() === 'w',
                    promotion: null,
                });
                // Trigger callback if exists
                const { callbackFunction } = get();
                if (callbackFunction) {
                    callbackFunction(from, to, piece);
                }
            }
        }
        catch (error) {
            console.error('Invalid promotion:', error);
        }
    },
}));
