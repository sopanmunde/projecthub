"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/appform/ui/dialog";
import { AddMemberForm } from "@/components/appform/forms/add-member-form";
import type { MemberFormValues } from "@/components/appform/forms/add-member-form";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: MemberFormValues) => void;
}

export function AddMemberModal({ isOpen, onClose, onAddMember }: AddMemberModalProps) {
  const handleSubmit = (data: MemberFormValues) => {
    onAddMember(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Group Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new group member.
          </DialogDescription>
        </DialogHeader>
        <AddMemberForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}