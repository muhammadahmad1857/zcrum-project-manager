"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import UserAvatar from "./userAvatar";
import { formatDistanceToNow } from "date-fns";
import { Issue, IssuePriority, User } from "@prisma/client";
import IssueDetailDialog from "./issue-detail-dialog";
import { useRouter } from "next/navigation";

// Define the IssueCard Props
interface IssueCardProps {
  issue: Issue & { assignee?: User }; // Issue with optional User relationship
  showStatus?: boolean;
  onDelete?: (issues: Issue[]) => void;
  onUpdate?: (issues: Issue[]) => void;
}

// Define the IssueDetailDialog Props

// Map priorities to CSS classes
const priorityColor: Record<IssuePriority, string> = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
  });

  const router = useRouter();

  const onDeleteHandler = (issues: Issue[]) => {
    router.refresh();
    onDelete(issues);
  };

  const onUpdateHandler = (issues: Issue[]) => {
    router.refresh();
    onUpdate(issues);
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-2 ${priorityColor[issue.priority]} rounded-lg`}
        >
          <CardTitle>{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 -mt-3">
          {showStatus && <Badge>{issue.status}</Badge>}
          <Badge variant="outline" className="-ml-1">
            {issue.priority.toUpperCase()}
          </Badge>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-3">
          {issue.assignee && <UserAvatar user={issue.assignee} />}
          <div className="text-xs text-gray-400 w-full">Created: {created}</div>
        </CardFooter>
      </Card>
      {isDialogOpen && (
        <IssueDetailDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          issue={issue}
          onDelete={onDeleteHandler}
          onUpdate={onUpdateHandler}
          borderColor={priorityColor[issue.priority]}
        />
      )}
    </>
  );
};

export default IssueCard;
