"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[400px] rounded-[2rem] p-8 border-none bg-background shadow-2xl">
        <DialogHeader className="flex flex-col items-center text-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-2",
            variant === "danger" ? "bg-destructive/10 text-destructive" : 
            variant === "warning" ? "bg-amber-500/10 text-amber-500" : 
            "bg-primary/10 text-primary"
          )}>
            <AlertTriangle className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 rounded-xl h-12 font-bold order-2 sm:order-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={onConfirm}
            className={cn(
              "flex-1 rounded-xl h-12 font-bold order-1 sm:order-2 shadow-lg",
              variant === "danger" ? "shadow-destructive/20" : "shadow-primary/20"
            )}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
