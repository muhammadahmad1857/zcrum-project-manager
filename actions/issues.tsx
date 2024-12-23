"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createIssue = async (projectId: string, data: any) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  const lastIssue = await db.issue.findFirst({
    where: { projectId, status: data.status },
    orderBy: { order: "desc" },
  });
  const newOrder = lastIssue ? lastIssue.order + 1 : 0;
  const issue = await db.issue.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      projectId,
      sprintId: data.sprintId,
      reporterId: user?.id,
      order: newOrder,
      assigneeId: data.assigneeId || null,
    },
    include: {
      assignee: true,
      reporter: true,
    },
  });
  return issue;
};

export const getIssuesForSprint = async (sprintId: string) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  const Issues = await db.issue.findMany({
    where: { sprintId },
    include: {
      assignee: true,
      reporter: true,
    },
    orderBy: [{ status: "asc" }, { order: "asc" }],
  });
  return Issues;
};
