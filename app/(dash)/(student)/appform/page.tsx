"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AppShell } from "@/components/appform/layout/app-shell";
import { SiteHeader } from "@/components/site-header";
import React, { useState, useEffect } from 'react';

import { WorksheetVerification } from "@/components/appform/dashboard/worksheet-verification";
import { GroupManagement } from "@/components/appform/dashboard/group-management";
import { ProjectManagement } from "@/components/appform/dashboard/project-management";
import { SubmissionSection } from "@/components/appform/dashboard/submission-section";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Member, Project } from '@/types';
import { ShieldCheck } from 'lucide-react';

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  // ✅ Move hooks inside the component
  const [state, setState] = useState();
  const [membersList, setMembersList] = useState<Member[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  const handleMembersUpdate = (updatedMembers: Member[]) => {
    setMembersList(updatedMembers);
  };

  const handleProjectsUpdate = (updatedProjects: Project[]) => {
    setProjectsList(updatedProjects);
  };

  const allProjectsHaveFiles = projectsList.length > 0 && projectsList.every(p => !!p.uploadedFileName);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <AppShell> 
                  <div className="container mx-auto py-8">
                    <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary">
                      <CardHeader className="p-6">
                        <div className="flex items-center space-x-3">
                          <ShieldCheck className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-2xl font-bold">Project Idea Submission</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              Manage your projects, group members, and submissions all in one place.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6">
                        <p className="text-sm font-medium text-center text-muted-foreground">
                          All the information is required.
                        </p>
                        <WorksheetVerification />
                        <Separator />
                        <GroupManagement onMembersChange={handleMembersUpdate} />
                        <Separator />
                        <ProjectManagement onProjectsChange={handleProjectsUpdate} />
                        <Separator />
                        <SubmissionSection
                          hasMembers={membersList.length > 0}
                          hasProjects={projectsList.length > 0}
                          allProjectsHaveFiles={allProjectsHaveFiles}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </AppShell>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
