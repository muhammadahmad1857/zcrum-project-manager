import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const projectList = async ({ orgId }: { orgId: string }) => {
  const projects = await getProjects(orgId);
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-900 rounded-2xl border-2 border-gray-700 cursor-pointer hover:bg-gray-950 transition-colors duration-500">
        <h2 className="text-lg font-semibold mb-4">
          No projects found for this organization
        </h2>
        <p>
          It&apos;s quiet for now, but you can start creating projects right
          away!
        </p>
        <Link
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 transition-colors duration-500 text-white font-bold py-2 px-4 rounded"
          href={"/projects/create"}
        >
          Create new project
        </Link>
      </div>
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
