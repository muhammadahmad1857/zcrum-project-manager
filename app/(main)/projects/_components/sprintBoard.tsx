"use client";
import { Sprint } from "@prisma/client";
import React, { useState } from "react";
import SprintManager from "./sprint-manager";
interface SprintBoardProps {
  sprints: Sprint[];
  projectId: string;
  orgId: string;
}
const SprintBoard = ({ sprints, projectId, orgId }: SprintBoardProps) => {
  const [currentSprint, setCurrentSprint] = useState<Sprint>(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );
  console.log(orgId)
  return (
    <div>
      {/* Sprint Manager */}
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />
      {/* Kanban Board */}
      
    </div>
  );
};

export default SprintBoard;
