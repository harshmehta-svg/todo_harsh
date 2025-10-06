// src/components/Thread.js

// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import Message from './Message';

// Define the Thread component
const Thread = ({ conversationId, messages }) => {
  // State to store the message history
  const [threadMessages, setThreadMessages] = useState(messages);

  // Update the message history state when the messages change
  useEffect(() => {
    setThreadMessages(messages);
  }, [messages]);

  // Render the message history
  const renderMessages = () => {
    return threadMessages.map((message, index) => (
      <Message
        key={index}
        content={message.content}
        author={message.author}
      />
    ));
  };

  // Render the thread component
  return (
    <section key={conversationId}>
      {/* Render message history */}
      <div className="message-history">{renderMessages()}</div>
    </section>
  );
};

// Export the Thread component
export default Thread;