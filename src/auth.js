// Import dependencies
const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { v4: uuidv4 } = require('uuid');
const mysql2 = require("mysql2");
const User = require('./models/User'); // Import User model

// Set up database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth_db',
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
});

// Initialize passport strategies
passport.use(new GoogleStrategy({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ where: { googleId: profile.id } }, (err, user) => {
    if (err) { return cb(err); }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      googleId: profile.id,
    });
    newUser.save((err) => {
      if (err) { return cb(err); }
      return cb(null, newUser);
    });
  });
}));

passport.use(new GitHubStrategy({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: '/auth/github/callback',
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ where: { githubId: profile.id } }, (err, user) => {
    if (err) { return cb(err); }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User({
      name: profile.login,
      email: profile.email,
      avatar: profile.avatar_url,
      githubId: profile.id,
    });
    newUser.save((err) => {
      if (err) { return cb(err); }
      return cb(null, newUser);
    });
  });
}));

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://example.com/oauth2/authorize',
  tokenURL: 'https://example.com/oauth2/token',
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: '/auth/authorize/callback',
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ where: { oauthId: profile.id } }, (err, user) => {
    if (err) { return cb(err); }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User({
      name: profile.name,
      email: profile.email,
      oauthId: profile.id,
    });
    newUser.save((err) => {
      if (err) { return cb(err); }
      return cb(null, newUser);
    });
  });
}));

// Initialize express app
const app = express();

// Set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(csrf({ cookie: true }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Set up passport session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Set up passport authentication
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user', 'repo'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/auth/authorize',
  passport.authorize('oauth2',
    { scope: ['read'] },
    (req, res) => {
      res.redirect('/');
    }));

app.get('/auth/authorize/callback',
  passport.authorize('oauth2',
    { scope: ['read'] },
    (req, res) => {
      res.redirect('/');
    }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          res.status(401).send({ message: 'Invalid email or password' });
        } else {
          const token = JWT.sign({
            userId: user._id,
            email: user.email,
          }, 'secret-key');
          res.send({ token });
        }
      });
    }
  });
});

app.get('/user', (req, res) => {
  if (!req.user) {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    res.send({ userId: req.user._id, email: req.user.email });
  }
});

// Social Login routes
app.get('/auth/login/google', (req, res) => {
  const token = uuidv4();
  res.redirect(`https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:3000/auth/google/callback&state=${token}`);
});

app.get('/auth/login/github', (req, res) => {
  const token = uuidv4();
  res.redirect(`https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/github/callback&scope=repo&state=${token}`);
});

app.get('/auth/social/login', (req, res) => {
  const token = req.query.token;
  if (token) {
    User.findOne({ $or: [{ googleId: token }, { githubId: token }] }, (err, user) => {
      if (err || !user) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        const token = JWT.sign({
          userId: user._id,
          email: user.email,
        }, 'secret-key');
        res.send({ token });
      }
    });
  } else {
    res.status(401).send({ message: 'Invalid token' });
  }
});

// Serve static files
app.use(express.static('public'));

// Catch-all route for API documentation
app.get('/api/*', (req, res) => {
  res.sendFile('api-documentation.html', { root: 'public' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;