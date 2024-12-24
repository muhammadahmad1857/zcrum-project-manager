"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const getOrganizations = async (slug: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await db?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const organization = await clerkClient().organizations.getOrganization({
    slug,
  });
  if (!organization) {
    return null;
  }

  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: organization.id,
    });
  const userMembership = membership.find(
    (member) => member.publicUserData?.userId === userId
  );
  if (!userMembership) {
    return null;
  }
  return organization;
};

export const getOrganizationUsers = async (orgId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db?.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const organizationMembership =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  // Check if the user is the only member
  const userIds = organizationMembership.data
    .map((member) => member.publicUserData?.userId)
    .filter((id): id is string => !!id);


  // Fetch all users if there are multiple members
  const users = await db?.user.findMany({
    where: {
      clerkUserId: { in: userIds },
    },
  });
  return users;
};
