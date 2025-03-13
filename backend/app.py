import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# ✅ Allow all origins, methods, and headers
CORS(app, resources={r"/chat": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# ✅ Explicitly handle preflight OPTIONS request
@app.route("/chat", methods=["OPTIONS"])
def chat_options():
    response = jsonify({"message": "CORS preflight successful"})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    scenario = data.get("scenario")

    if not message or not scenario:
        return jsonify({"error": "Message and scenario are required."}), 400

    system_prompts = {
        "dating": "You are a world-class AI dating coach...",
        "networking": "You are a top networking expert...",
        "confidence": "You are a confidence-building expert..."
    }

    system_prompt = system_prompts.get(scenario, "You are an AI assistant providing expert advice.")

    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )

        ai_response = response.choices[0].message.content
        return jsonify({"response": ai_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
