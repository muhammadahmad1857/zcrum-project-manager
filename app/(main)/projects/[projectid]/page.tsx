import React from "react";
import { Metadata } from "next";
import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprintBoard";

export const metadata: Metadata = {
  title: "Project Page || ZCRUM - Your very own project manager",
  description: "View and manage your project details and settings.",
};

const Project = async ({ params }: { params: { projectid: string } }) => {
  const { projectid } = params;
  const proj = await getProject(projectid);
  const project = proj.data;
  if (!project) {
    notFound();
  }
  return (
    <div className="container mx-auto">
      {/* Sprint Creation */}
      <SprintCreationForm
        projectTitle={project.name}
        projectId={projectid}
        projectKey={project.key}
        sprintKey={project?.sprints?.length + 1}
      />
      {/*Sprint Board */}
      {project.sprints.length > 0 ? (
        <SprintBoard
          sprints={project.sprints}
          projectId={projectid}
          orgId={project.organizationId}
        />
      ) : (
        <p className="text-lg font-semibold text-gray-400">
          You don&apos;t have any sprint yet. Create a sprint from the above
          button
        </p>
      )}
    </div>
  );
};

export default Project;
