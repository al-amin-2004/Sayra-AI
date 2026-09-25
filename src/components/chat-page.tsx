"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/providers/ChatContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import SearchAria from "./search-aria";
import MarkdownRenderer from "./chat-plate-style";
import ChatLoading from "./ui/chat-loading";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatIdProps = {
  chatId?: string;
};

const ChatPage = ({ chatId }: ChatIdProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistantLoading, setAssistantLoading] = useState(false);

  const { setCurrentChatId } = useChat();

  useEffect(() => setCurrentChatId(chatId ?? null), [chatId, setCurrentChatId]);

  useEffect(() => {
    if (!chatId) return;

    const getMessages = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/chat?chatId=${encodeURIComponent(chatId)}`,
          { cache: "no-store" },
        );

        const data = await res.json();

        if (!res.ok) {
          router.push("/");
          toast.error(data?.message);
          return;
        }

        setMessages(data.messages ?? []);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [chatId, router]);

  const handleNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateAssistantMessage = (content: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];

      if (lastMessage?.role === "assistant") {
        return [...prev.slice(0, -1), { ...lastMessage, content }];
      }

      return [...prev, { role: "assistant", content }];
    });
  };

  // == Auto Scroll ==
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="relative h-full">
      <div
        ref={chatContainerRef}
        className="w-full h-12/14 scroll-fade-y overflow-y-scroll scrollbar-none py-2"
      >
        {/* ======= Chat plate =======  */}
        <div
          className={cn("lg:w-3xl min-h-9/12 mx-auto px-2.5 md:px-3.5", {
            "flex justify-center items-center":
              messages.length === 0 && !loading,
          })}
        >
          {loading && (
            <p className="text-muted-foreground text-center">
              Loading messages...
            </p>
          )}

          {!loading && messages.length === 0 && (
            <h2 className="text-[clamp(25px,5vw,40px)] md:text-[clamp(30px,3.5vw,50px)]">
              How can I help you?
            </h2>
          )}

          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <div
                className={cn(
                  "w-full md:max-w-10/12 overflow-hidden rounded-lg px-3 py-1",
                  {
                    "w-fit ml-auto mr-0 text-right bg-muted":
                      message.role === "user",
                  },
                )}
              >
                <MarkdownRenderer content={message.content} />
              </div>
            </div>
          ))}

          {assistantLoading && (
            <div className="mb-2">
              <div className="w-fit rounded-lg bg-muted p-3.5">
                <ChatLoading />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== Search box ========== */}
      <SearchAria
        onMessage={handleNewMessage}
        onAssistantUpdate={updateAssistantMessage}
        onLoading={setAssistantLoading}
        className="bottom-2 absolute left-1/2 -translate-x-1/2 z-9 w-[calc(100%-20px)] mx-auto lg:w-187"
      />
    </div>
  );
};

export default ChatPage;
