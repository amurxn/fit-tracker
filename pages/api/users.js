import db from '../../config/db';

const getUsers = (req, res) => {
  db.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to MySQL:', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }

    const query = 'SELECT * FROM users';

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Server error' });
        return;
      }

      res.status(200).json({ data: results });
    });
  });
};

export default getUsers;
