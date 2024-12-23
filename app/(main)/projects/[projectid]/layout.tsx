import UserLoading from "@/components/user-loading";
import React, { Suspense } from "react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto">
      <Suspense fallback={<UserLoading />}
      > {children}</Suspense>
    </div>
  );
};

export default ProjectLayout;
