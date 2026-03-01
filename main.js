import { runDebate } from "./src/core/orchestrator.js";

const topic = Deno.args[0] || "Artificial intelligence will take most jobs";
await runDebate(topic, 2);
