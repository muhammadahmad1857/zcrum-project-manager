"use client";

import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/lib/validation";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { createIssue } from "@/actions/issues";
import { getOrganizationUsers } from "@/actions/organizations";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IssueProps {
  isOpen: boolean;
  onClose: () => void;
  sprintId: string;
  status: string | null;
  projectId: string;
  onIssueCreated: () => void;
  orgId: string;
}

const CreateIssue = ({
  isOpen,
  onClose,
  sprintId,
  status,
  projectId,
  onIssueCreated,
  orgId,
}: IssueProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      priority: "MEDIUM",
      description: "",
      assigneeId: "",
      title: "",
    },
  });

  const {
    loading: createIssueLoading,
    fn: createIssueFn,
    error,
    data: newIssue,
  } = useFetch(createIssue);

  const {
    loading: userLoading,
    fn: fetchUsers,
    data: users,
  } = useFetch(getOrganizationUsers);

  useEffect(() => {
    if (isOpen && orgId) {
      fetchUsers(orgId);
    }
  }, [isOpen, orgId]);

  useEffect(() => {
    if (newIssue) {
      reset();
      onClose();
      onIssueCreated();
      toast.success("Issue created successfully");
    }
  }, [newIssue]);

  const onSubmit = async (data: any) => {
    try {
      await createIssueFn({
        data: {
          ...data,
          sprintId,
          status,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error creating issue", error);
    }
  };
  console.log(projectId);
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Issue</DrawerTitle>
        </DrawerHeader>
        {userLoading && <BarLoader width="100%" color="#36d7b7" />}
        <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter your issue title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.title.message)}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="assignee"
            >
              Assignee
            </label>

            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.assigneeId && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.assigneeId.message)}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="priority"
            >
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {["low", "medium", "high", "urgent"].map(
                      (priority: string) => (
                        <SelectItem
                          className="capitalize"
                          key={priority.toUpperCase()}
                          value={priority.toUpperCase()}
                        >
                          {priority}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={userLoading || createIssueLoading}
          >
            {userLoading
              ? "Loading Assignees..."
              : createIssueLoading
              ? "Creating..."
              : "Create Issue"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateIssue;
