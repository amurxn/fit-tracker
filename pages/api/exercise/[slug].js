import db from "../../../config/db";

export default function handler(req, res) {
  const { slug } = req.query;

  db.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to MySQL:", error);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const query = `
      SELECT e.id AS exercise_id, e.name AS exercise_name, e.image AS exercise_image,
            e.video AS exercise_video, c.id AS category_id, c.name AS category_name
      FROM exercises AS e
      JOIN categories AS c ON e.category = c.id
      WHERE e.image = ?
    `;

    connection.query(query, [slug], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: "Server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }

      res.status(200).json({ data: results[0] });
    });
  });
}

