// ./app/page.js
"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import { api } from "@/trpc/react";
import Markdown from "react-markdown";

export default function Chat({ userId }: { userId: string }) {
  const user = api.user.fetch.useQuery({
    userId: userId,
  });
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "0",
        role: "assistant",
        content: `How can i assist you in finding the perfect project for you?`,
      },
    ],
  });

  return (
    <div
      className={`flex min-h-[85dvh] flex-col rounded-xl border border-base-content/25 p-8`}
    >
      <div
        className={`h-[70dvh] flex-grow space-y-4 overflow-y-scroll text-sm`}
      >
        {messages.map((m) => (
          <div key={m.id}>
            {/*{m.role}: {m.content}*/}
            {m.role === "user" ? (
              <div className="chat chat-end">
                <div className="chat-bubble">
                  <Markdown>{m.content}</Markdown>
                </div>
                <Image
                  src={
                    user.data && user.data.image
                      ? user.data.image
                      : "/default-pfp.jpg"
                  }
                  alt={`user icon`}
                  width={40}
                  height={40}
                  className={`rounded-full border border-accent  bg-base-100`}
                />
              </div>
            ) : (
              <div className="chat chat-start">
                <Image
                  src={`/logo.png`}
                  alt={`bot icon`}
                  width={40}
                  height={40}
                  className={`rounded-full border border-accent  bg-base-100`}
                />
                <div className="chat-bubble"><Markdown>{m.content}</Markdown></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className={`input input-bordered input-md mt-6 w-full`}
          value={input}
          placeholder="Ask your query..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}