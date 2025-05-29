"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import { TopNav } from "./top-nav"; // Removed import
// import { SidebarNav } from "./sidebar-nav"; // Removed import
import React from "react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  // Retrieve sidebar state from cookie
  const [defaultOpen, setDefaultOpen] = React.useState(true);
  React.useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    if (cookieValue) {
      setDefaultOpen(cookieValue === 'true');
    }
  }, []);


  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* <SidebarNav /> */} {/* Removed SidebarNav component */}
      <SidebarInset className="flex flex-col bg-background">
        {/* <TopNav /> */} {/* Removed TopNav component */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
