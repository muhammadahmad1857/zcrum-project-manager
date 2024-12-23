"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
interface Data {
  name: string;
  description: string;
  key: string;
}
export const createProject = async (data: Data) => {
  const { userId, orgId } = auth();
  if (!userId) throw new Error("Unauthorized");
  if (!orgId) throw new Error("No organization selected");
  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });
  const userMembership = membership.find(
    (member) => member.publicUserData?.userId === userId
  );
  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db?.project.create({
      data: {
        name: data.name,
        organizationId: orgId,
        description: data.description,
        key: data.key,
      },
    });
    return project;
  } catch (error: any) {
    throw new Error("Error creating project", error.message);
  }
};

export const getProjects = async (orgId: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");
  const projects = await db?.project.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: { createdAt: "desc" },
  });
  return projects;
};

export const deleteProject = async (projectId: string) => {
  const { userId, orgId, orgRole } = auth();
  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }
  if (orgRole !== "org:admin") {
    throw new Error("Only organization admins can delete projects.");
  }
  const project = await db?.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!project || project.organizationId !== orgId) {
    throw new Error(
      "Project not found or you don't have permission to delete it."
    );
  }
  await db?.project.delete({
    where: {
      id: projectId,
    },
  });
  return { success: true };
};

export const getProject = async (projectId: string) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found.");
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      sprints: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if(!project){
    return null
  };
  if(project.organizationId !== orgId){
    return null
  }
  return project
};
