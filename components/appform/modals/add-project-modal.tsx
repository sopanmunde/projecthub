"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/appform/ui/dialog";
import { AddProjectForm, ProjectFormValues } from "@/components/appform/forms/add-project-form";
import type { Project } from "@/types";
import type { PlagiarismCheckAndAbstractImproverOutput } from "@/ai/flows/plagiarism-check-and-abstract-improver";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, "id">) => void;
}

export function AddProjectModal({ isOpen, onClose, onAddProject }: AddProjectModalProps) {
  const handleSubmit = (data: ProjectFormValues & Partial<PlagiarismCheckAndAbstractImproverOutput>) => {
    onAddProject({
      title: data.title,
      abstract: data.abstract,
      originalityReport: data.originalityReport,
      improvedAbstract: data.improvedAbstract,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Project Details</DialogTitle>
          <DialogDescription>
            Enter the title and abstract for your project. You can also use the AI tool to check for originality and improve the abstract.
          </DialogDescription>
        </DialogHeader>
        <AddProjectForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
