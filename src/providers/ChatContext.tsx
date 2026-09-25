"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Chat = {
  _id: string;
  title: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

type ChatContextType = {
  chats: Chat[];
  loading: boolean;
  currentChatId: string | null;

  setCurrentChatId: (chatId: string | null) => void;
  fetchChats: () => Promise<void>;
  refreshChats: () => Promise<void>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  console.log(chats);

  const fetchChats = useCallback(async () => {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });

      if (res.status === 401) {
        setChats([]);
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch chats");

      const data = await res.json();

      setChats(data.chats ?? []);
    } catch (error) {
      console.error("Failed to fetch chat list:", error);
    }
  }, []);

  const refreshChats = useCallback(async () => {
    await fetchChats();
  }, [fetchChats]);

  const resetChat = useCallback(() => {
    setCurrentChatId(null);
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        await fetchChats();
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [fetchChats]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        loading,
        currentChatId,
        setCurrentChatId,
        fetchChats,
        refreshChats,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("useChat must be used inside ChatProvider");

  return context;
};
