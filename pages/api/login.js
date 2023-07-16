import { withSessionRoute } from "../../config/withSession"
import db from "../../config/db"
import util from "util"
import bcrypt from "bcrypt"

const queryPromise = util.promisify(db.query).bind(db)

export default withSessionRoute(createSessionRoute)

async function createSessionRoute(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body

    try {
      // Check if the user exists
      const query = "SELECT * FROM users WHERE username = ?"
      const rows = await queryPromise(query, [username])

      if (rows.length === 0) {
        res.status(401).json({ error: "Invalid credentials" })
        return
      }

      const user = rows[0]

      // Compare the entered password with the stored hashed password
      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        res.status(401).json({ error: "Invalid credentials" })
        return
      }

      req.session.user = {
        username: username,
      }
      await req.session.save()

      res.status(200).json({ message: "Login successful" })
    } catch (error) {
      console.error("Error during login:", error)
      res.status(500).json({ error: "Server error" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
