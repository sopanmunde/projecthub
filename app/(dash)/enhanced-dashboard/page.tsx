"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  PieChart,
  Target,
  Clock3
} from "lucide-react";
import {
  sampleProjects,
  sampleActivities,
  projectStatuses,
  getProjectStats,
  getRecentActivities,
  calculateOverallProgress,
  type Project,
  type ProjectActivity
} from "@/lib/project-data";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

export default function EnhancedDashboardPage() {
  const stats = getProjectStats();
  const recentActivities = getRecentActivities(8);
  const overallProgress = calculateOverallProgress();
  const urgentProjects = sampleProjects.filter(p => {
    if (!p.deadline) return false;
    const daysUntilDeadline = Math.ceil((p.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 7 && p.status !== 'completed';
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
      case 'Low': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
    }
  };

  const getStatusColor = (statusId: string) => {
    const status = projectStatuses.find(s => s.id === statusId);
    return status ? status.color : '#6b7280';
  };

  const getActivityIcon = (action: ProjectActivity['action']) => {
    switch (action) {
      case 'created': return <Plus className="h-4 w-4" />;
      case 'completed_task': return <CheckCircle className="h-4 w-4" />;
      case 'status_changed': return <Activity className="h-4 w-4" />;
      case 'updated': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

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
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Enhanced Dashboard</h1>
                      <p className="text-muted-foreground">
                        Overview of your projects, activities, and progress
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/projects/templates">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Link>
                    </Button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">
                          {stats.completionRate}% completion rate
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.inProgress}</div>
                        <p className="text-xs text-muted-foreground">
                          Active development
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground">
                          Successfully finished
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{overallProgress}%</div>
                        <Progress value={overallProgress} className="mt-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Projects */}
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Projects</CardTitle>
                          <CardDescription>
                            Your latest and most active projects
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {sampleProjects.slice(0, 4).map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold">{project.title}</h4>
                                  <Badge 
                                    className={getPriorityColor(project.priority)}
                                    variant="secondary"
                                  >
                                    {project.priority}
                                  </Badge>
                                  <Badge 
                                    variant="outline"
                                    style={{ 
                                      borderColor: getStatusColor(project.status),
                                      color: getStatusColor(project.status)
                                    }}
                                  >
                                    {projectStatuses.find(s => s.id === project.status)?.name}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                                  {project.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {project.deadline ? format(project.deadline, "MMM dd") : "No deadline"}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {project.team.length + 1} members
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4 text-right">
                                <div className="text-sm font-medium mb-1">{project.progress}%</div>
                                <Progress value={project.progress} className="w-20" />
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/projects">View All Projects</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Activity Feed */}
                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>
                            Latest updates from your team
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {activity.userName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  {getActivityIcon(activity.action)}
                                  <span className="text-sm font-medium">{activity.userName}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {activity.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full" size="sm">
                            View All Activity
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Urgent Projects */}
                  {urgentProjects.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          Urgent Projects
                        </CardTitle>
                        <CardDescription>
                          Projects with approaching deadlines that need attention
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {urgentProjects.map((project) => {
                            const daysLeft = Math.ceil((project.deadline!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            return (
                              <div key={project.id} className="flex items-center justify-between p-3 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                <div className="flex items-center gap-3">
                                  <Clock3 className="h-4 w-4 text-orange-500" />
                                  <div>
                                    <h4 className="font-medium">{project.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {daysLeft === 0 ? 'Due today' : `${daysLeft} days left`}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{project.progress}% complete</div>
                                  <Progress value={project.progress} className="w-24 mt-1" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                        Common tasks and shortcuts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
                          <Link href="/projects/new">
                            <Plus className="h-5 w-5" />
                            <span>Create Project</span>
                          </Link>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
                          <Link href="/projects/templates">
                            <PieChart className="h-5 w-5" />
                            <span>Browse Templates</span>
                          </Link>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                          <BarChart3 className="h-5 w-5" />
                          <span>View Analytics</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                          <Users className="h-5 w-5" />
                          <span>Team Management</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}