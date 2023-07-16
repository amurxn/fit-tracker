import { useState } from "react"
import { useRouter } from "next/router"
import RegisterForm from "./RegisterForm"
import Message from "../../components/Message"
import { Container } from "../../components/ui"

function Register() {
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleFormSubmit = async (email, username, password) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
        router.push("/login")
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setMessage("An error occurred during registration.") // Generic error message
    }
  }

  const handleLoginClick = () => {
    router.push("/login")
  }
 
  return (
    <Container id="ft-login">
      <div className="flex flex-col w-full relative top-[5%] h-full pt-[50%]">
        <h1 className="text-5xl font-semibold relative text-center">Register</h1>
        <h2 className="text-base text-lightGray font-medium relative text-center py-5">Create your new account</h2>
        <RegisterForm onSubmit={handleFormSubmit} />
        <Message message={message} />
        <p className="text-sm text-lightGray mt-4 text-center">
        Already have an account?&nbsp;
          <span className="underline cursor-pointer text-white" onClick={handleLoginClick}>
          Log in
          </span>
        </p>
      </div>
    </Container>
  )
}

export default Register
