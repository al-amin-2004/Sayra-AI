"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useChat } from "@/providers/ChatContext";
import { toast } from "sonner";
import ChatDelete from "./_components/chat-delete";
import {
  Archive,
  Ellipsis,
  MessageCirclePlus,
  Pen,
  Pin,
  PinOff,
  Search,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { PinFillIcon } from "@/icons";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { chats, loading, resetChat, refreshChats } = useChat();
  const [input, setInput] = useState<string>("");
  const [editingChatId, setEditingChatId] = useState<string | null>(null);

  const sortedChats = [...chats].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleNewChat = () => {
    resetChat();
    router.replace("/");
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleRename = async (chatId: string) => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/chat/rename", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, title: input.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Faild to rename chat");
        return;
      }

      toast.success("Chat rename successfully.");
      await refreshChats();
      setEditingChatId(null);
      setInput("");
    } catch (error) {
      console.error("Rename chat error:", error);
      toast.error("Something went wrong.");
    }
  };

  const handlePin = async (chatId: string, isPinned: boolean) => {
    try {
      const res = await fetch("/api/chat/pin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, isPinned }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update chat.");
        return;
      }

      toast.success(data.message);
      await refreshChats();
    } catch (error) {
      console.error("Pin chat error:", error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between gap-8 px-3">
          {/* LOGO */}
          <h1 className="text-3xl">Sayra.</h1>

          <div className="flex items-center gap-1">
            <Search className="size-8 p-1.5 rounded-md hover:bg-accent cursor-pointer" />
            <SidebarTrigger size="icon-lg" className="cursor-pointer" />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2.5 my-3">
          <button
            type="button"
            onClick={handleNewChat}
            className="flex justify-center items-center gap-2 p-2.5 rounded-xl bg-accent hover:bg-white/20 cursor-pointer"
          >
            <MessageCirclePlus className="size-6" />
            <span>New Chat</span>
          </button>

          <SidebarGroup />
          <div>
            <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              Chats
            </p>

            {loading ? (
              <p className="px-2 text-sm text-muted-foreground">
                Loading chats...
              </p>
            ) : chats.length === 0 ? (
              <p className="px-2 text-sm text-muted-foreground text-center">
                No chats yet
              </p>
            ) : (
              <div className="space-y-1">
                {sortedChats.map((chat) => {
                  const isActive = pathname === `/chat/${chat._id}`;

                  return (
                    <div
                      key={chat._id}
                      onClick={() => handleChatClick(chat._id)}
                      className={`w-full flex justify-between items-center rounded-lg px-2.5 py-1.5 text-left text-sm group/e cursor-pointer transition-colors ${
                        isActive ? "bg-muted font-medium" : "hover:bg-muted/70"
                      }`}
                    >
                      {editingChatId === chat._id ? (
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleRename(chat._id);
                            }
                            if (e.key === "Escape") {
                              setEditingChatId(null);
                              setInput("");
                            }
                          }}
                          maxLength={40}
                          autoFocus
                          className="min-w-0 outline-0 bg-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {chat.isPinned && <PinFillIcon className="size-4" />}
                          <span className="truncate">
                            {chat.title || "New Chat"}
                          </span>
                        </div>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="opacity-0 group-hover/e:opacity-100 hover:bg-white/10 duration-100 p-1 rounded-full cursor-pointer"
                        >
                          <Ellipsis className="size-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingChatId(chat._id);
                                setInput(chat.title);
                              }}
                            >
                              <Pen />
                              Rename
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePin(chat._id, !chat.isPinned);
                              }}
                            >
                              {chat.isPinned ? <PinOff /> : <Pin />}
                              {chat.isPinned ? "Unpin chat" : "Pin chat"}
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                              <Archive />
                              Archive
                            </DropdownMenuItem>
                            <ChatDelete chatId={chat._id} />
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
