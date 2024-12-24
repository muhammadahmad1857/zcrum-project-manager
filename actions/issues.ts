// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { Issue } from "@prisma/client";

// export async function getIssuesForSprint(sprintId: string) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized");
//   }

//   const issues = await db.issue.findMany({
//     where: { sprintId: sprintId },
//     orderBy: [{ status: "asc" }, { order: "asc" }],
//     include: {
//       assignee: true,
//       reporter: true,
//     },
//   });

//   return issues;
// }

// export async function createIssue(projectId: string, data: any) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized");
//   }

//   const user = await db.user.findUnique({ where: { clerkUserId: userId } });

//   const lastIssue = await db.issue.findFirst({
//     where: { projectId, status: data.status },
//     orderBy: { order: "desc" },
//   });

//   const newOrder = lastIssue ? lastIssue.order + 1 : 0;

//   const issue = await db.issue.create({
//     data: {
//       title: data.title,
//       description: data.description,
//       status: data.status,
//       priority: data.priority,
//       projectId: projectId,
//       sprintId: data.sprintId,
//       reporterId: user?.id,
//       assigneeId: data.assigneeId || null, // Add this line
//       order: newOrder,
//     },
//     include: {
//       assignee: true,
//       reporter: true,
//     },
//   });

//   return issue;
// }

// export async function updateIssueOrder(updatedIssues: Issue[]) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized");
//   }

//   // Start a transaction
//   await db.$transaction(async (prisma) => {
//     // Update each issue
//     for (const issue of updatedIssues) {
//       await prisma.issue.update({
//         where: { id: issue.id },
//         data: {
//           status: issue.status,
//           order: issue.order,
//         },
//       });
//     }
//   });

//   return { success: true };
// }

// export async function deleteIssue(issueId: string) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized");
//   }

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const issue = await db.issue.findUnique({
//     where: { id: issueId },
//     include: { project: true },
//   });

//   if (!issue) {
//     throw new Error("Issue not found");
//   }

//   if (issue.reporterId !== user.id) {
//     throw new Error("You don't have permission to delete this issue");
//   }

//   await db.issue.delete({ where: { id: issueId } });

//   return { success: true };
// }

// export async function updateIssue(issueId: string, data: any) {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("Unauthorized");
//   }

//   try {
//     const issue = await db.issue.findUnique({
//       where: { id: issueId },
//       include: { project: true },
//     });

//     if (!issue) {
//       throw new Error("Issue not found");
//     }

//     if (issue.project.organizationId !== orgId) {
//       throw new Error("Unauthorized");
//     }

//     const updatedIssue = await db.issue.update({
//       where: { id: issueId },
//       data: {
//         status: data.status,
//         priority: data.priority,
//       },
//       include: {
//         assignee: true,
//         reporter: true,
//       },
//     });

//     return updatedIssue;
//   } catch (error: any) {
//     throw new Error("Error updating issue: " + error.message);
//   }
// }

// export async function getUserIssues(userId: string) {
//   const { orgId } = auth();

//   if (!userId || !orgId) {
//     throw new Error("No user id or organization id found.");
//   }

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }
//   const issues = db.issue.findMany({
//     where: {
//       OR: [{ assigneeId: user.id }, { reporterId: user.id }],
//       project: {
//         organizationId: orgId,
//       },
//     },
//     include: {
//       project: true,
//       assignee: true,
//       reporter: true,
//     },
//     orderBy: { updatedAt: "desc" },
//   });
//   return issues;
// }


"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Issue } from "@prisma/client";

export async function getIssuesForSprint(sprintId: string) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    const issues = await db.issue.findMany({
      where: { sprintId },
      orderBy: [{ status: "asc" }, { order: "asc" }],
      include: { assignee: true, reporter: true },
    });

    return { data: issues };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch issues for sprint" };
  }
}

export async function createIssue(projectId: string, data: any) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return { error: "User not found" };
    }

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
        reporterId: user.id,
        assigneeId: data.assigneeId || null,
        order: newOrder,
      },
      include: { assignee: true, reporter: true },
    });

    return { data: issue };
  } catch (error: any) {
    return { error: error.message || "Failed to create issue" };
  }
}

export async function updateIssueOrder(updatedIssues: Issue[]) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    await db.$transaction(async (prisma) => {
      for (const issue of updatedIssues) {
        await prisma.issue.update({
          where: { id: issue.id },
          data: { status: issue.status, order: issue.order },
        });
      }
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update issue order" };
  }
}

export async function deleteIssue(issueId: string) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return { error: "User not found" };
    }

    const issue = await db.issue.findUnique({
      where: { id: issueId },
      include: { project: true },
    });

    if (!issue) {
      return { error: "Issue not found" };
    }

    if (issue.reporterId !== user.id) {
      return { error: "You don't have permission to delete this issue" };
    }

    await db.issue.delete({ where: { id: issueId } });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete issue" };
  }
}

export async function updateIssue(issueId: string, data: any) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { error: "Unauthorized" };
    }

    const issue = await db.issue.findUnique({
      where: { id: issueId },
      include: { project: true },
    });

    if (!issue) {
      return { error: "Issue not found" };
    }

    if (issue.project.organizationId !== orgId) {
      return { error: "Unauthorized" };
    }

    const updatedIssue = await db.issue.update({
      where: { id: issueId },
      data: {
        status: data.status,
        priority: data.priority,
      },
      include: { assignee: true, reporter: true },
    });

    return { data: updatedIssue };
  } catch (error: any) {
    return { error: error.message || "Failed to update issue" };
  }
}

export async function getUserIssues(userId: string) {
  try {
    const { orgId } = auth();
    if (!userId || !orgId) {
      return { error: "No user ID or organization ID found" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return { error: "User not found" };
    }

    const issues = await db.issue.findMany({
      where: {
        OR: [{ assigneeId: user.id }, { reporterId: user.id }],
        project: { organizationId: orgId },
      },
      include: { project: true, assignee: true, reporter: true },
      orderBy: { updatedAt: "desc" },
    });

    return { data: issues };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch user issues" };
  }
}
