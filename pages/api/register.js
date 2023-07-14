import db from '../../config/db';
import { promisify } from 'util';

const queryPromise = promisify(db.query).bind(db);

const registerUser = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Perform necessary validations on username and password

      // Insert the user data into the database
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      await queryPromise(query, [username, password]);

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
