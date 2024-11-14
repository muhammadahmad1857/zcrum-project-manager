import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Page || ZCRUM - Your very own project manager",
  description: "View and manage your project details and settings.",
};

const Project = ({ params }: { params: { projectid: string } }) => {
  const id = params.projectid;
  return <div>{id}</div>;
};

export default Project;
