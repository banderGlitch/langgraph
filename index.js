import { Annotation, StateGraph } from "@langchain/langgraph";


const simpleSchema = Annotation.Root({
    name: Annotation,
    greeting: Annotation
})

// First node: Takes name and  add Hello

const addHello = async (state) => {
    return {
        greeting: `Hello ${state.name}`
    }
}

// Second node: Adds "!"
const addExclamation = async (state) => {
    return {
        greeting: state.greeting + "!"
    };
};

// Create simple graph

const graph = new StateGraph({
    stateSchema: simpleSchema
})
.addNode("addHello", addHello)
.addNode("addExclamation", addExclamation)
.addEdge("__start__", "addHello")
.addEdge("addHello", "addExclamation")
.compile();


// Run the graph 

async function runGraph() {
    const result = await graph.invoke({
        name: "John"
    });
    console.log("Final State:", result);
}

runGraph();
