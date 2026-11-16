
import { useState } from "react";
import "./App.css";

const API_URL =
  "https://ownlb6scjir2ykyospuxdqtmpm0erqjw.lambda-url.us-east-2.on.aws/";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callLambda = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to AWS Lambda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>CSCE 3420 Web Application</h1>
      <h2>Tanatswa Gwaze</h2>

      <p>Welcome to my AWS Cloud Web Application!</p>
      <p>
        Built using React, AWS Amplify, AWS Lambda,
        and Amazon DynamoDB.
      </p>

      <button onClick={callLambda} disabled={loading}>
        {loading ? "Connecting..." : "Call AWS Lambda"}
      </button>

      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}

      <footer>
        University of North Texas | Fall 2026
      </footer>
    </div>
  );
}

export default App;
