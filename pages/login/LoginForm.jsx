import { useState } from "react"
import { Button, Input } from "../../components/ui"

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          icon="username-icon"
        />
        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 bg-gray-100 text-black rounded px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <Button type="submit" color="red">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
