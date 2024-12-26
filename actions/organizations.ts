"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganizations(slug: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const organization = await clerkClient().organizations.getOrganization({ slug });

    if (!organization) {
      return { error: "Organization not found" };
    }

    const { data: membership } =
      await clerkClient().organizations.getOrganizationMembershipList({
        organizationId: organization.id,
      });

    const userMembership = membership.find(
      (member) => member.publicUserData?.userId === userId
    );

    if (!userMembership) {
      return { error: "User is not a member of this organization" };
    }

    return { data: organization };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch organization details" };
  }
}

export async function getOrganizationUsers(orgId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const organizationMembership =
      await clerkClient().organizations.getOrganizationMembershipList({
        organizationId: orgId,
      });

    // Filter out undefined values
    const userIds = organizationMembership.data
      .map((member) => member.publicUserData?.userId)
      .filter((id): id is string => id !== undefined); // Type guard to ensure only strings
if(userIds.length <=0){
    return { error: "No users found."};


}
    const users = await db.user.findMany({
      where: {
        clerkUserId: { in: userIds },
      },
    });

    return { data: users };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch organization users" };
  }
}
