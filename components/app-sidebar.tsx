"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  Map,
  PieChart,
  Rabbit,
  Settings2,
  Sheet,
  FolderOpen,
  BarChart3,
  Search,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Student",
      logo: Rabbit,
      plan: "free",
    },
    {
      name: "Faculty",
      logo: AudioWaveform,
      plan: "Pro team",
    },
    {
      name: "Admin",
      logo: Command,
      plan: "pro ",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      items: [
        {
          title: "History",
          url: "/dashboard",
        },
        {
          title: "Enhanced",
          url: "/enhanced-dashboard",
        },
        {
          title: "Settings",
          url: "/settings",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/enhanced-dashboard",
      icon: BarChart3,
      items: [
        {
          title: "Enhanced Dashboard",
          url: "/enhanced-dashboard",
        },
        {
          title: "Project Analytics",
          url: "#",
        },
        {
          title: "Team Performance",
          url: "#",
        },
      ],
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
      items: [
        {
          title: "All Projects",
          url: "/search",
        },
        {
          title: "My Projects",
          url: "#",
        },
        {
          title: "Team Projects",
          url: "#",
        },
      ],
    },
    {
      title: "Projects", 
      url: "/projects/templates",
      icon: FolderOpen,
      items: [
        {
          title: "Templates",
          url: "/projects/templates",
        },
        {
          title: "Create New",
          url: "/projects/new",
        },
        {
          title: "My Projects",
          url: "#",
        },
      ],
    },
    {
      title: "Applications",
      url: "/appform",
      icon: Sheet,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()

  const userData = user ? {
    name: user.fullName || "",
    email: user.emailAddresses[0]?.emailAddress || "",
    avatar: user.imageUrl || ""
  } : undefined
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
      <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
