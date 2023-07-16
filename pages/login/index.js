import { useState } from "react"
import { useRouter } from "next/router"
import LoginForm from "./LoginForm"
import Message from "../../components/Message"
import { Container } from "../../components/ui"

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
    router.push("/register")
  }

  return (
    <Container id="ft-login">
      <div className="flex flex-col w-full relative top-[5%] h-full pt-[50%]">
        <h1 className="text-5xl font-semibold relative text-center">Welcome</h1>
        <h2 className="text-base text-lightGray font-medium relative text-center py-5">Log in to your account</h2>
        <LoginForm onSubmit={handleFormSubmit} />
        <Message message={message} />
        <p className="text-sm text-lightGray mt-4 text-center">
        Don’t have an account?&nbsp;
          <span className="underline cursor-pointer text-white" onClick={handleRegisterClick}>
          Sign up
          </span>
        </p>
      </div>
    </Container>
  )
}

export default Login
