import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();



// open ai llm

const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
})


// groq llm

const groq = new ChatGroq({
    modelName: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.5,
})





export { llm, groq };