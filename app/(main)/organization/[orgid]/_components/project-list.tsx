import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const projectList = async ({ orgId }: { orgId: string }) => {
  const projects = await getProjects(orgId);
  if (projects.length === 0) {
    return (
      <p>
        No projects found for this organization{"  "}
        <Link
          className="underline underline-offset-2 text-blue-200"
          href={"/projects/create"}
        >
          Create new...
        </Link>
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
            <Link
              className="hover:underline transition-all duration-500 text-blue-500"
              href={`/projects/${project.id}`}
            >
              View Project
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default projectList;
