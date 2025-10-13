// src/services/WebSocket.js

import WebSocket from 'ws';
import { socketOptions } from '../config/socketOptions';

class WebSocketService {
  constructor() {
    this.ws = null;
  }

  init() {
    // Preserve the function signature
    init();
    this.connect();
  }

  connect() {
    // Add WebSocket connection for broadcasting changes
    const wsUrl = 'ws://localhost:8080'; // Update the URL as per your application needs
    this.ws = new WebSocket(wsUrl, socketOptions);
    
    // Define the onopen event handler for establishing the connection
    this.ws.on('open', () => {
      console.log('WebSocket connection established');
    });
    
    // Define the onmessage event handler for receiving data
    this.ws.on('message', (data) => {
      console.log('Received message:', data);
    });
    
    // Define the onclose event handler for closing the connection
    this.ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
    
    // Define the onerror event handler for error handling
    this.ws.on('error', (error) => {
      console.log('WebSocket connection error:', error);
    });

    this.send('Connected to the WebSocket server');
  }

  // Add a method to send data to the WebSocket server
  send(data) {
    this.ws.send(data);
  }

  // Add a method to close the WebSocket connection
  close() {
    this.ws.close();
  }
}

export default WebSocketService;

// Preserve the existing init function (modified as it was a call to it in previous code)
function init() {}
init();