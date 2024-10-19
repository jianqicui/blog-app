import { Dispatch, SetStateAction, useState } from 'react'
import { signIn } from 'next-auth/react'

type Props = {
  showLogin: boolean
  setShowLogin: Dispatch<SetStateAction<boolean>>
}

const Login = ({ showLogin, setShowLogin }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required')

      return
    }

    signIn('credentials', {
      redirect: false,
      username,
      password
    }).then(res => {
      if (res?.error) {
        setErrorMessage(res.error)
      } else {
        setErrorMessage('')

        setShowLogin(false)
      }
    })
  }

  return (
    <>
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded bg-white p-8 shadow-lg">
            <button
              className="absolute right-0 top-0 p-2"
              onClick={() => setShowLogin(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full rounded border p-2"
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
