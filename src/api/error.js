```javascript
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/error-messages', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the error message schema
const errorSchema = new mongoose.Schema({
  message: String,
  timestamp: Date
});

// Create the error message model
const ErrorModel = mongoose.model('Error', errorSchema);

// Set up CORS and helmet
app.use(cors());
app.use(helmet());

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set up JSON body parsing
app.use(express.json());

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Define the error messages endpoint
app.post('/error-messages', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).send({ message: 'Message is required' });
    }
    const sanitizedMessage = mongoSanitize(message);
    const error = new ErrorModel({ message: sanitizedMessage, timestamp: new Date() });
    await error.save();
    res.status(201).send({ message: 'Error message saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save error message' });
  }
});

// Define the get error messages endpoint
app.get('/error-messages', async (req, res) => {
  try {
    const errors = await ErrorModel.find().sort({ timestamp: -1 });
    res.status(200).send(errors);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to retrieve error messages' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```