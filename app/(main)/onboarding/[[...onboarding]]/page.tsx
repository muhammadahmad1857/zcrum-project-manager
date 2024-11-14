import { OrganizationList } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Onboarding || ZCRUM - Your very own project manager',
  description: 'Get started with ZCRUM by selecting or creating an organization.'
};

export default function Onboarding() {
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
