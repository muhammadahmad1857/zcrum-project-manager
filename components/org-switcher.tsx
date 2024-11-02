"use client";
import React from "react";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
// import { usePathname } from "next/navigation";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
//   const pathname = usePathname();

  if (!isLoaded || !isUserLoaded) {
    return null;
  }

//   // Determine the organization mode
//   const createOrganizationMode: "navigation" | "modal" = 
//     pathname === "/onboarding" ? "navigation" : "modal";

  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:slug"}
          afterSelectOrganizationUrl={"/organization/:slug"}
        //   createOrganizationMode={createOrganizationMode}
          appearance={{
            elements: {
              organizationSwitcherTrigger: "border border-gray-300 rounded-md px-5 py-2",
              organizationSwitcherTriggerIcon: "text-white",
            },
          }}
          createOrganizationUrl="/onboarding"
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
