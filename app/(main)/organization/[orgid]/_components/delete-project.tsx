"use client";
import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const DeleteProject = ({ projectId }: { projectId: string }) => {
  const { membership } = useOrganization();
  const router = useRouter();

  const {
    data: deleted,
    // error,
    loading: isDeleting,
    fn: deleteProjectFn,
  } = useFetch(deleteProject);
  useEffect(() => {
    if (deleted?.success) {
      toast.success("Project Deleted successfully.");
      router.refresh();
    }
  }, [deleted]);
  const isAdmin = membership?.role === "org:admin";
  if (!isAdmin) return null;

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={"sm"}
            className={isDeleting ? "animate-pulse" : ""}
            variant={"ghost"}
          >
            <Trash2 className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              project from this organization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600  text-white transition-all duration-500 ring-blue-200 hover:ring hover:bg-red-700 "
              onClick={() => deleteProjectFn(projectId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteProject;
