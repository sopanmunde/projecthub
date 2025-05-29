
"use client";

import React, { useState } from "react";
import { Button } from "@/components/appform/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/appform/ui/card";
import { Checkbox } from "@/components/appform/ui/checkbox";
import { Label } from "@/components/appform/ui/label";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmissionSectionProps {
  hasMembers: boolean;
  hasProjects: boolean;
  allProjectsHaveFiles: boolean;
}

export function SubmissionSection({ hasMembers, hasProjects, allProjectsHaveFiles }: SubmissionSectionProps) {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!hasMembers || !hasProjects) {
      toast({
        title: "Submission Error",
        description: "Please add at least one group member and one project before submitting.",
        variant: "destructive",
      });
      setSubmissionMessage("Please add members and projects before submitting.");
      return;
    }

    if (!allProjectsHaveFiles) {
      toast({
        title: "Submission Error",
        description: "Please ensure all projects have an uploaded document before submitting.",
        variant: "destructive",
      });
      setSubmissionMessage("Please upload a document for all projects.");
      return;
    }

    if (!isConfirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that the information you entered is correct before submitting.",
        variant: "destructive",
      });
      setSubmissionMessage("Please confirm the information is correct.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Submission Successful!",
        description: "Your project details have been submitted.",
        variant: "default",
        action: <CheckCircle className="text-green-500" />,
      });
      setSubmissionMessage("Project submitted successfully!");
      setIsSubmitting(false);
      setIsConfirmed(false); // Reset confirmation after successful submission
    }, 1500);
  };

  let guidanceMessage = "Ensure you have added group members, project details, uploaded a document for each project, and confirmed the information to enable submission.";
  if (!hasMembers) guidanceMessage = "Add at least one group member to enable submission.";
  else if (!hasProjects) guidanceMessage = "Add at least one project to enable submission.";
  else if (!allProjectsHaveFiles) guidanceMessage = "Ensure all projects have an uploaded document to enable submission.";
  else if (!isConfirmed) guidanceMessage = "Confirm the information is correct to enable submission.";


  return (
    <Card className="shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Send className="mr-2 h-5 w-5 text-primary" />
          Submit Your Work
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center space-x-2 mb-6 justify-center">
          <Checkbox 
            id="confirmation-checkbox" 
            checked={isConfirmed} 
            onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
            aria-label="Confirm information is correct"
          />
          <Label 
            htmlFor="confirmation-checkbox" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that the above information is correct.
          </Label>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !hasMembers || !hasProjects || !allProjectsHaveFiles || !isConfirmed} 
          size="sm" 
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <><AlertCircle className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
          ) : (
            <><Send className="mr-2 h-4 w-4" /> Submit All Details</>
          )}
        </Button>
        {submissionMessage && (
          <p className={`mt-4 text-sm ${submissionMessage.includes("successfully") ? "text-green-600" : "text-destructive"}`}>
            {submissionMessage}
          </p>
        )}
        {(!hasMembers || !hasProjects || !allProjectsHaveFiles || !isConfirmed) && !isSubmitting && (
           <p className="mt-4 text-sm text-muted-foreground">
            {guidanceMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
