
"use client";

import React, { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/appform/ui/form";
import { Input } from "@/components/appform/ui/input";
import { Textarea } from "@/components/appform/ui/textarea";
import { plagiarismCheckAndAbstractImprover } from "@/ai/flows/plagiarism-check-and-abstract-improver";
import type { PlagiarismCheckAndAbstractImproverOutput } from "@/ai/flows/plagiarism-check-and-abstract-improver";
import { PlagiarismResultDisplay } from "@/components/appform/ai/plagiarism-result-display";
import { Loader2, Sparkles, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const projectSchema = z.object({
  title: z.string().min(5, { message: "Project title must be at least 5 characters." }),
  abstract: z.string().min(50, { message: "Project abstract must be at least 50 characters." }),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface AddProjectFormProps {
  onSubmit: (data: ProjectFormValues & Partial<PlagiarismCheckAndAbstractImproverOutput> & { uploadedFileName?: string | null }) => void;
  onCancel: () => void;
  initialData?: ProjectFormValues & Partial<PlagiarismCheckAndAbstractImproverOutput> & { uploadedFileName?: string };
  submitButtonText?: string;
}

export function AddProjectForm({ onSubmit, onCancel, initialData, submitButtonText = "Add Project" }: AddProjectFormProps) {
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiResult, setAiResult] = useState<PlagiarismCheckAndAbstractImproverOutput | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      abstract: initialData?.abstract || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || "",
        abstract: initialData.abstract || "",
      });
      setAiResult(
        initialData.originalityReport && initialData.improvedAbstract
          ? { originalityReport: initialData.originalityReport, improvedAbstract: initialData.improvedAbstract }
          : null
      );
      setSelectedFileName(initialData.uploadedFileName || null);
    } else {
      form.reset({ title: "", abstract: "" });
      setAiResult(null);
      setSelectedFileName(null);
    }
  }, [initialData, form]);

  const handleAiCheck = async () => {
    const projectAbstract = form.getValues("abstract");
    if (projectAbstract.length < 50) {
      form.setError("abstract", { message: "Abstract must be at least 50 characters to perform AI check."});
      return;
    }

    setIsLoadingAi(true);
    setAiResult(null);
    setAiError(null);
    try {
      const result = await plagiarismCheckAndAbstractImprover({ projectAbstract });
      setAiResult(result);
      toast({
        title: "AI Analysis Complete",
        description: "Originality report and improved abstract generated.",
      });
    } catch (error) {
      console.error("AI check failed:", error);
      setAiError("Failed to process abstract with AI. Please try again.");
       toast({
        title: "AI Analysis Failed",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleFormSubmit = (data: ProjectFormValues) => {
    onSubmit({ ...data, ...aiResult, uploadedFileName: selectedFileName });
    if (!initialData) {
        form.reset({ title: "", abstract: ""});
        setAiResult(null);
        setSelectedFileName(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
    }
  };

  const useImprovedAbstract = () => {
    if (aiResult?.improvedAbstract) {
      form.setValue("abstract", aiResult.improvedAbstract, { shouldValidate: true });
      toast({
        title: "Abstract Updated",
        description: "Improved abstract has been applied to the form.",
      });
    }
  };

  const handleUploadTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      // If no file is selected (e.g., user cancels file dialog),
      // clear the selected file name.
      // setSelectedFileName(null); // Decided against this to prevent accidental clearing if user just closes dialog.
      // if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFileName(file.name);
    toast({
      title: "File Selected",
      description: `Selected: ${file.name}.`,
    });
  };

  const handleCancel = () => {
    if (initialData) {
      form.reset({ title: initialData.title || "", abstract: initialData.abstract || "" });
      setAiResult(
        initialData.originalityReport && initialData.improvedAbstract
          ? { originalityReport: initialData.originalityReport, improvedAbstract: initialData.improvedAbstract }
          : null
      );
      setSelectedFileName(initialData.uploadedFileName || null);
    } else {
      form.reset({ title: "", abstract: "" });
      setAiResult(null);
      setSelectedFileName(null);
       if (fileInputRef.current) {
          fileInputRef.current.value = "";
       }
    }
    onCancel();
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abstract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Abstract</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter or paste project abstract here (min 50 characters)"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" onClick={handleAiCheck} disabled={isLoadingAi} variant="outline" className="w-full flex-grow">
              {isLoadingAi ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
              )}
              Check Originality & Improve Abstract
            </Button>
          </div>

          {aiError && <p className="text-sm text-destructive mt-2">{aiError}</p>}
          {aiResult && (
            <div className="mt-4 space-y-2">
              <PlagiarismResultDisplay {...aiResult} />
               <Button type="button" onClick={useImprovedAbstract} variant="link" className="p-0 h-auto text-primary">
                Use Improved Abstract
              </Button>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              style={{ display: 'none' }}
              id="project-file-upload"
            />
             {selectedFileName && (
              <p className="text-sm text-muted-foreground">
                Current file: <span className="font-semibold">{selectedFileName}</span>
              </p>
            )}
            <Button
              type="button"
              onClick={handleUploadTrigger}
              variant="outline"
              className="w-full"
              disabled={isLoadingAi}
              aria-label="Upload abstract file"
            >
              <FileUp className="mr-2 h-4 w-4" />
              {selectedFileName ? "Change Abstract File" : "Upload Abstract File"}
            </Button>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Upload your project document (PDF, .doc, .docx). This file is required for submission. The file name will be saved.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoadingAi}>{submitButtonText}</Button>
        </div>
      </form>
    </Form>
  );
}
