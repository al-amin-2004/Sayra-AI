import { ChatProvider } from "@/providers/ChatContext";
import AppHeader from "@/components/shared/app-header/page";
import { AppSidebar } from "@/components/shared/app-sidebar/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import style from "@/styles/shadow.module.css";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="h-screen w-full overflow-hidden">
          {/* ========== Background Styles Start ========== */}
          <div className={style.top_right}></div>
          <div className={style.bottom_left}></div>
          <div className={style.bg_dots}></div>
          {/* ========== Background Styles Start ========== */}
          <AppHeader />
          <section className="h-full">{children}</section>
        </main>
      </SidebarProvider>
    </ChatProvider>
  );
}
