"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { useChat } from "@/providers/ChatContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { SidebarTrigger, useSidebar } from "../../ui/sidebar";
import Profile from "./_components/profile";
import {
  ListSortDescending,
  MessageCirclePlus,
  Search,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

const AppHeader = () => {
  const { open, isMobile, toggleSidebar } = useSidebar();
  const router = useRouter();
  const { user } = useUser();
  const { resetChat } = useChat();
  const [openDialog, setOpenDialog] = useState<"signout" | "profile" | null>(
    null,
  );

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Logout failed!");
      toast.success(data.message);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleNewChat = () => {
    resetChat();
    router.replace("/");
  };
  return (
    <header
      className={cn(
        "w-full  absolute top-0 left-0 flex justify-between items-center p-3 md:px-8 bg-transparent z-9",
        { "justify-end": open },
        { "justify-between": isMobile },
      )}
    >
      {/* ========== Header Right Side ========== */}
      {isMobile ? (
        <ListSortDescending onClick={() => toggleSidebar()} />
      ) : (
        <div className={cn("flex items-center gap-8", { hidden: open })}>
          {/* LOGO */}
          <h1 className="text-3xl">S</h1>

          <div className="flex items-center gap-2 border p-1.5 px-2 rounded-xl bg-accent/70">
            <SidebarTrigger size="icon-lg" className="cursor-pointer" />
            <Search className="size-8 p-1.5 rounded-md hover:bg-accent cursor-pointer" />
            <MessageCirclePlus
              onClick={handleNewChat}
              className="size-8 p-1.5 rounded-md hover:bg-accent cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* ========== Header Right Side ========== */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="size-12 rounded-full border bg-accent/70 overflow-hidden cursor-pointer">
              {user.avatar ? (
                <Image
                  height={200}
                  width={200}
                  alt="Profile Picture"
                  src={user.avatar}
                  className="object-cover"
                />
              ) : (
                <User className="size-10 md:size-12 p-1.5 md:p-2" />
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-70 p-3.5" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <div className="flex items-center gap-3 p-2 rounded-md bg-accent">
                <div className="size-12 rounded-full border overflow-hidden bg-accent/70">
                  {user.avatar ? (
                    <Image
                      height={200}
                      width={200}
                      alt="Profile Picture"
                      src={user.avatar}
                      className="object-cover"
                    />
                  ) : (
                    <User className="size-10 md:size-12 p-1.5 md:p-2" />
                  )}
                </div>
                <h3>{user.name}</h3>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog("profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Personalization</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Upgrade plan</DropdownMenuItem>
              <DropdownMenuItem disabled>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Help</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog("signout");
                }}
              >
                Sign out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <Button>Sign in</Button>
        </Link>
      )}

      <Dialog
        open={openDialog !== null}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        {/* ========== Signout content ========== */}
        {openDialog === "profile" && user && <Profile key={user._id} />}

        {/* ========== Signout content ========== */}
        {openDialog === "signout" && (
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Sign out of your account?</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign out? You&apos;ll need to sign in
                again to access your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                onClick={handleSignout}
                variant="destructive"
                type="button"
              >
                Sign out
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </header>
  );
};

export default AppHeader;
