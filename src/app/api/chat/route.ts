// ./app/api/chat/route.js
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env";
import { type NextRequest } from "next/server";
import { type ChatCompletionFunctions } from "openai-edge";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const functions: ChatCompletionFunctions[] = [
  {
    name: "suggest_project",
    description:
      "Suggest a few of the projects to user and ask them to pick one to further describe. Wrap the suggest projects in links to the project page with the url being /projects/:id",
    parameters: {
      type: "object",
      properties: {
        projects: {
          type: "array",
          items: {
            type: "string",
          },
        },
        limit: {
          type: "number",
        },
      },
    },
  },
  {
    name: "describe_project",
    description: "Briefly describe the project to the user.",
    parameters: {
      type: "object",
      properties: {
        project: {
          type: "string",
        },
      },
    },
  },
];

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages, projects } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    messages,
    functions,
  });
  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name },
      createFunctionCallMessages,
    ) => {
      if (name === "suggest_project") {
        const newMessages = createFunctionCallMessages(projects);
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-4-1106-preview",
          functions,
        });
      }

      if (name === "describe_project") {
        const newMessages = createFunctionCallMessages(projects);
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-4-1106-preview",
          functions,
        });
      }
    },
  });
  return new StreamingTextResponse(stream);
}
