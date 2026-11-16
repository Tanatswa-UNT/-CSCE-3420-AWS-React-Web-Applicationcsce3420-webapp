
import { useState } from "react";
import "./App.css";

const API_URL =
  "https://ownlb6scjir2ykyospuxdqtmpm0erqjw.lambda-url.us-east-2.on.aws/";

function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Retrieve records from DynamoDB
  const getMessages = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setMessage(data.message || "");
      setRecords(data.items || []);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve DynamoDB records.");
    } finally {
      setLoading(false);
    }
  };

  // Save a new message to DynamoDB
  const saveMessage = async () => {
    if (!newMessage.trim()) {
      setError("Please enter a message.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setSuccess(data.message || "Message saved successfully!");
      setNewMessage("");
      await getMessages();
      setSuccess("Message saved successfully!");
    } catch (err) {
      console.error(err);
      setError("Unable to save message to DynamoDB.");
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

      <h3>Amazon DynamoDB Integration</h3>

      <input
        type="text"
        placeholder="Enter a message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      <div>
        <button onClick={saveMessage} disabled={loading}>
          Save Message
        </button>

        <button onClick={getMessages} disabled={loading}>
          Retrieve Messages
        </button>
      </div>

      {loading && <p>Processing request...</p>}
      {message && <p>{message}</p>}
      {success && <p>{success}</p>}
      {error && <p role="alert">{error}</p>}

      <h3>Saved Messages</h3>

      {records.length === 0 ? (
        <p>No messages retrieved yet.</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={record.id?.S || record.id || index}>
              {record.message?.S || record.message || "No message"}
            </li>
          ))}
        </ul>
      )}

      <footer>
        University of North Texas | Fall 2026
      </footer>
    </div>
  );
}

export default App;
