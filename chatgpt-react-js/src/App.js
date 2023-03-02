import { useState } from "react";
import CGLogo from "./chatGPT.png";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`http://localhost:5000/chat/${prompt}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log("Print res:", data);
    setResponse(data.message);
    setLoading(false);
  };

  // function arrangeData() {
  //   return response.replace(/\n/g, "<br />");
  // }

  return (
    <div className="wrapper">
      <img
        src={CGLogo}
        alt=""
        className={loading ? "cg-logo loading" : "cg-logo"}
      />
      <h4>How may I assist you today?</h4>
      <div className="bgGradient" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <button type="submit">Go</button>
      </form>
      <p className="response-area">
        {loading
          ? "Generating response..."
          : response
            // <div dangerouslySetInnerHTML={{ __html: arrangeData() }} />
        }
      </p>
    </div>
  );
}

export default App;
