import { useState } from "react"
import { Button, Input } from "../../components/ui"

function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(email, username, password)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col h-[65%] justify-between"
    >
      <div className="flex flex-col gap-3">
      <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          icon="email-icon"
          onChange={handleEmailChange}
        />
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
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
