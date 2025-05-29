
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/appform/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/appform/ui/card";
import { AddMemberForm, type MemberFormValues } from "@/components/appform/forms/add-member-form";
import type { Member } from "@/types";
import { PlusCircle, Users, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/appform/ui/select";
import { Label } from "@/components/appform/ui/label";
import { Input } from "@/components/appform/ui/input";
import { MemberCard } from "./member-card";

interface GroupManagementProps {
  onMembersChange?: (members: Member[]) => void;
}

export function GroupManagement({ onMembersChange }: GroupManagementProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [maxAllowedMembers, setMaxAllowedMembers] = useState<number | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    onMembersChange?.(members);
  }, [members, onMembersChange]);

  useEffect(() => {
    if (maxAllowedMembers !== null && members.length >= maxAllowedMembers && showAddMemberForm) {
      setShowAddMemberForm(false);
    }
  }, [members.length, maxAllowedMembers, showAddMemberForm]);

  const handleMaxMembersChange = (value: string) => {
    const numValue = parseInt(value, 10);
    const newMax = isNaN(numValue) ? null : numValue;
    setMaxAllowedMembers(newMax);

    if (newMax !== null && members.length > newMax) {
      setMembers(currentMembers => currentMembers.slice(0, newMax));
      toast({
        title: "Group Size Reduced",
        description: `Member count adjusted to new limit (${newMax}).`,
        variant: "default",
      });
    }
     if (newMax !== null && members.length >= newMax) {
        setShowAddMemberForm(false);
    }
  };

  const handleAddMember = (newMemberData: MemberFormValues) => {
    if (maxAllowedMembers === null || members.length >= maxAllowedMembers) {
      toast({
        title: "Cannot Add Member",
        description: maxAllowedMembers === null ? "Please select a group size first." : `The group already has the maximum of ${maxAllowedMembers} members.`,
        variant: "destructive",
      });
      setShowAddMemberForm(false);
      return;
    }

    const isDuplicateRollNo = members.some(member => member.rollNo.toLowerCase() === newMemberData.rollNo.toLowerCase());
    if (isDuplicateRollNo) {
      toast({
        title: "Duplicate Member",
        description: `A member with roll number "${newMemberData.rollNo}" already exists.`,
        variant: "destructive",
      });
      return;
    }

    const newMember: Member = {
      ...newMemberData,
      id: crypto.randomUUID(),
    };

    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers, newMember];
      if (maxAllowedMembers !== null && updatedMembers.length >= maxAllowedMembers) {
        setShowAddMemberForm(false);
      }
      return updatedMembers;
    });

    toast({
      title: "Member Added",
      description: `${newMember.firstName} ${newMember.lastName} has been added to the group.`,
      variant: "default",
    });
  };

  const handleRemoveMember = (id: string) => {
    const memberToRemove = members.find(m => m.id === id);
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    if (memberToRemove) {
      toast({
        title: "Member Removed",
        description: `${memberToRemove.firstName} ${memberToRemove.lastName} has been removed from the group.`,
        variant: "destructive",
      });
    }
    if (maxAllowedMembers && members.length -1 < maxAllowedMembers && isGroupFull) {
        // The button will re-enable, user can click to show form again.
    }
  };

  const handleUpdateMember = (id: string, updatedData: MemberFormValues) => {
    const isDuplicateRollNo = members.some(member =>
      member.id !== id && member.rollNo.toLowerCase() === updatedData.rollNo.toLowerCase()
    );
    if (isDuplicateRollNo) {
      toast({
        title: "Update Failed",
        description: `Another member with roll number "${updatedData.rollNo}" already exists.`,
        variant: "destructive",
      });
      return;
    }

    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, ...updatedData } : member
      )
    );
    toast({
      title: "Member Updated",
      description: `${updatedData.firstName} ${updatedData.lastName}'s details have been updated.`,
      variant: "default",
    });
  };

  const isGroupFull = maxAllowedMembers !== null && members.length >= maxAllowedMembers;

  const toggleShowAddMemberForm = () => {
    if (!maxAllowedMembers && !showAddMemberForm) {
      toast({
        title: "Select Group Size",
        description: "Please choose the number of group members first.",
        variant: "default",
      });
      return;
    }
    if (isGroupFull && !showAddMemberForm) {
      toast({
        title: "Group Full",
        description: `You have reached the maximum of ${maxAllowedMembers} members.`,
        variant: "default",
      });
      return;
    }
    setShowAddMemberForm(prev => !prev);
  };

  const addMemberButtonText = showAddMemberForm ? "Cancel Adding Member" : (isGroupFull ? "Group Full" : "Add New Member");
  const isAddButtonDisabled = (!maxAllowedMembers && !showAddMemberForm) || (isGroupFull && !showAddMemberForm);

  return (
    <Card className="mb-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Group Details
          </CardTitle>
          <CardDescription>Manage your project group: set a name and add members. Select group size first (max 4).</CardDescription>
          <p className="text-xs text-muted-foreground mt-1">Note: The first group member added will be considered the group leader.</p>
        </div>
        <Button
          onClick={toggleShowAddMemberForm}
          size="sm"
          variant={showAddMemberForm ? "outline" : "default"}
          disabled={isAddButtonDisabled}
        >
          {showAddMemberForm ? (
            <XCircle className="mr-2 h-4 w-4" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4" />
          )}
          {addMemberButtonText}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div>
            <Label htmlFor="group-name-input">Group Name</Label>
            <Input
              id="group-name-input"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full md:w-[280px] mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-members-select">Number of Group Members</Label>
            <Select
              value={maxAllowedMembers?.toString() || ""}
              onValueChange={handleMaxMembersChange}
            >
              <SelectTrigger id="max-members-select" className="w-full md:w-[280px] mt-1">
                <SelectValue placeholder="Select group size (1-4)" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Member{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {maxAllowedMembers !== null && (
              <p className="text-sm text-muted-foreground mt-1">
                {members.length} / {maxAllowedMembers} members added.
                {isGroupFull && <span className="font-semibold"> Group is full.</span>}
              </p>
            )}
          </div>
        </div>

        {showAddMemberForm && maxAllowedMembers && members.length < maxAllowedMembers && (
          <Card className="mb-6 p-6 shadow-inner bg-secondary/10 border border-border/50 transition-colors duration-300 ease-in-out hover:border-primary/70">
            <CardHeader className="p-0 pb-4 mb-4 border-b border-border/30">
                 <CardTitle className="text-lg font-semibold">Enter New Member Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <AddMemberForm
                    onFormSubmit={handleAddMember}
                    onCancel={() => setShowAddMemberForm(false)}
                    submitButtonText="Add Member"
                />
            </CardContent>
          </Card>
        )}

        {showAddMemberForm && isGroupFull && maxAllowedMembers !== null && (
          <p className="text-destructive italic text-center py-4">
            The group is full at {maxAllowedMembers} members. You cannot add more members unless you increase the group size above or remove existing members.
          </p>
        )}

        {members.length > 0 && (
           <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${showAddMemberForm ? 'mt-6' : 'mt-2'}`}>
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onRemove={handleRemoveMember}
                onUpdate={handleUpdateMember}
              />
            ))}
          </div>
        )}

        {members.length === 0 && !showAddMemberForm && (
          <p className="text-muted-foreground italic text-center py-4">
            {maxAllowedMembers === null ? "Select the number of group members to get started." : "No members added yet. Click \"Add New Member\"."}
          </p>
        )}
         {showAddMemberForm && maxAllowedMembers === null && (
           <p className="text-muted-foreground italic text-center py-4">
            Please select the group size above before adding members.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
