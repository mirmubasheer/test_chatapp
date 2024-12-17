import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Replace with frontend origin in production
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'], // Only WebSocket transport
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  // Called when the server is initialized
  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  // Triggered when a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Triggered when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Handle incoming messages
  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: { message: string }): void {
    console.log('Message received:', data.message);

    // Broadcast the message to all connected clients
    this.server.emit('receive_message', { message: data.message });
  }
}
