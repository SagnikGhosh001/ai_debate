import { CON_PROMPT } from "../prompts/con_prompt.js";
import { JUDGE_PROMPT } from "../prompts/judge_prompt.js";
import { PRO_PROMPT } from "../prompts/pro_prompt.js";
import { callLLM } from "./llm.js";

const createMessage = (topic, transcript, prompt) => [
  { role: "system", content: prompt },
  {
    role: "user",
    content: `
Debate Topic: ${topic}

Debate So Far:
${transcript.map((t) => `${t.speaker}: ${t.content}`).join("\n")}

Your turn:
`,
  },
];

const getReply = async (topic, transcript, prompt) => {
  const messages = createMessage(topic, transcript, prompt);
  const reply = await callLLM(messages);
  return reply;
};

export const runDebate = async (topic, total_rounds) => {
  const transcript = [];

  console.log(`\nTopic: ${topic}\n`);
  for (let round = 1; round <= total_rounds; round++) {
    console.log(`\n========== ROUND ${round} ==========\n`);

    const proReply = await getReply(topic, transcript, PRO_PROMPT);
    transcript.push({ speaker: "PRO", content: proReply });
    console.log("PRO:\n", proReply);

    const conReply = await getReply(topic, transcript, CON_PROMPT);
    transcript.push({ speaker: "CON", content: conReply });
    console.log("\nCON:\n", conReply);
  }

  const judgeReply = await getReply(topic, transcript, JUDGE_PROMPT);
  console.log("\nJUDGE:\n", judgeReply);
};
