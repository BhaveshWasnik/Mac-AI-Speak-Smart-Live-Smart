import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // to load .env variables

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = `You are a virtual assistant named ${assistantName}, created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input>" (remove your name if mentioned),
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": the sentence the user spoke.
- "response": a short, voice-friendly reply like "Sure, playing it now" or "Here’s what I found."

Type meanings:
- "general": if it's an informational question or fact-based.
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a song/video.
- "calculator-open": if user wants to open calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user wants to know the weather.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} if someone asks who created you.
- Respond **only** with the JSON object, nothing else.

Now your userInput: ${command}
`;

  
    const result=await axios.post(`${apiUrl}?key=${apiKey}`,{
    "contents": [{
    "parts":[{"text": prompt}]
    }]
    })
return result.data.candidates[0].content.parts[0].text
} catch (error) {
    console.log(error)
}
}

export default geminiResponse