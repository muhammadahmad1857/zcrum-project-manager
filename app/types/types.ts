// Enums
export enum SprintStatus {
    PLANNED = "PLANNED",
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
  }
  
  // Related Types
  export interface Project {
    id: string;
    name: string;
    key: string;
    description?: string;
    organizationId: string;
    sprints?: Sprint[];
    issues?: Issue[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Issue {
    id: string;
    title: string;
    description?: string;
    status: IssueStatus;
    order: number;
    priority: IssuePriority;
    assignee?: User | null;
    assigneeId?: string | null;
    reporter?: User | null;
    reporterId?: string | null;
    project: Project;
    projectId: string;
    sprint?: Sprint | null;
    sprintId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum IssueStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
  }
  
  export enum IssuePriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT",
  }
  
  export interface User {
    id: string;
    clerkUserId: string;
    email: string;
    name?: string | null;
    imageUrl?: string | null;
    createdIssues?: Issue[]; // Issues where the user is the reporter
    assignedIssues?: Issue[]; // Issues where the user is the assignee
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Sprint Type
  export interface Sprint {
    id: string; // Unique identifier for the sprint
    name: string; // Sprint name
    startDate: Date; // Start date of the sprint
    endDate: Date; // End date of the sprint
    status: SprintStatus; // Status of the sprint
    project: Project; // Associated project
    projectId: string; // Foreign key for the associated project
    issues?: Issue[]; // List of issues linked to the sprint
    createdAt: Date; // Timestamp for sprint creation
    updatedAt: Date; // Timestamp for the last sprint update
  }
  