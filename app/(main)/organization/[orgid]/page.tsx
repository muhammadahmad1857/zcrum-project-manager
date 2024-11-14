import { getOrganizations } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import React from "react";
import ProjectList from "./_components/project-list";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organization Page || ZCRUM - Your very own project manager',
  description: 'View and manage your organization\'s projects and settings.',
};

const Organization = async ({ params }: { params: { orgid: string } }) => {
  const { orgid } = params;
  const organization = await getOrganizations(orgid);
  console.log(organization);
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
      <div className="mb-4">Show user assigned and reported issue here</div>
    </div>
  );
};

export default Organization;
