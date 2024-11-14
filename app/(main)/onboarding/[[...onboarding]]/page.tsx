"use client";

import { OrganizationList } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Onboarding() {
  // const { organization } = useOrganization();
  // const router = useRouter();

  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectOrganizationUrl="/organization/:slug"
      />
    </div>
  );
}
