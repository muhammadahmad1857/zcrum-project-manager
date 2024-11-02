"use client";
import OrgSwitcher from "@/components/org-switcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validation";
import { Input } from "@/components/ui/input";
import { errorToJSON } from "next/dist/server/render";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const CreateProject = () => {
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
const onSubmit = async ()=>{

}

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
          {" "}
          <Input
            id="name"
            className="bg-slate-950 p-5"
            placeholder="Enter Project Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>
        <div>
        <Textarea id="description" className="bg-slate-950 p-5" placeholder="Enter Project description" {...register("description")}/>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p> }
        </div>
    <Button className="bg-blue-500 text-white transition-all duration-500 mt-2 hover:-translate-y-2 hover:bg-blue-600" size={'lg'} type="submit">Create Project</Button>
      </form>
    </div>
  );
};

export default CreateProject;
