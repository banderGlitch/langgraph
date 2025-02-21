import { Client } from "langsmith";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    apiKey: process.env.LANGCHAIN_API_KEY,
    tracing_v2: true,
    endpoint: process.env.LANGCHAIN_ENDPOINT,
})

export { client };
