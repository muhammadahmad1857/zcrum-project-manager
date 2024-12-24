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
import Head from "next/head";

const CreateProject = () => {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership, organization } = useOrganization();
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
      <div className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center text-center">
        <span className="text-4xl gradient-title">Admin Access Required</span>
        <p className="text-lg text-gray-500">
          You need to be an organization admin to create projects. Please
          contact your organization&apos;s admin for assistance or switch to the
          correct organization.
        </p>
        <div className="flex items-center sm:flex-row flex-col justify-between gap-2 mt-4">
          <Button
            className="bg-blue-500 text-white transition-all duration-500 hover:-translate-y-2 hover:bg-blue-600"
            size={"lg"}
            onClick={() => router.push("/onboarding")}
          >
            Create Organization
          </Button>
          <OrgSwitcher isCreating={true}/>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Head>
        <title>Create New Project | Project Management</title>
        <meta
          name="description"
          content="Create a new project in your organization and start managing your tasks and team efficiently."
        />
        <meta
          name="keywords"
          content="project management, create project, organization management, team management"
        />
        <meta
          property="og:title"
          content="Create New Project | Project Management"
        />
        <meta
          property="og:description"
          content="Create a new project in your organization and start managing your tasks and team efficiently."
        />
        <meta property="og:url" content="https://example.com/projects/create" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content="Create New Project | Project Management"
        />
        <meta
          property="twitter:description"
          content="Create a new project in your organization and start managing your tasks and team efficiently."
        />
      </Head>
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>
      <div className="flex flex-col md:flex-row px-4 justify-center md:justify-between items-center md:items-start gap-4 md:gap-10 mb-10">
        <p className="text-lg md:text-start text-center  text-gray-500">
          You are creating a project in <strong>{organization?.name}</strong>.
          If you want to switch organizations, please use the switcher below.
        </p>
        <OrgSwitcher isCreating={true} />
      </div>

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
          {errors.name && (
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
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.key.message)}
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
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.description.message)}
            </p>
          )}
        </div>
        <Button
          disabled={loading}
          className={`bg-blue-500 text-white transition-all duration-500 mt-2 hover:-translate-y-2 hover:bg-blue-600 ${
            loading && "cursor-not-allowed opacity-50"
          }`}
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
