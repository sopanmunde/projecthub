
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/appform/ui/card";
import { Button } from "@/components/appform/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/appform/ui/accordion";
import { ScrollArea } from "@/components/appform/ui/scroll-area";
import { FileText, Lightbulb, Trash2, CheckCircle, AlertTriangle, Edit, Paperclip, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/appform/ui/badge";
import { AddProjectForm, type ProjectFormValues } from "@/components/appform/forms/add-project-form";
import type { PlagiarismCheckAndAbstractImproverOutput } from "@/ai/flows/plagiarism-check-and-abstract-improver";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: Project;
  onRemove: (id: string) => void;
  onUpdate: (id: string, data: Omit<Project, "id">) => void;
}

export function ProjectCard({ project, onRemove, onUpdate }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleEditSubmit = (
    formData: ProjectFormValues & Partial<PlagiarismCheckAndAbstractImproverOutput> & { uploadedFileName?: string | null }
  ) => {
    const updatedProjectData: Omit<Project, "id"> = {
      title: formData.title,
      abstract: formData.abstract,
      originalityReport: formData.originalityReport || project.originalityReport,
      improvedAbstract: formData.improvedAbstract || project.improvedAbstract,
      uploadedFileName: formData.uploadedFileName === null ? undefined : (formData.uploadedFileName || project.uploadedFileName),
    };
    onUpdate(project.id, updatedProjectData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="shadow-md border-primary border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Editing: {project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AddProjectForm
            initialData={{
              title: project.title,
              abstract: project.abstract,
              originalityReport: project.originalityReport,
              improvedAbstract: project.improvedAbstract,
              uploadedFileName: project.uploadedFileName,
            }}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditing(false)}
            submitButtonText="Save Changes"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            {project.title}
          </CardTitle>
          <CardDescription className="mt-1 text-xs">Project Overview</CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="Edit project">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onRemove(project.id)} aria-label="Remove project">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {project.uploadedFileName && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Paperclip className="mr-2 h-3 w-3" />
            <span>Attached file:</span>
            <a
              href="#" // Placeholder: In a real system, this would be a URL to the file.
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "File Preview",
                  description: `Displaying '${project.uploadedFileName}'. Actual file viewing/download would require further implementation.`,
                  variant: "default",
                });
              }}
              className="font-medium ml-1 text-primary hover:underline flex items-center cursor-pointer"
            >
              {project.uploadedFileName}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold mb-1 flex items-center text-foreground">
            <Lightbulb className="mr-2 h-4 w-4 text-primary" />
            Abstract
          </h3>
          <ScrollArea className="h-40 rounded-md border p-3 bg-secondary/5">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {project.abstract}
            </p>
          </ScrollArea>
        </div>

        {(project.originalityReport || project.improvedAbstract) && (
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ai-analysis">
                <AccordionTrigger className="text-sm py-2">
                  <div className="flex items-center">
                    AI Analysis Results <Badge variant="outline" className="ml-2 bg-accent/80 text-accent-foreground">View</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 p-2 bg-secondary/20 rounded-md">
                  {project.originalityReport && (
                    <div>
                      <h4 className="font-semibold text-xs flex items-center mb-1">
                        <AlertTriangle className="mr-1 h-3 w-3 text-yellow-500" /> Originality Report
                      </h4>
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {project.originalityReport}
                      </p>
                    </div>
                  )}
                  {project.improvedAbstract && (
                    <div>
                      <h4 className="font-semibold text-xs flex items-center mb-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-green-500" /> Improved Abstract
                      </h4>
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {project.improvedAbstract}
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
