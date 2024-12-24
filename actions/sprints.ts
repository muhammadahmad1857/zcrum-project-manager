

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { SprintStatus } from "@prisma/client";

export async function createSprint(
  projectId: string,
  data: { name: string; startDate: string; endDate: string }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) return { error: "Unauthorized" };

    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.organizationId !== orgId) {
      return { error: "Project not found or not owned by the organization" };
    }

    const sprint = await db.sprint.create({
      data: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        status: "PLANNED",
        projectId,
      },
    });

    return { data: sprint };
  } catch (error: any) {
    return { error: error.message || "Failed to create sprint" };
  }
}

export async function updateSprintStatus(
  sprintId: string,
  newStatus: SprintStatus
) {
  try {
    const { userId, orgId, orgRole } = auth();
    if (!userId || !orgId) return { error: "Unauthorized" };

    const sprint = await db.sprint.findUnique({
      where: { id: sprintId },
      include: { project: true },
    });

    if (!sprint) return { error: "Sprint not found" };
    if (sprint.project.organizationId !== orgId)
      return { error: "Unauthorized" };
    if (orgRole !== "org:admin")
      return { error: "Only admins can update sprint status" };

    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newStatus === "ACTIVE" && (startDate > now || endDate < now)) {
      return { error: "Invalid dates for activating sprint" };
    }

    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
      return { error: "Sprint must be active to complete it" };
    }

    const updatedSprint = await db.sprint.update({
      where: { id: sprintId },
      data: { status: newStatus },
    });

    return { data: updatedSprint };
  } catch (error: any) {
    return { error: error.message || "Failed to update sprint status" };
  }
}
