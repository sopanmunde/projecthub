"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, LayoutGrid, ListChecks, Settings, HelpCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Assuming Sidebar component is structured like this

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/projects", label: "My Projects", icon: LayoutGrid },
  { href: "/tasks", label: "My Tasks", icon: ListChecks },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help Center", icon: HelpCircle },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
           <ShieldCheck className="h-8 w-8 text-primary" />
           <span className="sr-only group-data-[state=expanded]:not-sr-only group-data-[state=expanded]:ml-2 text-lg font-semibold">ProjectNexus</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{children: item.label, side: 'right', align: 'center'}}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[state=expanded]:opacity-100 opacity-0 transition-opacity duration-200">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional: Add footer items here if needed */}
      </SidebarFooter>
    </Sidebar>
  );
}
