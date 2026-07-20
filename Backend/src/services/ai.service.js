import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai"
import {HumanMessage,SystemMessage, AIMessage,ToolMessage} from "@langchain/core/messages"
import {createAgent, tool} from 'langchain'
import * as z from "zod";
import { SearchInternet } from "./ineternet.service.js";
import { response } from "express";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  modelName: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
})

const searchInternetTool = tool(SearchInternet, {
  name: "searchInternet",
  description: `
Search the web for factual information.

Use this tool whenever the answer depends on:
- today's news
- latest events
- current sports results
- elections
- weather
- stock prices
- cryptocurrency prices
- latest AI models
- recent software versions
- current company information
- anything after your knowledge cutoff

Always search first before answering these questions.

Do not answer from memory if the information could have changed.
`,
  schema: z.object({
    query: z.string().describe("A detailed search query.")
  })
});


export async function testAI() {
  // model.invoke("What is ML explain under 100 words?")
  // .then((response) => {
  //   console.log(response.text)
  // })
}

const llm = mistralModel.bindTools([
  searchInternetTool
])


export async function generateResponse(messages) {
    try {
        const systemPrompt = new SystemMessage(`
You are ChatGPT.
...
`);

        const formattedMessages = messages.map((msg) => {
            switch (msg.role) {
                case "user":
                    return new HumanMessage(msg.content || "");

                case "assistant":
                    return new AIMessage(msg.content || "");

                case "system":
                    return new SystemMessage(msg.content || "");

                default:
                    return new HumanMessage(msg.content || "");
            }
        });

        const response = await llm.invoke([
            systemPrompt,
            ...formattedMessages,
        ]);

        if (!response.tool_calls || response.tool_calls.length === 0) {
            if (typeof response.content === "string")
                return response.content;

            return response.content
                .map((x) => x.text || "")
                .join("\n");
        }

        const toolMessages = [];

        for (const toolCall of response.tool_calls) {
            try {
                const toolResult = await SearchInternet(toolCall.args);

                toolMessages.push(
                    new ToolMessage({
                        tool_call_id: toolCall.id,
                        content: toolResult,
                    })
                );
            } catch {
                toolMessages.push(
                    new ToolMessage({
                        tool_call_id: toolCall.id,
                        content: "Search failed.",
                    })
                );
            }
        }

        const finalResponse = await llm.invoke([
            systemPrompt,
            ...formattedMessages,
            response,
            ...toolMessages,
        ]);

        if (typeof finalResponse.content === "string")
            return finalResponse.content;

        return finalResponse.content
            .map((x) => x.text || "")
            .join("\n");

    } catch (err) {
        console.error("AI ERROR");
        console.error(err);
        throw err;
    }
}

export async function generateChatTitle(message){
  const response = await mistralModel.invoke([
      new SystemMessage(`You are helpful assistant that generats concise and descriptive titles for the chat conversations. 
      
      User will provide you with the first message of a chat converation, and you wil generate a title that captures the essence of the conversaton in 3-5 words. The title should be clear, relevant , and engaging, giving users a quick understanding of the chat's topic
      `),
      new HumanMessage(`
        Generate a title for a chat conversation based on the following message:
        ${message}
        `),

  ])

  return response.text

}