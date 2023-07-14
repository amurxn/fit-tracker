import { useState } from "react"
import { useRouter } from "next/router"
import LoginForm from "./LoginForm"
import Message from "../../components/Message"
import { Container, Button } from "../../components/ui"

function Login() {
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleFormSubmit = async (username, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
        router.push("/")
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error during login:", error)
      setMessage("An error occurred during login.")
    }
  }

  const handleRegisterClick = () => {
    router.push("/register") // Redirect to register page
  }

  return (
    <Container id="ft-login">
      <div className="flex flex-col h-full justify-between py-12">
        <h1 className="text-6xl font-semibold relative">Welcome back</h1>
        <h2 className="text-3xl font-semibold relative">Login to your account</h2>
        <LoginForm onSubmit={handleFormSubmit} />
        <Message message={message} />
        <p className="text-white mt-4">
          <span className="underline cursor-pointer" onClick={handleRegisterClick}>
            Register here
          </span>
        </p>
      </div>
    </Container>
  )
}

export default Login
