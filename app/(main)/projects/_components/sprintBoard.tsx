// "use client";
// import { Issue, Sprint } from "@prisma/client";
// import React, { useEffect, useState } from "react";
// import SprintManager from "./sprint-manager";
// import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
// import statuses from "@/data/status.json";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import CreateIssue from "./create-issue";
// import useFetch from "@/hooks/use-fetch";
// import { getIssuesForSprint } from "@/actions/issues";
// import { BarLoader } from "react-spinners";
// import IssueCard from "@/components/issueCard";
// import { toast } from "sonner";

// interface SprintBoardProps {
//   sprints: Sprint[];
//   projectId: string;
//   orgId: string;
// }

// const reOrder = (list: any[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
// };
// const SprintBoard = ({ sprints, projectId, orgId }: SprintBoardProps) => {
//   const [currentSprint, setCurrentSprint] = useState<Sprint>(
//     sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
//   );
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

//   const {
//     loading: issueLoading,
//     error: issuesError,
//     fn: fetchIssues,
//     data: issues,
//     setData: setIssues,
//   } = useFetch(getIssuesForSprint);
//   useEffect(() => {
//     if (currentSprint.id) {
//       fetchIssues(currentSprint.id);
//     }
//   }, [currentSprint.id]);
//   const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues);

//   const onDragEnd = (result: any) => {
//     if (currentSprint.status === "PLANNED") {
//       toast.warning("Start the sprint to update board");
//       return;
//     }
//     if (currentSprint.status === "COMPLETED") {
//       toast.warning("Cannot update board after sprint end");
//       return;
//     }
//     const { destination, source } = result;
//     if (!destination) return;
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const newOrderedData = [...issues];
//     const sourceList = newOrderedData.filter(
//       (list: Issue) => list.status === source.droppableId
//     );
//     const destinationList = newOrderedData.filter(
//       (list: Issue) => list.status === destination.droppableId
//     );
//     if (source.droppableId === destination.droppableId) {
//       const reorderedCards: any = reOrder(
//         sourceList,
//         source.index,
//         destination.index
//       );
//       reorderedCards.forEach((card: any, i: number) => {
//         card.order = i;
//       });
//     }
//     const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
//     setIssues([newOrderedData, sortedIssues]);
//   };
//   const handleIssueCreated = () => {
//     fetchIssues(currentSprint.id);
//   };
//   const handleAddIssue = (status: string) => {
//     setSelectedStatus(status);
//     setIsDrawerOpen(true);
//   };
//   if (issuesError) return <div>Error Loading Issues</div>;
//   return (
//     <div>
//       {/* Sprint Manager */}
//       <SprintManager
//         sprint={currentSprint}
//         setSprint={setCurrentSprint}
//         sprints={sprints}
//         projectId={projectId}
//       />
//       {issueLoading && (
//         <BarLoader className="mt-4" width="100%" color="#36d7b7" />
//       )}

//       {/* Kanban Board */}
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 bg-slate-900 p-4 gap-4 rounded-lg">
//           {statuses.map((column) => {
//             return (
//               <Droppable key={column.key} droppableId={column.key}>
//                 {(provided) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="space-y-2"
//                   >
//                     <h3 className="font-semibold mb-2 text-xl text-center">
//                       {column.name}
//                     </h3>
//                     {/* Issues */}
//                     {issues
//                       .filter((issue: Issue) => issue.status === column.key)
//                       .map((issue: Issue, index: number) => (
//                         <Draggable
//                           key={issue.id}
//                           draggableId={issue.id}
//                           index={index}
//                         >
//                           {(provided) => {
//                             return (
//                               <div
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 ref={provided.innerRef}
//                               >
//                                 <IssueCard issue={issue} />
//                               </div>
//                             );
//                           }}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                     {column.key === "TODO" &&
//                       currentSprint.status !== "COMPLETED" && (
//                         <Button
//                           className="w-full"
//                           variant={"ghost"}
//                           onClick={() => handleAddIssue(column.key)}
//                         >
//                           <Plus className="mr-2 size-4" />
//                           Create Issue
//                         </Button>
//                       )}
//                   </div>
//                 )}
//               </Droppable>
//             );
//           })}
//         </div>
//       </DragDropContext>
//       <CreateIssue
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         status={selectedStatus}
//         projectId={projectId}
//         orgId={orgId}
//         onIssueCreated={handleIssueCreated}
//         sprintId={currentSprint.id}
//       />
//     </div>
//   );
// };

// export default SprintBoard;

"use client";

import { Issue, Sprint } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SprintManager from "./sprint-manager";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import statuses from "@/data/status.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateIssue from "./create-issue";
import useFetch from "@/hooks/use-fetch";
import { getIssuesForSprint } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssueCard from "@/components/issueCard";
import { toast } from "sonner";

// Define the types for statuses
interface Status {
  key: string;
  name: string;
}

interface SprintBoardProps {
  sprints: Sprint[];
  projectId: string;
  orgId: string;
}

// Function to reorder items in the list
const reOrder = (
  list: Issue[],
  startIndex: number,
  endIndex: number
): Issue[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const SprintBoard = ({ sprints, projectId, orgId }: SprintBoardProps) => {
  const [currentSprint, setCurrentSprint] = useState<Sprint>(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const {
    loading: issueLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  useEffect(() => {
    if (currentSprint.id) {
      fetchIssues(currentSprint.id);
    }
  }, [currentSprint.id, fetchIssues]);

  const onDragEnd = (result: DropResult) => {
    if (currentSprint.status === "PLANNED") {
      toast.warning("Start the sprint to update the board");
      return;
    }
    if (currentSprint.status === "COMPLETED") {
      toast.warning("Cannot update the board after sprint ends");
      return;
    }

    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOrderedData = [...(issues || [])];
    const sourceList = newOrderedData.filter(
      (item: Issue) => item.status === source.droppableId
    );
    const destinationList = newOrderedData.filter(
      (item: Issue) => item.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reOrder(
        sourceList,
        source.index,
        destination.index
      );
      reorderedCards.forEach((card, i) => {
        card.order = i;
      });
    }

    const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
    setIssues(sortedIssues);
  };

  const handleIssueCreated = () => {
    fetchIssues(currentSprint.id);
  };

  const handleAddIssue = (status: string) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };

  if (issuesError) return <div>Error Loading Issues</div>;

  return (
    <div>
      {/* Sprint Manager */}
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />
      {issueLoading && (
        <BarLoader className="mt-4" width="100%" color="#36d7b7" />
      )}

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 bg-slate-900 p-4 gap-4 rounded-lg">
          {(statuses as Status[]).map((column) => (
            <Droppable key={column.key} droppableId={column.key}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  <h3 className="font-semibold mb-2 text-xl text-center">
                    {column.name}
                  </h3>
                  {/* Issues */}
                  {(issues || [])
                    .filter((issue: Issue) => issue.status === column.key)
                    .map((issue: Issue, index: number) => (
                      <Draggable
                        key={issue.id}
                        draggableId={issue.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <IssueCard issue={issue} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {column.key === "TODO" &&
                    currentSprint.status !== "COMPLETED" && (
                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={() => handleAddIssue(column.key)}
                      >
                        <Plus className="mr-2 size-4" />
                        Create Issue
                      </Button>
                    )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <CreateIssue
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        status={selectedStatus}
        projectId={projectId}
        orgId={orgId}
        onIssueCreated={handleIssueCreated}
        sprintId={currentSprint.id}
      />
    </div>
  );
};

export default SprintBoard;
