import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_dash")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <SidebarTrigger />
          <Link to="/" className="text-sm font-semibold tracking-tight">
            AI Workplace Productivity Assistant{" "}
            <span className="text-gradient">Pro</span>
          </Link>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster richColors position="top-center" />
    </SidebarProvider>
  );
}
