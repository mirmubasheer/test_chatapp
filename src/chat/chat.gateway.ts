import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (adjust for production)
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
  }

  @SubscribeMessage('join_chat')
  handleJoinChat(client: Socket, payload: { username: string }) {
    console.log(`${payload.username} joined the chat`);
    this.users.set(client.id, payload.username);
    this.server.emit('user_connected', { username: payload.username });
  }

  @SubscribeMessage('send_message')
  handleMessage(client: Socket, payload: { message: string }) {
    const sender = this.users.get(client.id) || 'Anonymous';
    this.server.emit('receive_message', { sender, message: payload.message });
  }
}
