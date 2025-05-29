
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/appform/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/appform/ui/card";
import { AddProjectForm, type ProjectFormValues } from "@/components/appform/forms/add-project-form";
import { ProjectCard } from "./project-card";
import type { Project } from "@/types";
import type { PlagiarismCheckAndAbstractImproverOutput } from "@/ai/flows/plagiarism-check-and-abstract-improver";
import { PlusCircle, FolderKanban, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/appform/ui/select";
import { Label } from "@/components/appform/ui/label";

interface ProjectManagementProps {
  onProjectsChange?: (projects: Project[]) => void;
}

export function ProjectManagement({ onProjectsChange }: ProjectManagementProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [maxAllowedProjects, setMaxAllowedProjects] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    onProjectsChange?.(projects);
  }, [projects, onProjectsChange]);

  useEffect(() => {
    if (maxAllowedProjects !== null && projects.length >= maxAllowedProjects && showAddProjectForm) {
      setShowAddProjectForm(false);
    }
  }, [projects.length, maxAllowedProjects, showAddProjectForm]);

  const handleMaxProjectsChange = (value: string) => {
    const numValue = parseInt(value, 10);
    const newMax = isNaN(numValue) ? null : numValue;
    setMaxAllowedProjects(newMax);

    if (newMax !== null && projects.length > newMax) {
      toast({
        title: "Project Limit Reduced",
        description: `Current project count (${projects.length}) exceeds the new limit (${newMax}). Please remove projects if necessary.`,
        variant: "default",
      });
    }
    if (newMax !== null && projects.length >= newMax) {
        setShowAddProjectForm(false);
    }
  };

  const handleAddProject = (newProjectData: ProjectFormValues & Partial<PlagiarismCheckAndAbstractImproverOutput> & { uploadedFileName?: string | null }) => {
     if (maxAllowedProjects === null || projects.length >= maxAllowedProjects) {
      toast({
        title: "Cannot Add Project",
        description: maxAllowedProjects === null ? "Please select the number of projects first." : `You have reached the maximum of ${maxAllowedProjects} projects.`,
        variant: "destructive",
      });
      setShowAddProjectForm(false);
      return;
    }
    const newProject: Project = {
      id: crypto.randomUUID(), 
      title: newProjectData.title,
      abstract: newProjectData.abstract,
      originalityReport: newProjectData.originalityReport,
      improvedAbstract: newProjectData.improvedAbstract,
      uploadedFileName: newProjectData.uploadedFileName === null ? undefined : newProjectData.uploadedFileName,
    };
    setProjects((prevProjects) => {
       const updatedProjects = [...prevProjects, newProject];
        if (maxAllowedProjects !== null && updatedProjects.length >= maxAllowedProjects) {
          setShowAddProjectForm(false);
        }
        return updatedProjects;
    });
     toast({
      title: "Project Added",
      description: `"${newProject.title}" has been added.`,
    });
  };

  const handleRemoveProject = (id: string) => {
    const projectToRemove = projects.find(p => p.id === id);
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    if(projectToRemove){
      toast({
        title: "Project Removed",
        description: `"${projectToRemove.title}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = (id: string, updatedData: Omit<Project, "id">) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id ? { id, ...updatedData } : project
      )
    );
    toast({
      title: "Project Updated",
      description: `"${updatedData.title}" has been updated.`,
    });
  };


  const isProjectLimitReached = maxAllowedProjects !== null && projects.length >= maxAllowedProjects;

  const toggleShowAddProjectForm = () => {
    if (!maxAllowedProjects && !showAddProjectForm) {
      toast({
        title: "Select Number of Projects",
        description: "Please choose the number of projects first.",
        variant: "default",
      });
      return;
    }
    if (isProjectLimitReached && !showAddProjectForm) {
      toast({
        title: "Project Limit Reached",
        description: `You have reached the maximum of ${maxAllowedProjects} projects.`,
        variant: "default",
      });
      return;
    }
    setShowAddProjectForm(prev => !prev);
  };
  
  const addProjectButtonText = showAddProjectForm ? "Cancel Adding Project" : (isProjectLimitReached ? "Project Limit Reached" : "Add New Project");
  const isAddButtonDisabled = (!maxAllowedProjects && !showAddProjectForm) || (isProjectLimitReached && !showAddProjectForm);


  return (
    <Card className="mb-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex items-center">
            <FolderKanban className="mr-2 h-5 w-5 text-primary" />
            Project Details
          </CardTitle>
          <CardDescription>Manage your project titles and abstracts. Select number of projects first (max 3).</CardDescription>
        </div>
        <Button 
          onClick={toggleShowAddProjectForm} 
          size="sm" 
          variant={showAddProjectForm ? "outline" : "default"}
          disabled={isAddButtonDisabled}
        >
          {showAddProjectForm ? (
            <XCircle className="mr-2 h-4 w-4" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4" />
          )}
          {addProjectButtonText}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <Label htmlFor="max-projects-select">Number of Projects</Label>
          <Select
            value={maxAllowedProjects?.toString() || ""}
            onValueChange={handleMaxProjectsChange}
          >
            <SelectTrigger id="max-projects-select" className="w-full md:w-[220px]">
              <SelectValue placeholder="Select project count (1-3)" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Project{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {maxAllowedProjects !== null && (
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} / {maxAllowedProjects} projects added.
              {isProjectLimitReached && <span className="font-semibold"> Project limit reached.</span>}
            </p>
          )}
        </div>

        {showAddProjectForm && maxAllowedProjects && projects.length < maxAllowedProjects && (
          <Card className="mt-6 mb-6 p-6 shadow-inner bg-secondary/10 border border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/70">
            <CardHeader className="p-0 pb-4 mb-4 border-b border-border/30">
                <CardTitle className="text-lg font-semibold">Enter New Project Details</CardTitle>
                <CardDescription>Provide the title and abstract for your project. Use the AI tool for checks.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <AddProjectForm
                    onSubmit={handleAddProject}
                    onCancel={() => setShowAddProjectForm(false)}
                />
            </CardContent>
          </Card>
        )}
        
        {showAddProjectForm && isProjectLimitReached && (
          <p className="text-destructive italic text-center py-4 mt-4">
            The project limit is {maxAllowedProjects}. You cannot add more projects unless you increase the limit or remove existing ones.
          </p>
        )}
         {showAddProjectForm && !maxAllowedProjects && (
           <p className="text-muted-foreground italic text-center py-4 mt-4">
            Please select the number of projects above before adding project details.
          </p>
        )}


        {projects.length === 0 && !showAddProjectForm && (
          <p className="text-muted-foreground italic text-center py-4">
             {maxAllowedProjects === null ? "Select the number of projects to get started." : "No projects added yet. Click \"Add New Project\"."}
          </p>
        )}
        {projects.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showAddProjectForm ? 'mt-6' : 'mt-2'}`}>
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onRemove={handleRemoveProject} 
                onUpdate={handleUpdateProject}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

