// "use client";
// import { Sprint, SprintStatus } from "@prisma/client";
// import { isAfter, isBefore, format, formatDistanceToNow } from "date-fns";
// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import useFetch from "@/hooks/use-fetch";
// import { updateSprintStatus } from "@/actions/sprints";
// import { toast } from "sonner";

// interface Props {
//   sprint: Sprint;
//   setSprint: (sprint: Sprint) => void;
//   sprints: Sprint[];
//   projectId: string;
// }
// const SprintManager = ({ sprint, setSprint, sprints, projectId }: Props) => {
//   const [status, setStatus] = useState(sprint.status);

//   const startDate = new Date(sprint.startDate);
//   const endDate = new Date(sprint.endDate);
//   const now = new Date();
//   const canStart =
//     isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";
//   const canEnd = status === "ACTIVE";

//   const {
//     fn: updateStatusFn,
//     loading,
//     error,
//     data: updatedStatus,
//   } = useFetch(updateSprintStatus);
//   const handleStatusChange = (newStatus: SprintStatus) => {
//     updateStatusFn(sprint.id, newStatus);
//   };
//   useEffect(() => {
// if(updatedStatus && updatedStatus.success){
//     toast.success("Sprint Status Updated Successfully");
//     setStatus(updatedStatus.sprint.status);
//     setSprint({
//         ...sprint,
//         status:updatedStatus.sprint.status
//     });
//   } else if(error){
//     toast.error("Error updating Sprint Status");
//   }

//   }, [updatedStatus, loading]);
//   const handleSprintValueChange = (id: string) => {
//     const selectedSprint: Sprint =
//       sprints.find((s) => s.id === id) || sprints[0];
//     setSprint(selectedSprint);
//     setStatus(selectedSprint.status);
//   };
//   const getStatusText = () => {
//     if (status === "COMPLETED") {
//       return "Sprint Completed";
//     }
//     if (status === "ACTIVE" && isAfter(now, endDate)) {
//       return `Overdue by ${formatDistanceToNow(endDate)}`;
//     }
//     if (status === "PLANNED" && isBefore(now, startDate)) {
//       return `Starts in ${formatDistanceToNow(startDate)}`;
//     }
//     return null;
//   };
//   return (
//     <>
//       <div className="flex justify-between items-center gap-4">
//         <Select value={sprint.id} onValueChange={handleSprintValueChange}>
//           <SelectTrigger className="bg-slate-950 self-start">
//             <SelectValue placeholder="Select Sprint" />
//           </SelectTrigger>
//           <SelectContent>
//             {sprints.map((spr) => (
//               <SelectItem key={spr.id} value={spr.id}>
//                 {spr.name} {format(spr.startDate, "MMM d, yyyy")} to (
//                 {format(spr.startDate, "MMM d, yyyy")})
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         {canStart && (
//           <Button
//             onClick={() => handleStatusChange("ACTIVE")}
//             className="bg-green-500 hover:bg-green-600 transition-colors duration-500 text-white"
//             disabled={loading}
//           >
//             Start Sprint
//           </Button>
//         )}
//         {canEnd && (
//           <Button
//             onClick={() => handleStatusChange("COMPLETED")}
//             variant="destructive"
//             disabled={loading}
//           >
//             End Sprint
//           </Button>
//         )}
//       </div>
//       {getStatusText() && (
//         <Badge className="mt-3 ml-1 self-start">{getStatusText()}</Badge>
//       )}
//     </>
//   );
// };

// export default SprintManager;

"use client";
import { Sprint, SprintStatus } from "@prisma/client";
import { isAfter, isBefore, format, formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { updateSprintStatus } from "@/actions/sprints";
import { toast } from "sonner";
import Loader from "@/components/loader";

interface Props {
  sprint: Sprint;
  setSprint: (sprint: Sprint) => void;
  sprints: Sprint[];
  projectId: string;
}

const SprintManager = ({ sprint, setSprint, sprints, projectId }: Props) => {
  const [status, setStatus] = useState(sprint.status);
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();
  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";
  const canEnd = status === "ACTIVE";

  const {
    fn: updateStatusFn,
    loading,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);

  const handleStatusChange = (newStatus: SprintStatus) => {
    updateStatusFn(sprint.id, newStatus);
  };

  useEffect(() => {
    if (updatedStatus && updatedStatus.success) {
      toast.success("Sprint Status Updated Successfully");
      setStatus(updatedStatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedStatus.sprint.status,
      });
    }
  }, [updatedStatus, loading]);

  const handleSprintValueChange = (id: string) => {
    const selectedSprint: Sprint =
      sprints.find((s) => s.id === id) || sprints[0];
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
    console.log(projectId);
  };

  const getStatusText = () => {
    if (status === "COMPLETED") {
      return "Sprint Completed";
    }
    if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }
    if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Select value={sprint.id} onValueChange={handleSprintValueChange}>
          <SelectTrigger className="bg-slate-950 self-start py-6">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((spr) => (
              <SelectItem key={spr.id} value={spr.id}>
                {spr.name} {format(spr.startDate, "MMM d, yyyy")} to (
                {format(spr.startDate, "MMM d, yyyy")})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {canStart && (
          <Button
            onClick={() => handleStatusChange("ACTIVE")}
            className="bg-green-500 hover:bg-green-600 transition-colors duration-500 text-white"
            disabled={loading}
            size={'lg'}
          >
            {loading ? <Loader /> : "Start Sprint"}
          </Button>
        )}
        {canEnd && (
          <Button
            onClick={() => handleStatusChange("COMPLETED")}
            variant="destructive"
            size={"lg"}
            disabled={loading}
          >
            {loading ? <Loader /> : "End Sprint"}
          </Button>
        )}
      </div>
      {getStatusText() && (
        <Badge className="mt-3 ml-1 self-start">{getStatusText()}</Badge>
      )}
    </>
  );
};

export default SprintManager;
