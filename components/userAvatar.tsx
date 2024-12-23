import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Avatar className="size-6">
        <AvatarImage src={user?.imageUrl || undefined} alt={user?.name || undefined} />
        <AvatarFallback className="capitalize">
          {user ? user?.name : "?"}
        </AvatarFallback>
      </Avatar>
      <span className="text-xs text-gray-500">
        {user ? user.name : "Unassigned"}
      </span>
    </div>
  );
};

export default UserAvatar;
