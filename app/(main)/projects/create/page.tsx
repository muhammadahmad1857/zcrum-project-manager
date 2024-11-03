"use client";
import OrgSwitcher from "@/components/org-switcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createProject } from "@/actions/projects";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const CreateProject = () => {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    data: project,
    loading,
    // error,
    fn: createProjectFn,
  } = useFetch(createProject);

  useEffect(() => {
    if (project) {
      toast.success("Project Created Successfully");
      router.push(`/projects/${project.id}`);
    }
  }, [loading]);
  const onSubmit = async (data: any) => {
    createProjectFn(data);
  };
  if (!isOrgLoaded || !isUserLoaded) return null;

  if (!isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-50px)] text-center flex-col gap-2 items-center justify-center">
        <span className="text-4xl gradient-title">
          Oops! Only Admins can create projects.
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {" "}
          <Input
            id="name"
            className="bg-slate-950 p-5"
            placeholder="Enter Project Name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.name.message)}
            </p>
          )}
        </div>
        <div>
          {" "}
          <Input
            id="key"
            className="bg-slate-950 p-5"
            placeholder="Enter Project Key"
            {...register("key")}
          />
          {errors.key?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.key?.message)}
            </p>
          )}
        </div>
        <div>
          <Textarea
            id="description"
            className="bg-slate-950 p-5"
            placeholder="Enter Project description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.description.message)}
            </p>
          )}
        </div>
        <Button
          disabled={loading ? true : false}
          className="bg-blue-500 text-white transition-all duration-500 mt-2 hover:-translate-y-2 hover:bg-blue-600"
          size={"lg"}
          type="submit"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
