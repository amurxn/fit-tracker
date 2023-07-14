import { useState } from "react"
import RegisterForm from "./RegisterForm"
import Message from "../../components/Message"

function Register() {
  const [message, setMessage] = useState("")

  const handleFormSubmit = async (username, password) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setMessage("An error occurred during registration.") // Generic error message
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-white text-2xl font-bold mb-4">Register</h1>
      <RegisterForm onSubmit={handleFormSubmit} />
      <Message message={message} />
    </main>
  )
}

export default Register
