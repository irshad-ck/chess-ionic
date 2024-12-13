export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type ThemeType = 'classic' | 'dark' | 'wooden' | 'neon' | 'ocean' | 'sunset';

export interface Theme {
  type: ThemeType;
  name: string;
  icon: string;
  lightSquare: string;
  darkSquare: string;
  background: string;
  accent: string;
  text: string;
  notation: string;
  container: string;
}

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  position: string;
}

export interface Player {
  name: string;
  color: PieceColor;
  timeLeft: number;
}

export interface GameState {
  pieces: ChessPiece[];
  currentTurn: PieceColor;
  moveHistory: string[];
  capturedPieces: ChessPiece[];
  isGameOver: boolean;
  winner: PieceColor | null;
}