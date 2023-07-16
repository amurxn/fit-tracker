import { useState } from "react"
import { Button, Input } from "../../components/ui"

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(username, password)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col h-[65%] justify-between">
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          icon="username-icon"
          onChange={handleUsernameChange}
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          icon="password-icon"
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit" color="red">
        Log in
      </Button>
    </form>
  )
}

export default LoginForm
