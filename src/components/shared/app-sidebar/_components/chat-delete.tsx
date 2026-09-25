"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useChat } from "@/providers/ChatContext";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const ChatDelete = ({ chatId }: { chatId: string }) => {
  const router = useRouter();
  const { resetChat, refreshChats, currentChatId } = useChat();

  const handleDelete = async (chatId: string) => {
    try {
      const res = await fetch("/api/chat/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Chat not Deleted");
        return;
      }

      toast.success("Chat deleted successfully.");

      await refreshChats();

      if (currentChatId === chatId) {
        resetChat();
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(chatId);
      }}
    >
      <Trash />
      Delete
    </DropdownMenuItem>
  );
};

export default ChatDelete;
