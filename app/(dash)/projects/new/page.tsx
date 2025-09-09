"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Check, Plus, X } from "lucide-react";
import { getTemplateById, type ProjectTemplate } from "@/lib/project-templates";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  deadline?: Date;
  priority: 'Low' | 'Medium' | 'High';
  isPublic: boolean;
  templateId?: string;
  customSections: {
    id: string;
    title: string;
    description: string;
    required: boolean;
  }[];
}

export default function NewProjectPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [template, setTemplate] = useState<ProjectTemplate | null>(null);
  const [newTag, setNewTag] = useState("");
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    category: "",
    tags: [],
    priority: 'Medium',
    isPublic: false,
    customSections: []
  });

  const totalSteps = 4;

  useEffect(() => {
    if (templateId) {
      const foundTemplate = getTemplateById(templateId);
      if (foundTemplate) {
        setTemplate(foundTemplate);
        setProjectData(prev => ({
          ...prev,
          title: foundTemplate.sample?.title || "",
          description: foundTemplate.sample?.abstract || "",
          category: foundTemplate.category,
          tags: [...foundTemplate.tags],
          templateId: foundTemplate.id,
          customSections: foundTemplate.sections.map(section => ({ ...section }))
        }));
      }
    }
  }, [templateId]);

  const handleAddTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      title: "",
      description: "",
      required: false
    };
    setProjectData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
  };

  const updateSection = (sectionId: string, field: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const removeSection = (sectionId: string) => {
    setProjectData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== sectionId)
    }));
  };

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return projectData.title.trim() && projectData.description.trim();
      case 2:
        return projectData.category;
      case 3:
        return projectData.customSections.length > 0 && projectData.customSections.every(s => s.title.trim());
      default:
        return true;
    }
  };

  const handleCreateProject = async () => {
    // Here you would typically save the project to your backend
    console.log('Creating project:', projectData);
    
    // For now, just redirect to dashboard
    // In a real app, you'd make an API call and handle the response
    window.location.href = '/dashboard';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              {template && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h4 className="font-medium">{template.name} Template</h4>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={projectData.title}
                  onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project goals and objectives"
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Project Details</h3>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={projectData.category} onValueChange={(value) => setProjectData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={projectData.priority} onValueChange={(value: any) => setProjectData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Deadline (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !projectData.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {projectData.deadline ? format(projectData.deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={projectData.deadline}
                      onSelect={(date) => setProjectData(prev => ({ ...prev, deadline: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projectData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={projectData.isPublic}
                  onCheckedChange={(checked) => setProjectData(prev => ({ ...prev, isPublic: checked }))}
                />
                <Label htmlFor="public">Make this project public</Label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Project Sections</h3>
              <Button onClick={addCustomSection} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            <div className="space-y-4">
              {projectData.customSections.map((section, index) => (
                <Card key={section.id}>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label>Section {index + 1}</Label>
                        {!template && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Input
                          placeholder="Section title"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Section description"
                          value={section.description}
                          onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={section.required}
                          onCheckedChange={(checked) => updateSection(section.id, 'required', checked)}
                        />
                        <Label>Required section</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projectData.customSections.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No sections added yet. Click "Add Section" to get started.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review & Create</h3>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{projectData.title}</CardTitle>
                  <CardDescription>{projectData.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{projectData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Priority:</span> {projectData.priority}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span> {projectData.deadline ? format(projectData.deadline, "PPP") : "No deadline"}
                    </div>
                    <div>
                      <span className="font-medium">Visibility:</span> {projectData.isPublic ? "Public" : "Private"}
                    </div>
                    <div>
                      <span className="font-medium">Sections:</span> {projectData.customSections.length}
                    </div>
                  </div>
                  
                  {projectData.tags.length > 0 && (
                    <div className="mt-4">
                      <span className="font-medium text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {projectData.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.customSections.map((section, index) => (
                      <div key={section.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{section.title}</h4>
                            {section.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
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
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/projects/templates">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Templates
                      </Link>
                    </Button>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                      <p className="text-muted-foreground">Step {currentStep} of {totalSteps}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-8">
                    <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
                  </div>

                  {/* Step Content */}
                  <Card>
                    <CardContent className="p-6">
                      {renderStep()}
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        disabled={!canProceed(currentStep)}
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleCreateProject} disabled={!canProceed(currentStep)}>
                        <Check className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
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