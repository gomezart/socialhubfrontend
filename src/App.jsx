import { useState } from "react";
import { sendMessage } from "./api";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [scenario, setScenario] = useState("dating"); // Default scenario

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessages = [...messages, { sender: "You", text: message }];
        setMessages(newMessages);
        setMessage("");

        const data = await sendMessage(message, scenario);
        setMessages([...newMessages, { sender: "AI", text: data.response || "No response from AI." }]);
    };

    return (
        <div className="chat-container">
            <header className="chat-header">SocialSphereHub AI Chat</header>

            {/* Scenario Selection */}
            <div className="scenario-selector">
                <label>Choose a Scenario:</label>
                <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
                    <option value="dating">Dating</option>
                    <option value="networking">Networking</option>
                    <option value="confidence">Confidence</option>
                </select>
            </div>

            {/* Chat Messages */}
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble ${msg.sender === "You" ? "user" : "ai"}`}>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>

            {/* Input & Send Button */}
            <div className="chat-input-box">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say something..."
                    className="chat-input"
                />
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;



