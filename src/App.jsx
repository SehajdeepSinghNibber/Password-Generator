import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // ref for input field
  const copyRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+"
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed])

  const copyPasswordToClipboard = useCallback(() => {
  window.navigator.clipboard.writeText(password)
}, [password])


  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, characterAllowed, generatePassword])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md shadow-md rounded-lg px-4 py-5 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-2xl font-semibold mb-4">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white text-gray-800">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Your password"
            ref={copyRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 text-white px-4 hover:bg-orange-600 hover:opacity-60 active:opacity-80"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <label className="text-white">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-white">Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white">Special Characters</label>
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(prev => !prev)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
