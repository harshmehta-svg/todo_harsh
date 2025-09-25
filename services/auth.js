// import required modules
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const TokenBlacklist = require('express-jwt-blacklist');

// create a token blacklist instance
const blacklist = new TokenBlacklist();

// ... (rest of the file remains the same)

// Create an endpoint to handle password reset tokens
const passwordResetEndpoint = express.Router();

passwordResetEndpoint.post('/passwordReset', async (req, res, next) => {
  const { email, password } = req.body;
  // Check if the user exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid password reset token or user does not exist.' });
  }

  // Generate a password reset token
  const resetToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

  // Send the password reset email
  const mailOptions = {
    from: 'your-email@example.com',
    to: user.email,
    subject: 'Password Reset Request',
    text: `Your password reset token is: ${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Password reset token sent successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send password reset email.' });
  }
});

passwordResetEndpoint.put('/resetPassword', async (req, res, next) => {
  const { token, newPassword } = req.body;

  // Verify the password reset token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid password reset token.' });
    }

    const userId = decoded.id;

    // Update the user's password in the database
    User.findByIdAndUpdate(userId, { password: newPassword }, { new: true }, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to update password.' });
      }

      return res.json({ message: 'Password updated successfully.' });
    });
  });
});

// Create a new endpoint to handle logout
app.post('/logout', (req, res, next) => {
  // Remove the JWT from the blacklist
  blacklist.add(req.headers.authorization);

  // Delete the JWT from the header
  req.cookies.delete('jwt');

  // Return the success message
  return res.json({ message: 'Successfully logged out.' });
});

// Add a function to check if a token is blacklisted before verifying it
const verifyToken = async (req, res, next) => {
  blacklist.isRevoked(req.headers.authorization, (err, revoked) => {
    if (err) {
      return res.status(500).json({ message: 'Token is blacklisted.' });
    }

    if (revoked) {
      return res.status(401).json({ message: 'Token is blacklisted.' });
    }

    // Verify the token as before
    jwt.verify(req.headers.authorization, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = decoded;
      next();
    });
  });
};

// Update the authenticate function to add the blacklist check
const authenticate = async (req, res, next) => {
  try {
    // Authenticate the user and generate a JWT
    const token = jwt.sign({ id: req.user.id }, secretKey, { expiresIn: '1h' });

    // Add the JWT to the blacklist
    blacklist.add(token);

    // Save the JWT as a cookie for future use
    req.cookies.set('jwt', token);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
};

// Add the middleware to verify the token
app.use(verifyToken);