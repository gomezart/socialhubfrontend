export async function sendMessage(message, scenario = "dating") {
    try {
        const response = await fetch("https://socialhubbackend-fiz9.onrender.com/chat", { // Updated URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, scenario }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("🔴 Server error:", errorData);
            throw new Error(`Server error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("🟢 AI Response:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching AI response:", error);
        return { response: "Error connecting to AI." };
    }
}



