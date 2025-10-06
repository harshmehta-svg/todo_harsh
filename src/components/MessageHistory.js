import React from 'react';
import '../index.css';

const ConversationThread = ({ conversationId, messages, handleSwitchThread }) => {
  return (
    <div>
      <h2>Conversation Thread {conversationId}</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <span style={{ color: 'blue' }}>{message.sender}: </span>
          <span>{message.text}</span>
          <button onClick={() => handleSwitchThread(conversationId)}>Switch to another thread</button>
        </div>
      ))}
    </div>
  );
};

class MessageHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: {
        1: [
          { id: 1, sender: 'John', text: 'Hello, how are you?' },
          { id: 2, sender: 'Jane', text: 'I am good, thanks.' },
          { id: 3, sender: 'John', text: 'That is great.' },
        ],
        2: [
          { id: 1, sender: 'John', text: 'What is your name?' },
          { id: 2, sender: 'Jane', text: 'My name is Jane.' },
          { id: 3, sender: 'John', text: 'Nice to meet you.' },
        ],
      },
    };
    this.handleSwitchThread = this.handleSwitchThread.bind(this);
  }

  handleSwitchThread(conversationId) {
    this.setState((prevThreads) => {
      const newThread = window.prompt('Please enter a thread name', conversationId);
      const threads = { ...prevThreads };
      threads[newThread] = this.state.threads[conversationId];
      // delete threads[conversationId];
      delete threads[conversationId];
      return { threads };
    });
  }

  render() {
    const { threads } = this.state;
    return (
      <div id="threads">
        {Object.keys(threads).map((threadId) => (
          <ConversationThread
            key={threadId}
            conversationId={threadId}
            messages={threads[threadId]}
            handleSwitchThread={this.handleSwitchThread}
          />
        ))}
      </div>
    );
  }
}

export default MessageHistory;