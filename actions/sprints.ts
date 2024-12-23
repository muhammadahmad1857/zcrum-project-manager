"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { SprintStatus } from "@prisma/client";

export const createSprint = async (
  projectId: string,
  data: { name: string; startDate: string; endDate: string }
) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");
  const project = await db?.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!project || project?.organizationId !== orgId) {
    throw new Error("Project not found or not owned by the organization");
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
  return sprint;
};

export const updateSprintStatus = async (
  sprintId: string,
  newStatus: SprintStatus
) => {
  const { userId, orgId, orgRole } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  try {
    const sprint = await db.sprint.findUnique({
      where: {
        id: sprintId,
      },
      include: { project: true },
    });
    if (!sprint) throw new Error("Sprint not found");
    if (sprint.project.organizationId !== orgId) {
      throw new Error("Unauthorized");
    }
    if (orgRole !== "org:admin") {
      throw new Error("Only organization admins can update sprint status");
    }
    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newStatus === "ACTIVE" && (startDate > now || endDate < now)) {
      throw new Error(
        "Cannot transition to active status. Sprint dates are invalid."
      );
    }
    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
      throw new Error("You can only complete an active project.");
    }
    const updatedSprint = await db.sprint.update({
      where: { id: sprintId },
      data: { status: newStatus },
    });
    return { success: true, sprint: updatedSprint };
  } catch (error:any) {
    throw new Error(error.message);
  }
};
