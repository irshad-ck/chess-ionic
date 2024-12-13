import { io } from "socket.io-client";
class MySocket {
    static { this.instance = new MySocket(); }
    constructor() {
        this.reAssignSocket();
    }
    reAssignSocket() {
        this.socket = io("https://chess.coderkubes.com", {
            transports: ["websocket"],
            reconnection: true,
        });
    }
    connectToSocket(handleConnectToSocket) {
        this.socket?.on("connect", handleConnectToSocket);
    }
    listenRoomJoin(handleRoomJoin) {
        this.socket?.on("roomJoined", handleRoomJoin);
    }
    listenReceiveMessage(handleReceiveMessage) {
        this.socket?.on("receiveMessage", handleReceiveMessage);
    }
    onSendMessage(data) {
        this.socket?.emit("sendMessage", data);
    }
    listenChangeMove(handleChangeMove) {
        this.socket?.on("OnChangeMove", handleChangeMove);
    }
    onMakeMove(data) {
        this.socket?.emit("onMove", data);
    }
    listenOpponentDisconnected(handleOpponentDisconnected) {
        this.socket?.on("opponentDisconnected", handleOpponentDisconnected);
    }
}
export default MySocket.instance;
