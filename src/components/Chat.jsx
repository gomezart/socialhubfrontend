import React, { useState } from "react";
import { sendMessage } from "../api";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Don't send empty messages
        setLoading(true);
        
        const aiResponse = await sendMessage(message);
        
        setResponse(aiResponse);
        setMessage(""); // Clear input field
        setLoading(false);
    };

    return (
        <div>
            <h2>SocialSphereHub AI Chat</h2>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
            {response && <p><strong>AI Response:</strong> {response}</p>}
        </div>
    );
};

export default Chat;
