import { llm } from "./llm.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

// Define the calculator tool with correct format
const calculatorTool = {
    type: "function",
    function: {  // Wrapped in function property
        name: "calculator",
        description: "Perform basic math calculations",
        parameters: {
            type: "object",
            properties: {
                a: {
                    type: "number",
                    description: "First number"
                },
                b: {
                    type: "number",
                    description: "Second number"
                },
                operation: {
                    type: "string",
                    enum: ["+", "-", "*", "/"],
                    description: "Mathematical operation to perform"
                }
            },
            required: ["a", "b", "operation"]
        }
    },
    // Keep the implementation separate
    invoke: async ({ a, b, operation }) => {
        switch (operation) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: throw new Error("Invalid operation");
        }
    }
};

// Create tools array
const tools = [calculatorTool];

// Bind tools to the LLM
const llmWithTools = llm.bind({ tools });

// Example usage
async function testCalculatorCalling() {
    try {
        const result = await llmWithTools.invoke([
            new SystemMessage("You are a helpful math assistant. Use the calculator tool when needed."),
            new HumanMessage("What is 25 minus 15?")
        ]);
        console.log("Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

// testCalculatorCalling();


export { calculatorTool, testCalculatorCalling };