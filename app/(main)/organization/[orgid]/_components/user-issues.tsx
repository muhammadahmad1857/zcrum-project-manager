import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssueCard from "@/components/issueCard";
import Loader from "@/components/loader";
import { getUserIssues } from "@/actions/issues";

const UserIssues = async ({ userId }: { userId: string }) => {
  const iss: any = await getUserIssues(userId);
  const issues = iss.data;
  if (issues.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold gradient-title mb-4">My Issues</h1>
        <p className="text-lg font-semibold text-gray-400">No Issues Found.</p>
      </div>
    );
  }
  const assignedIssues = issues.filter(
    (issue: any) => issue.assignee?.clerkUserId === userId
  );
  const reportedIssues = issues.filter(
    (issue: any) => issue.reporter?.clerkUserId === userId
  );

  return (
    <>
      <h1 className="text-4xl font-bold gradient-title mb-4">My Issues</h1>
      <Tabs defaultValue="assigned" className="w-full">
        <TabsList>
          <TabsTrigger value="assigned">Assigned To Your</TabsTrigger>
          <TabsTrigger value="reported">Reported to you</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned">
          <Suspense fallback={<Loader />}>
            {assignedIssues.length > 0 ? (
              <IssueGrid issues={assignedIssues} />
            ) : (
              <p className="text-lg font-semibold text-gray-400">
                No Issues assigned to you.
              </p>
            )}{" "}
          </Suspense>
        </TabsContent>
        <TabsContent value="reported">
          {" "}
          <Suspense fallback={<Loader />}>
            {reportedIssues.length > 0 ? (
              <IssueGrid issues={reportedIssues} />
            ) : (
              <p className="text-lg font-semibold text-gray-400">
                No Issues reported to you.
              </p>
            )}{" "}
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};
function IssueGrid({ issues }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {issues.map((issue: any) => (
        <IssueCard key={issue.id} issue={issue} showStatus />
      ))}
    </div>
  );
}
export default UserIssues;
