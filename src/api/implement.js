```javascript
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';
import { UserRepository } from './repositories/UserRepository';
import { UserDTO } from './dto/UserDTO';
import { ValidationError } from './errors/ValidationError';
import { AuthenticationError } from './errors/AuthenticationError';

const app = express();
app.use(express.json());

const userRepository = new UserRepository();

interface AuthRequest extends Request {
  userId: string;
}

app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ValidationError('Username and password are required');
    }

    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new ValidationError('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDTO = new UserDTO({ username, password: hashedPassword });
    const user = await userRepository.create(userDTO);

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ValidationError('Username and password are required');
    }

    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new AuthenticationError('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ error: error.message });
  }
});

app.use(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new AuthenticationError('Token is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ error: error.message });
  }
});

app.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const users = await userRepository.findAll();
    res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  res.status(500).json({ error: error.message });
});

app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
```