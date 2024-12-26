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
