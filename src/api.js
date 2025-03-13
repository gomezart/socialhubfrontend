const API_URL = "https://mysocialcoach-api.onrender.com"; // Replace with your actual backend URL

export async function sendMessage(message, scenario) {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, scenario }) // Sending both message & scenario
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return { response: "Error connecting to AI." };
    }
}


