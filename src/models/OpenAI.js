// src/models/OpenAI.js

const { OpenAIApi } = require('openai');
const config = require('./config');

class OpenAI {
  constructor() {
    this.api = new OpenAIApi({
      apiKey: config.openaiApiKey,
      organization: config.openaiOrganization,
    });
  }

  async getResponse(prompt) {
    const response = await this.api.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.5,
      maxTokens: 100,
    });
    return response.data.completion;
  }
}

module.exports = OpenAI;

// NEW FILE CONTENT ENDS HERE