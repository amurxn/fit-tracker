import db from "../../../../config/db"

import { promisify } from "util"
const queryPromise = promisify(db.query).bind(db)

const getExerciseByUser = (req, res) => {
  if (req.method === "GET") {
    handleGetRequest(req, res)
  } else if (req.method === "POST") {
    handlePostRequest(req, res)
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}

const handleGetRequest = (req, res) => {
  const { userId, exerciseId } = req.query

  db.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to MySQL:", error)
      res.status(500).json({ error: "Server error" })
      return
    }

    const query = `
      SELECT *
      FROM user_exercises
      WHERE user_id = ${userId} AND exercise_id = ${exerciseId}
      ORDER BY id DESC
      LIMIT 1;
    `;

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

const handlePostRequest = async (req, res) => {
  const { userId, exerciseId } = req.query
  const { sets, reps, weight } = req.body

  try {
    const insertQuery =
      "INSERT INTO user_exercises (user_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)"
    await queryPromise(insertQuery, [userId, exerciseId, sets, reps, weight])

    res.status(201).json({ message: "Data saved" })
  } catch (error) {
    console.error("Error saving data:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export default getExerciseByUser
