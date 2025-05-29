
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/appform/ui/card";
import { Button } from "@/components/appform/ui/button";
import { Avatar, AvatarFallback } from "@/components/appform/ui/avatar";
import { Mail, Phone, Trash2, UserCircle, Edit, Save, X } from "lucide-react"; 
import type { Member } from "@/types";
import { AddMemberForm, type MemberFormValues } from "@/components/appform/forms/add-member-form";

interface MemberCardProps {
  member: Member;
  onRemove: (id: string) => void;
  onUpdate: (id: string, data: MemberFormValues) => void;
}

export function MemberCard({ member, onRemove, onUpdate }: MemberCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const fullName = `${member.firstName} ${member.lastName}`;
  const initials = ((member.firstName?.charAt(0) || "") + (member.lastName?.charAt(0) || "")).toUpperCase();


  const handleEditSubmit = (data: MemberFormValues) => {
    onUpdate(member.id, data);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="shadow-md border-primary border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Editing: {fullName}</CardTitle>
        </CardHeader>
        <CardContent>
          <AddMemberForm
            initialData={{
              firstName: member.firstName,
              lastName: member.lastName,
              rollNo: member.rollNo,
              email: member.email,
              contact: member.contact,
            }}
            onFormSubmit={handleEditSubmit} // Changed from onSubmit to onFormSubmit
            onCancel={handleCancelEdit}
            submitButtonText="Save Changes"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-medium">{fullName}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="Edit member">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onRemove(member.id)} aria-label="Remove member">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center">
          <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Roll No: {member.rollNo}</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
          <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{member.contact}</span>
        </div>
      </CardContent>
    </Card>
  );
}
