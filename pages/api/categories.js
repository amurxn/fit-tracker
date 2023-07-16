import db from "../../config/db"

const getCategories = (req, res) => {
  db.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to MySQL:", error)
      res.status(500).json({ error: "Server error" })
      return
    }

    const query = `SELECT id, name, icon FROM categories;`

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

export default getCategories
