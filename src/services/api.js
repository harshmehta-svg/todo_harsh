// New file

// Import the dependencies
const axios = require('axios');

// Define a base API URL
const API_URL = 'https://api.example.com';

// Define a base API version
const API_VERSION = 'v1';

// Define an API endpoint prefix
const API_PREFIX = `${API_URL}/${API_VERSION}/conversations`;

// Define a function to generate the API URL for a single conversation
const getConversationUrl = (conversationId) => `${API_PREFIX}/${conversationId}`;

// Define a function to generate the API URL for a conversation thread
const getConversationThreadUrl = (conversationId, threadId) => `${getConversationUrl(conversationId)}/threads/${threadId}`;

// Define a function to fetch a conversation
const fetchConversation = async (conversationId) => {
  try {
    const response = await axios.get(getConversationUrl(conversationId));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch conversation ${conversationId}: ${error.message}`);
  }
};

// Define a function to fetch a conversation thread
const fetchConversationThread = async (conversationId, threadId) => {
  try {
    const response = await axios.get(getConversationThreadUrl(conversationId, threadId));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch conversation thread ${threadId} for conversation ${conversationId}: ${error.message}`);
  }
};

// Define a function to create a new conversation thread
const createConversationThread = async (conversationId, data) => {
  try {
    const response = await axios.post(getConversationThreadUrl(conversationId, null), data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create new conversation thread for conversation ${conversationId}: ${error.message}`);
  }
};

// Define a function to add a message to a conversation thread
const addMessageToConversationThread = async (conversationId, threadId, data) => {
  try {
    const response = await axios.post(getConversationThreadUrl(conversationId, threadId), data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add message to conversation thread ${threadId} for conversation ${conversationId}: ${error.message}`);
  }
};

// Export the API services
module.exports = {
  // Define a service for fetching conversations
  getConversation: fetchConversation,

  // Define a service for fetching conversation threads
  getConversationThread: fetchConversationThread,

  // Define a service for creating new conversation threads
  createConversationThread,

  // Define a service for adding messages to conversation threads
  addMessageToConversationThread,
};