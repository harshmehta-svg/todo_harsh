// src/services/EditorService.js

import React, { useEffect, useState } from 'react';
import io from 'sockets.io';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';

// Create a WebSocket connection for real-time updates
const socket = io.connect('http://localhost:3001');

const EditorService = () => {
  const [editor, setEditor] = useState(null);
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize the Quill editor
    const quill = new Quill('#editor', {
      modules: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'Strike'],
          ['Code', 'Color', 'Background', 'Link'],
          ['Alignment', 'Alignment', 'Alignment', 'Alignment'],
          ['Font', 'Size'],
        ],
      },
      placeholder: 'Type something!',
      theme: 'snow',
    });

    // Update the state with the current Quill instance
    setEditor(quill);

    // Bind events
    quill.on('text-change', () => {
      handleTextChange(quill);
    });
  }, []);

  useEffect(() => {
    // Establish a WebSocket connection
    socket.on('connect', () => {
      setIsConnected(true);
    });

    // Handle incoming updates from other users
    socket.on('update', (data) => {
      const quill = editor;
      quill.clipboard.dangerouslyPasteHTML(data.text);
      quill.on('text-change', () => {
        handleTextChange(quill);
      });
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
  }, [editor]);

  const handleTextChange = (quill) => {
    // Get the current text from the Quill editor
    const delta = quill.getContents();
    const text = Quill.import('core/formats/text');
    const formattedText = delta.ops ? text(delta.ops[0].delta) : '';

    // Send the updated text to the WebSocket server
    socket.emit('update', { text: formattedText, id: uuidv4() });
  };

  const handleSendMessage = () => {
    const message = editor.getText();
    console.log(message);
  };

  return (
    <div>
      <div className="editor-container">
        <div id="toolbar" className="toolbar">
          <button className="ql-bold">Bold</button>
          <button className="ql-italic">Italic</button>
        </div>
        <div id="editor">
          {' '}
        </div>
      </div>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default EditorService;

// Websocket server for broadcasting updates to other clients
// Note: this code typically resides on the server-side, but for the purpose of this example
//       it is shown here as well.

// Create a new WebSocket server
const io = require('sockets.io').listen(3001);

// Handle new connections
io.on('connect', (socket) => {
  console.log('New connection');

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Handle incoming update events
io.on('update', (data) => {
  console.log('Update: ', data);

  // Broadcase the update to all connected clients
  socket.emit('update', data);
});