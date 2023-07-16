import db from '../../config/db';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

const queryPromise = promisify(db.query).bind(db);

const registerUser = async (req, res) => {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      // Check if email already exists
      const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
      const existingEmailUser = await queryPromise(emailCheckQuery, [email]);

      if (existingEmailUser.length > 0) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }

      // Check if username already exists
      const usernameCheckQuery = 'SELECT * FROM users WHERE username = ?';
      const existingUsernameUser = await queryPromise(usernameCheckQuery, [username]);

      if (existingUsernameUser.length > 0) {
        res.status(400).json({ error: 'Username already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
      await queryPromise(insertQuery, [email, username, hashedPassword]);

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default registerUser;

