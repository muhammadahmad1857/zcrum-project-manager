
"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data: {
  name: string;
  description: string;
  key: string;
}) {
  try {
    const { userId, orgId } = auth();
    if (!userId) return { error: "Unauthorized" };
    if (!orgId) return { error: "No organization selected" };

    const { data: membership } =
      await clerkClient().organizations.getOrganizationMembershipList({
        organizationId: orgId,
      });

    const userMembership = membership.find(
      (member) => member.publicUserData?.userId === userId
    );
    if (!userMembership || userMembership.role !== "org:admin") {
      return { error: "Only organization admins can create projects" };
    }

    const project = await db.project.create({
      data: {
        name: data.name,
        organizationId: orgId,
        description: data.description,
        key: data.key,
      },
    });

    return { data: project };
  } catch (error: any) {
    return { error: error.message || "Failed to create project" };
  }
}

export async function getProjects(orgId: string) {
  try {
    const { userId } = auth();
    if (!userId) return { error: "Unauthorized" };

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) return { error: "User not found" };

    const projects = await db.project.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
    });

    return { data: projects };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch projects" };
  }
}

export async function deleteProject(projectId: string) {
  try {
    const { userId, orgId, orgRole } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }
    if (orgRole !== "org:admin") {
      return { error: "Only organization admins can delete projects" };
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
    });
    if (!project || project.organizationId !== orgId) {
      return { error: "Project not found or permission denied" };
    }

    await db.project.delete({
      where: { id: projectId },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete project" };
  }
}

export async function getProject(projectId: string) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        sprints: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project || project.organizationId !== orgId) {
      return { error: "Project not found or permission denied" };
    }

    return { data: project };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch project details" };
  }
}
