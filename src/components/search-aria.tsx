"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Mic, Paperclip, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useChat } from "@/providers/ChatContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SearchAriaProps = {
  onMessage: (message: Message) => void;
  onAssistantUpdate: (content: string) => void;
  onLoading: (loading: boolean) => void;
  className?: string;
};

const SearchAria: FC<SearchAriaProps> = ({
  onMessage,
  onAssistantUpdate,
  onLoading,
  className,
}) => {
  const router = useRouter();
  const { currentChatId, setCurrentChatId, refreshChats } = useChat();
  const [input, setInput] = useState<string | "">("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    onMessage({ role: "user", content: input });

    setInput("");
    try {
      onLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: currentChatId, input }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      if (!res.body) throw new Error("Response body is empty");

      const responseChatId = res.headers.get("X-Chat-Id");
      if (!responseChatId) throw new Error("Chat ID was not returned");

      setCurrentChatId(responseChatId);

      // Stream start ===
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        assistantContent += chunk;

        onAssistantUpdate(assistantContent);

        onLoading(false);
      }

      const remaining = decoder.decode();

      if (remaining) {
        assistantContent += remaining;
        onAssistantUpdate(assistantContent);
      }

      refreshChats();
      if (!currentChatId) router.replace(`/chat/${responseChatId}`);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      onLoading(false);
    }
  };
  return (
    <div
      className={cn(
        "w-full p-5 rounded-2xl border bg-accent space-y-2.5",
        className,
      )}
    >
      <textarea
        rows={1}
        placeholder="Ask Anything"
        className="w-full resize-none border-none outline-none text-18"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <button
            disabled
            className="disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <Paperclip size={20} />
          </button>
          <button className="p-2 px-4 border-2 rounded-full cursor-pointer">
            Deep Research
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button
            disabled
            className="disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <Mic />
          </button>
          <button
            disabled={!input.trim()}
            className="p-2 bg-blue-600 rounded-full cursor-pointer disabled:bg-blue-600/25 disabled:cursor-not-allowed"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAria;
