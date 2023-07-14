import { useState } from "react"

function RegisterForm({ onSubmit }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <form onSubmit={handleSubmit} className="w-64">
      <div className="mb-4">
        <label htmlFor="username" className="text-white">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="border border-gray-300 bg-gray-100 text-black rounded px-2 py-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="text-white">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 bg-gray-100 text-black rounded px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  )
}

export default RegisterForm
