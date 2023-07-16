import db from "../../config/db"

const getExercises = (req, res) => {
  db.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to MySQL:", error)
      res.status(500).json({ error: "Server error" })
      return
    }

    const query = `
      SELECT e.id AS exercise_id, e.name AS exercise_name, e.image AS exercise_image,
            e.video AS exercise_video, c.id AS category_id, c.name AS category_name
      FROM exercises AS e
      JOIN categories AS c ON e.category = c.id
    `

    connection.query(query, (error, results) => {
      connection.release()

      if (error) {
        console.error("Error executing MySQL query:", error)
        res.status(500).json({ error: "Server error" })
        return
      }

      res.status(200).json({ data: results })
    })
  })
}

export default getExercises
