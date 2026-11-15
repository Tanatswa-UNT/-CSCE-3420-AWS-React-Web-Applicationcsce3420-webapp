
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <h1>CSCE 3420 Web Application</h1>
      <h2>Tanatswa Gwaze</h2>

      <p>
        Welcome to my AWS Cloud Web Application!
      </p>

      <p>
        Built using React, AWS Amplify,
        AWS Lambda, and Amazon DynamoDB.
      </p>

      <button onClick={() => setCount(count + 1)}>
        Click Me: {count}
      </button>

      <p className="footer">
        University of North Texas | Fall 2026
      </p>
    </main>
  )
}

export default App
