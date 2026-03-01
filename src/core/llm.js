import { OLLAMA_URL } from "../constants/constant.js";

export const callLLM = async (messages) => {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      messages,
      model: "llama3.1:latest",
      stream: false,
    }),
  });

  const data = await res.json();
  return data.message.content;
};
