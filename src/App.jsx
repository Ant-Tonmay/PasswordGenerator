import { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null)
  const copyPasstoClipboard= ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  const passwordGenerator = useCallback(() => {
    let passw = '';
    let st = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllow) st += '0123456789';
    if (charAllow) st += '!@#$%^&(){}[]';

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * st.length);
      passw += st.charAt(charIndex);
    }
    setPassword(passw);
  }, [length, numberAllow, charAllow]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">Password Generator</h1>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="flex-grow p-2 border border-gray-700 rounded-lg bg-gray-700 text-lg text-orange-500"
          />
          <button
            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={copyPasstoClipboard}
          >
            Copy
          </button>
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2 text-orange-500">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mb-6">
          <label className="flex items-center space-x-2 text-orange-500">
            <input
              type="checkbox"
              checked={numberAllow}
              onChange={() => setNumberAllow((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-orange-500 bg-gray-700 border-gray-600"
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2 text-orange-500">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-orange-500 bg-gray-700 border-gray-600"
            />
            <span>Include Special Characters</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
