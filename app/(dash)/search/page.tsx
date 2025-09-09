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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  Tag,
  SlidersHorizontal,
  X
} from "lucide-react";
import {
  sampleProjects,
  projectStatuses,
  type Project
} from "@/lib/project-data";
import { useState, useMemo } from "react";
import { format } from "date-fns";

interface SearchFilters {
  query: string;
  category: string;
  status: string[];
  priority: string[];
  tags: string[];
  hasDeadline: boolean | null;
}

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    status: [],
    priority: [],
    tags: [],
    hasDeadline: null
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter options
  const categories = Array.from(new Set(sampleProjects.map(p => p.category)));
  const allTags = Array.from(new Set(sampleProjects.flatMap(p => p.tags)));
  const priorities = ['High', 'Medium', 'Low'];

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      // Text search
      const matchesQuery = !filters.query || 
        project.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));

      // Category filter
      const matchesCategory = filters.category === "all" || project.category === filters.category;

      // Status filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(project.status);

      // Priority filter
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(project.priority);

      // Tags filter
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(tag => project.tags.includes(tag));

      // Deadline filter
      const matchesDeadline = filters.hasDeadline === null ||
        (filters.hasDeadline && project.deadline) ||
        (!filters.hasDeadline && !project.deadline);

      return matchesQuery && matchesCategory && matchesStatus && 
             matchesPriority && matchesTags && matchesDeadline;
    });
  }, [filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'status' | 'priority' | 'tags', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      status: [],
      priority: [],
      tags: [],
      hasDeadline: null
    });
  };

  const hasActiveFilters = filters.query || filters.category !== "all" || 
    filters.status.length > 0 || filters.priority.length > 0 || 
    filters.tags.length > 0 || filters.hasDeadline !== null;

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
                  <div className="flex flex-col gap-4">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Search Projects</h1>
                      <p className="text-muted-foreground">
                        Find projects using advanced search and filtering options
                      </p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search by title, description, or tags..."
                          value={filters.query}
                          onChange={(e) => updateFilter('query', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                            !
                          </Badge>
                        )}
                      </Button>
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {filters.category !== "all" && (
                          <Badge variant="secondary" className="gap-1">
                            Category: {filters.category}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => updateFilter('category', 'all')}
                            />
                          </Badge>
                        )}
                        {filters.status.map(status => (
                          <Badge key={status} variant="secondary" className="gap-1">
                            Status: {projectStatuses.find(s => s.id === status)?.name}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => toggleArrayFilter('status', status)}
                            />
                          </Badge>
                        ))}
                        {filters.priority.map(priority => (
                          <Badge key={priority} variant="secondary" className="gap-1">
                            Priority: {priority}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => toggleArrayFilter('priority', priority)}
                            />
                          </Badge>
                        ))}
                        {filters.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            Tag: {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => toggleArrayFilter('tags', tag)}
                            />
                          </Badge>
                        ))}
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                          Clear all
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Advanced Filters Panel */}
                  {showFilters && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Advanced Filters</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Category */}
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <div className="space-y-2">
                            {projectStatuses.map(status => (
                              <div key={status.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`status-${status.id}`}
                                  checked={filters.status.includes(status.id)}
                                  onCheckedChange={() => toggleArrayFilter('status', status.id)}
                                />
                                <Label htmlFor={`status-${status.id}`} className="text-sm">
                                  {status.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Priority */}
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <div className="space-y-2">
                            {priorities.map(priority => (
                              <div key={priority} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`priority-${priority}`}
                                  checked={filters.priority.includes(priority)}
                                  onCheckedChange={() => toggleArrayFilter('priority', priority)}
                                />
                                <Label htmlFor={`priority-${priority}`} className="text-sm">
                                  {priority}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                          <Label>Tags</Label>
                          <div className="max-h-32 overflow-y-auto space-y-2">
                            {allTags.slice(0, 10).map(tag => (
                              <div key={tag} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`tag-${tag}`}
                                  checked={filters.tags.includes(tag)}
                                  onCheckedChange={() => toggleArrayFilter('tags', tag)}
                                />
                                <Label htmlFor={`tag-${tag}`} className="text-sm">
                                  {tag}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className="space-y-2">
                          <Label>Deadline</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="has-deadline"
                                checked={filters.hasDeadline === true}
                                onCheckedChange={(checked) => 
                                  updateFilter('hasDeadline', checked ? true : null)
                                }
                              />
                              <Label htmlFor="has-deadline" className="text-sm">
                                Has deadline
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="no-deadline"
                                checked={filters.hasDeadline === false}
                                onCheckedChange={(checked) => 
                                  updateFilter('hasDeadline', checked ? false : null)
                                }
                              />
                              <Label htmlFor="no-deadline" className="text-sm">
                                No deadline
                              </Label>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Results */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Search Results ({filteredProjects.length})
                      </h2>
                      {filteredProjects.length > 0 && (
                        <Select defaultValue="updated">
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="updated">Last updated</SelectItem>
                            <SelectItem value="created">Created date</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {/* Project Cards */}
                    {filteredProjects.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {filteredProjects.map((project) => (
                          <Card key={project.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg line-clamp-1">
                                    {project.title}
                                  </CardTitle>
                                  <CardDescription className="line-clamp-2 mt-1">
                                    {project.description}
                                  </CardDescription>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
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
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} />
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {project.deadline ? format(project.deadline, "MMM dd, yyyy") : "No deadline"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {project.team.length + 1} members
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {format(project.updatedAt, "MMM dd")}
                                </div>
                              </div>

                              {project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {project.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {project.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{project.tags.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}

                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="flex-1">
                                  View Project
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Tag className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="py-12">
                          <div className="text-center">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium text-muted-foreground">No projects found</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Try adjusting your search criteria or filters
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}