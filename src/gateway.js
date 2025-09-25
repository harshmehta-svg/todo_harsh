// Import required dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session');
const cookieSession = require('cookie-session');
const MySQLConnection = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20').Strategy;
const GitHubStrat = require('passport-github20').Strategy;

// Set up OAuth2
const OAuth2Server = require('oauth2-server');

// Load the authentication configuration
const authConfig = require('./config/auth.json');

// Create the MySQL connection
const createPool = async () => {
  return new MySQLConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
  });
};

// Set up database connection
const db = createPool();

// Define the API routes
const apiRoutes = express.Router();

// Create OAuth2 authorization server
const authorizeServer = new OAuth2Server({
  model: require('./models/users'),
  accessTokenLifetime: 3600,
});

// Google OAuth2 strategy
passport.use('google', new GoogleStrat({
  clientID: authConfig.google.clientID,
  clientSecret: authConfig.google.clientSecret,
  callbackURL: authConfig.google.callbackURL,
}, (accessToken, refreshToken, profile, cb) => {
  const user = { id: profile.id, email: profile.emails[0].value };
  return cb(null, user);
}));

// GitHub OAuth2 strategy
passport.use('github', new GitHubStrat({
  clientID: authConfig.github.clientID,
  clientSecret: authConfig.github.clientSecret,
  callbackURL: authConfig.github.callbackURL,
}, (accessToken, refreshToken, profile, cb) => {
  const user = { id: profile.id, email: profile.email };
  return cb(null, user);
}));

// Google login
apiRoutes.route('/google/login')
  .get(passport.authenticate('google'));

// GitHub login
apiRoutes.route('/github/login')
  .get(passport.authenticate('github'));

// Token exchange route
apiRoutes.route('/token')
  .post((req, res) => {
    const grant = req.body;
    authorizeServer.token(grant, (err, token) => {
      if (err) {
        return res.json(err.response);
      }
      return res.json(token);
    });
  });

// Express setup
const app = express();

// Enable cors
app.use(cors({
  origin: ['http://localhost:3000', 'https://api.example.com'], // Allow CORS from specific origins
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
}));

// Enable CSRF protection
const csrf = require('csurf');
const csrfProtection = csrf({
  cookie: {
    maxAge: 31540000, // Cookies that are valid for longer than 1 year should be secured with HTTPS
    httpOnly: true, // The cookie should be inaccessible to JavaScript so it won't be accessible through a XSS
    secure: true, // Cookie should only be transmitted over HTTPS
    sameSite: true, // Prevent the browser from sending the cookie along with cross-site requests
    maxAge: 15 * 24 * 60 * 60 * 1000 // The cookie expiration
  }
});

// Define CSRF protected routes
app.use((req, res, next) => {
  csrfProtection(req, res, (csrfErr) => {
    if (csrfErr) {
      res.status(403).json({ message: 'Invalid CSRF token!' });
    } else {
      next();
    }
  });
});

// Parse cookies
app.use(cookieParser());

// Use sessions
app.use(cookieSession({
  secret: 'keyboard cat',
  maxAge: 10 * 60 * 1000,
  key: 'sessionID',
}));

// MySQL session store
const sessionStore = new MySQLStore(
  {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
  },
  session,
);

app.use(sessionStore);

// Passport initialization
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return cb(err);
    }
    cb(null, results[0]);
  });
});

// JWT secret key
const jwtSecretKey = process.env.JWT_SECRET;

// Set up rate limiting (using Limiter library)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

// Set up helmet
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "https://*.githubusercontent.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://ajax.googleapis.com"],
      frameSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
      formAction: ["'self'", "https://*.github.com"],
      objectSrc: ["'self'", "https://cdn.jsdelivr.net"],
      upgradeInsecureRequests: [],
      baseUri: [],
    },
  },
  crossOriginResourcePolicy: {
    policy: "same-origin",
  },
  crossDomainScriptSrc: true,
  hidePoweredBy: false,
  hpke: {
    params: {
      keyExchangeAlgorithm: "ECDH",
      encryptionAlgorithm: "AES-128-ECB",
      keyExchangeParams: {
        namedCurve: "P-256",
      },
    },
  },
});

// Protect routes from CSRF
const csrfProtected = (...routes) => {
  return (req, res, next) => {
    csrfProtection(req, res, (csrfErr) => {
      if (csrfErr) {
        res.status(403).json({ message: 'Invalid CSRF token!' });
      } else {
        routes.forEach(route => route(req, res, next));
      }
    });
  };
};

// Protect routes using rate limiting
const rateLimited = (func) => {
  return (req, res, next) => {
    if (limiter.getMemoryStore(req).count > limiter.getMemoryStore(req).max) {
      return res.status(429).json({ message: 'Too many requests!' });
    }
    limiter.limit(req, res, next);
  };
};

// API Gateway
const apiGateway = express.Router();

// Define routes
const route = (endpoint, method, handler) => {
  apiGateway[method.toLowerCase()](endpoint, csrfProtected(handler));
};

// Define route prefixes
const prefix = (prefix) => {
  return route('/api/:prefix', 'get', (req, res) => {
    res.json({
      prefix,
    });
  });
};

// Define API routes
route('/me', 'get', rateLimited((req, res, next) => {
  const token = req.cookies.access_token;

  // Validate token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  // Verify token expiration
  const expiresAt = jwt.decode(token).expiresAt;
  if (expiresAt < Date.now()) {
    return res.status(401).json({ message: 'Token has expired!' });
  }

  // Fetch user from database
  const userId = jwt.decode(token).sub;
  db.query('SELECT * FROM users WHERE id = ?', [userId])
    .then(results => {
      if (results.length === 0) {
        return res.status(401).json({ message: 'User not found!' });
      }

      // Set user in request context
      req.user = results[0];

      // Proceed to the next middleware
      next();
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error!' });
    });
}));

prefix('auth');

// Express setup
app.use('/api', apiGateway);

// Enable helmet
app.use(helmet);

// Express setup
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});