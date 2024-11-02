"use client";
import React from "react";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();
  if (!isLoaded || !isUserLoaded) {
    return null;
  }
  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:slug"}
          afterSelectOrganizationUrl={"/organization/:slug"}
          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
          }
          appearance={{
            elements:{
                organizationSwitcherTrigger:"border border-gray-300 rounded-md px-5 py-2",
                organizationSwitcherTriggerIcon:"text-white",
               
            }

          }}
            createOrganizationUrl="/onboarding"
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
