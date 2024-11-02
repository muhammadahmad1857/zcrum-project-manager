import { getOrganizations } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import React from "react";

const Organization = async ({ params }: { params: { orgid: string } }) => {
  const { orgid } = params;
  const organization = await getOrganizations(orgid);
  console.log(organization);
  if (!organization) {
    return <div>Organization not found</div>;
  }
  return (
    <div className="mx-auto container">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&apos;s projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className="mb-4">Show org projects</div>
      <div className="mb-4">Show user assigned and reported issue her8</div>
    </div>
  );
};

export default Organization;
