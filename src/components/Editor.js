// @flow

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import WebSocket from 'ws';
import io from 'socket.io-client';

type Props = {};
type State = {
  text: string,
};

class Editor extends React.PureComponent<Props, State> {
  quillInstance: any;
  socket: WebSocket;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
    };
    this.socket = io.connect('ws://localhost:3001');
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    this.socket.on('text', (data: any) => {
      this.quillInstance.getModule('editor').setText(data.text);
    });
  }

  componentDidMount() {
    this.quillInstance = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, false] }],
          ['clean'],
          ['code', 'data'],
          ['color', 'background'],
        ],
        placeholder: 'Type something...',
        theme: 'snow',
        editor: this.handleTextChange,
        clipboard: {
          matchVisual: false,
        },
      },
      placeholder: 'Type something...',
      throttle: 100,
      scrollingContainer: '#app',
    });
  }

  handleTextChange = (delta: any, oldDelta: any, source: any) => {
    const text = this.quillInstance.getModule('editor').getText(); // Get text from Quill
    this.socket.emit('text', { text }); // Send text change to server
    this.setState({ // Save text change in current state (for later updates)
      text,
    });
  };

  UNSAFE_componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className="editor">
        <ReactQuill
          id="editor"
          value=""
          onChange={() => {}}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, false] }],
              ['clean'],
              ['code', 'data'],
              ['color', 'background'],
            ],
            clipboard: {
              matchVisual: false,
            },
          }}
        />
        <div
          className="ql-editor"
          style={{
            position: 'relative',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'both',
            overflow: 'auto',
          }}
        />
      </div>
    );
  }
}

export default Editor;