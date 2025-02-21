import { Annotation, StateGraph } from "@langchain/langgraph";   
import { client } from "./langsmithClient.js";


const weatherSchema = Annotation.Root({
    temperature: Annotation,
    condition: Annotation,
    activity: Annotation
})
// Nodes// replace it weather api
const checkWeather = async (state) => {
    return {
        temperature: 70,
        condition: "sunny",
    }
}

const recommendOutdoorActivity = async (state) => {
    return {
        activity: "Go for a hike! It's perfect weather!"
    };
};

const recommendIndoorActivity = async (state) => {
    return {
        activity: "Visit a museum, it's not great weather outside."
    };
};


const decideActivity = async (state) => {
    if (state.condition === "sunny" && 
        state.temperature >= 60 && 
        state.temperature <= 80) {
        return "outdoor";
    } else {
        return "indoor";
    }
}

// Create graph with tracing enabled
const graph = new StateGraph({
    stateSchema: weatherSchema,
    client: client,
    project_name: "weather_activity_decision",
})
    .addNode("check_weather", checkWeather)
    .addNode("outdoor_activity", recommendOutdoorActivity)
    .addNode("indoor_activity", recommendIndoorActivity)
    .addEdge("__start__", "check_weather")
    .addConditionalEdges(
        "check_weather",    // Source node
        decideActivity,     // Decision function
        {
            outdoor: "outdoor_activity",
            indoor: "indoor_activity"
        }
    )
    .compile();


// Run the graph

async function runGraph() {
    try {
        const result = await graph.invoke({})
        console.log("Final State:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

export { runGraph };


//  -----------------------------><simple tool calling in graph 


// const simpleSchema = Annotation.Root({
//     // state management
//     name: Annotation,
//     greeting: Annotation
// })

// // First node: Takes name and  add Hello

// const addHello = async (state) => {
//     return {
//         greeting: `Hello ${state.name}`
//     }
// }

// // Second node: Adds "!"
// const addExclamation = async (state) => {
//     return {
//         greeting: state.greeting + "!"
//     };
// };

// // Create simple graph

// const graph = new StateGraph({
//     stateSchema: simpleSchema
// })
// .addNode("addHello", addHello)
// .addNode("addExclamation", addExclamation)
// .addEdge("__start__", "addHello")
// .addEdge("addHello", "addExclamation")
// .compile();


// // Run the graph 

// async function runGraph() {
//     const result = await graph.invoke({
//         name: "John"
//     });
//     console.log("Final State:", result);
// }

// runGraph();

