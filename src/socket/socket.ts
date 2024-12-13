import { io, Socket } from "socket.io-client";

class MySocket {
  public socket: Socket | undefined;
  public static instance: MySocket = new MySocket();

  public constructor() {
    this.reAssignSocket();
  }
  public reAssignSocket() {
    this.socket = io("https://chess.coderkubes.com", {
        transports: ["websocket"],
        reconnection: true,
      });
  }
  public connectToSocket(handleConnectToSocket: () => void): void {
    this.socket?.on("connect", handleConnectToSocket);
  }
  public listenRoomJoin(handleRoomJoin: (data: string) => void): void {
    this.socket?.on("roomJoined", handleRoomJoin);
  }
  public listenReceiveMessage(handleReceiveMessage: (data: {message: string, peice: string}) => void): void {
    this.socket?.on("receiveMessage", handleReceiveMessage);
  }
  public onSendMessage(data: {message: string, peice: string|null}): void {
    this.socket?.emit("sendMessage", data);
  }
  public listenChangeMove(handleChangeMove: (data: {from: string, to: string, promotion?: string}) => void): void {
    this.socket?.on("OnChangeMove", handleChangeMove);
  }
  public onMakeMove(data: {from: string, to: string, promotionPiece?:string}) {
    this.socket?.emit("onMove", data);
  }
  public listenOpponentDisconnected(handleOpponentDisconnected: (data: object) => void): void {
    this.socket?.on("opponentDisconnected", handleOpponentDisconnected);
  }
}

export default MySocket.instance;
