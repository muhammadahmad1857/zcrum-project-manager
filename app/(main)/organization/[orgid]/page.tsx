import { getOrganizations } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import React from "react";
import ProjectList from "./_components/project-list";
import type { Metadata } from "next";
import UserIssues from "./_components/user-issues";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Organization Page || ZCRUM - Your very own project manager",
  description: "View and manage your organization's projects and settings.",
};

const Organization = async ({ params }: { params: { orgid: string } }) => {
  const { orgid } = params;
  const organization = await getOrganizations(orgid);
  const { userId } = auth();
  if(!userId){
    redirect("/sign-in")
  }
  if (!organization) {
    return <div>Organization not found</div>;
  }
  return (
    <div className="mx-auto container">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center sm:items-start">
        <h1 className="text-5xl text-center font-bold gradient-title mb-10">
          {organization.name}&apos;s projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className="mb-4">
        <ProjectList orgId={organization.id} />
      </div>
      <div className="mt-8">
        <UserIssues userId={userId} />
      </div>
    </div>
  );
};

export default Organization;
