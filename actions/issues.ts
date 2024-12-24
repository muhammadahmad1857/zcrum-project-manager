"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Issue } from "@prisma/client";

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

export async function updateIssueOrder(updatedIssues: Issue[]) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  await db.$transaction(async (prisma) => {
    for (const issue of updatedIssues) {
      await prisma.issue.update({
        where: { id: issue.id },
        data: { order: issue.order, status: issue.status },
      });
    }
  });
  return { success: true };
}

export async function deleteIssue(issueId: string) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found.");

  const issue = await db.issue.findUnique({
    where: { id: issueId },
    include: { project: true },
  });
  if (!issue) throw new Error("Issue not found.");

  if(issue.reporterId !== user.id ) {
    throw new Error("You don't have permission to delete the issue.")
  }
  await db.issue.delete({ where: { id: issueId } });

  return { success: true };
}

export async function updateIssue(issueId: string) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) throw new Error("Unauthorized");
  try {
    
    
  const issue = await db.issue.findUnique({
    where: { id: issueId },
    include: { project: true },
  });
  if (!issue) throw new Error("Issue not found.");

  if(issue.project.organizationId!==orgId){
    throw new Error("Unauthorized")
  }

  const updatedIssue = db.issue.update({
    where: { id: issueId },
    data: {
     
      status: issue.status,
      priority: issue.priority,
    
    },
    include: {
      assignee: true,
      reporter: true,
    },
  })
return updatedIssue
  
} catch (error:any) {
    throw new Error("Error Updating issue"+error.message)
    
  }
}