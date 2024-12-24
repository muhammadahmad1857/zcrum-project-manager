"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Issue, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  onFilterChange: (newFilteredIssues: Issue[]) => void;
  issues: (Issue & { assignee?: User })[]; // Issue with optional User relationship
}

const priorities: string[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const BoardFilters = ({ onFilterChange, issues }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  const assignees = issues
    .map((issue: Issue & { assignee?: User }) => issue.assignee)
    .filter(
      (item: User | undefined, index: number, self: (User | undefined)[]) =>
        item && index === self.findIndex((t) => t?.id === item.id)
    ) as User[]; // Filter undefined and ensure uniqueness

  const isFilterApplied =
    searchTerm !== "" ||
    selectedAssignees.length > 0 ||
    selectedPriority !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAssignees([]);
    setSelectedPriority("");
  };

  useEffect(() => {
    const filteredIssues = issues.filter(
      (issue: Issue & { assignee?: User }) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAssignees.length === 0 ||
          (issue.assignee && selectedAssignees.includes(issue.assignee.id))) &&
        (selectedPriority === "" || issue.priority === selectedPriority)
    );
    onFilterChange(filteredIssues); // Call the onFilterChange prop with the filtered issues
  }, [searchTerm, selectedAssignees, selectedPriority, issues, onFilterChange]);
  const toggleAssignee = (assigneeId:string) => {
    setSelectedAssignees((prev) => prev.includes(assigneeId)?prev.filter((id) => id !== assigneeId):[...prev,assigneeId]);
  };
  return (
    <div>
      <div className="flex flex-col pr-2 sm:flex-row gap-4 sm:gap-6 mt-6">
        <Input
          className="w-full sm:w-72"
          type="text"
          placeholder="Search for an issue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex-shrink-0">
          <div className="flex gap-2 flex-wrap">
            {assignees.map((assignee: User, i: number) => {
              const selected = selectedAssignees.includes(assignee.id);
              return (
                <div
                  key={i}
                  className={`rounded-full ring ${
                    selected ? "ring-blue-600" : "ring-black"
                  } ${
                    i > 0 ? "-ml-6 hover:ml-0 transition-all duration-500" : ""
                  }`}
                  style={{
                    zIndex: i,
                  }}
                  onClick={() => toggleAssignee(assignee.id)}
                >
                  <Avatar className="size-10">
                    <AvatarImage src={assignee.imageUrl || ""} />
                    <AvatarFallback>
                      {assignee.name ? assignee.name[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              );
            })}
          </div>
        </div>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-ful sm:w-52">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority, i) => (
              <SelectItem key={i} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isFilterApplied && (
          <Button
            className="flex items-center"
            onClick={clearFilters}
            variant={"ghost"}
          >
            <X className="size-4" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardFilters;
