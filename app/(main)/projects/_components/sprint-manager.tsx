// // "use client";
// // import { Sprint, SprintStatus } from "@prisma/client";
// // import { isAfter, isBefore, format, formatDistanceToNow } from "date-fns";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import useFetch from "@/hooks/use-fetch";
// // import { updateSprintStatus } from "@/actions/sprints";
// // import { toast } from "sonner";

// // interface Props {
// //   sprint: Sprint;
// //   setSprint: (sprint: Sprint) => void;
// //   sprints: Sprint[];
// //   projectId: string;
// // }
// // const SprintManager = ({ sprint, setSprint, sprints, projectId }: Props) => {
// //   const [status, setStatus] = useState(sprint.status);

// //   const startDate = new Date(sprint.startDate);
// //   const endDate = new Date(sprint.endDate);
// //   const now = new Date();
// //   const canStart =
// //     isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";
// //   const canEnd = status === "ACTIVE";

// //   const {
// //     fn: updateStatusFn,
// //     loading,
// //     error,
// //     data: updatedStatus,
// //   } = useFetch(updateSprintStatus);
// //   const handleStatusChange = (newStatus: SprintStatus) => {
// //     updateStatusFn(sprint.id, newStatus);
// //   };
// //   useEffect(() => {
// // if(updatedStatus && updatedStatus.success){
// //     toast.success("Sprint Status Updated Successfully");
// //     setStatus(updatedStatus.sprint.status);
// //     setSprint({
// //         ...sprint,
// //         status:updatedStatus.sprint.status
// //     });
// //   } else if(error){
// //     toast.error("Error updating Sprint Status");
// //   }

// //   }, [updatedStatus, loading]);
// //   const handleSprintValueChange = (id: string) => {
// //     const selectedSprint: Sprint =
// //       sprints.find((s) => s.id === id) || sprints[0];
// //     setSprint(selectedSprint);
// //     setStatus(selectedSprint.status);
// //   };
// //   const getStatusText = () => {
// //     if (status === "COMPLETED") {
// //       return "Sprint Completed";
// //     }
// //     if (status === "ACTIVE" && isAfter(now, endDate)) {
// //       return `Overdue by ${formatDistanceToNow(endDate)}`;
// //     }
// //     if (status === "PLANNED" && isBefore(now, startDate)) {
// //       return `Starts in ${formatDistanceToNow(startDate)}`;
// //     }
// //     return null;
// //   };
// //   return (
// //     <>
// //       <div className="flex justify-between items-center gap-4">
// //         <Select value={sprint.id} onValueChange={handleSprintValueChange}>
// //           <SelectTrigger className="bg-slate-950 self-start">
// //             <SelectValue placeholder="Select Sprint" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             {sprints.map((spr) => (
// //               <SelectItem key={spr.id} value={spr.id}>
// //                 {spr.name} {format(spr.startDate, "MMM d, yyyy")} to (
// //                 {format(spr.startDate, "MMM d, yyyy")})
// //               </SelectItem>
// //             ))}
// //           </SelectContent>
// //         </Select>
// //         {canStart && (
// //           <Button
// //             onClick={() => handleStatusChange("ACTIVE")}
// //             className="bg-green-500 hover:bg-green-600 transition-colors duration-500 text-white"
// //             disabled={loading}
// //           >
// //             Start Sprint
// //           </Button>
// //         )}
// //         {canEnd && (
// //           <Button
// //             onClick={() => handleStatusChange("COMPLETED")}
// //             variant="destructive"
// //             disabled={loading}
// //           >
// //             End Sprint
// //           </Button>
// //         )}
// //       </div>
// //       {getStatusText() && (
// //         <Badge className="mt-3 ml-1 self-start">{getStatusText()}</Badge>
// //       )}
// //     </>
// //   );
// // };

// // export default SprintManager;

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
// import Loader from "@/components/loader";

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
//     data: updatedStatus,
//   } = useFetch(updateSprintStatus);

//   const handleStatusChange = (newStatus: SprintStatus) => {
//     updateStatusFn(sprint.id, newStatus);
//   };

//   useEffect(() => {
//     if (updatedStatus && updatedStatus.success) {
//       toast.success("Sprint Status Updated Successfully");
//       setStatus(updatedStatus.sprint.status);
//       setSprint({
//         ...sprint,
//         status: updatedStatus.sprint.status,
//       });
//     }
//   }, [updatedStatus, loading]);

//   const handleSprintValueChange = (id: string) => {
//     const selectedSprint: Sprint =
//       sprints.find((s) => s.id === id) || sprints[0];
//     setSprint(selectedSprint);
//     setStatus(selectedSprint.status);
//     console.log(projectId);
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
//             {loading ? <Loader /> : "Start Sprint"}
//           </Button>
//         )}
//         {canEnd && (
//           <Button
//             onClick={() => handleStatusChange("COMPLETED")}
//             variant="destructive"
//             disabled={loading}
//           >
//             {loading ? <Loader /> : "End Sprint"}
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

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";

import { sprintSchema } from "@/app/lib/validation";
import useFetch from "@/hooks/use-fetch";
import { createSprint } from "@/actions/sprints";
import { toast } from "sonner";

interface PropsInterface {
  projectId: string;
  sprintKey: number;
  projectTitle: string;
  projectKey: string;
}

export default function SprintCreationForm({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}: PropsInterface) {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const router = useRouter();

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await createSprintFn(projectId, {
        ...data,
        startDate: dateRange.from,
        endDate: dateRange.to,
      });
      setShowForm(false);
      toast.success("Sprint created successfully!");
      router.refresh(); // Refresh the page to show updated data
    } catch (error: any) {
      console.error("Error creating sprint", error);
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={!showForm ? "default" : "destructive"}
        >
          {!showForm ? "Create New Sprint" : "Cancel"}
        </Button>
      </div>
      {showForm && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-4 items-end"
            >
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Sprint Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  readOnly
                  className="bg-slate-950"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal bg-slate-950 ${
                            !dateRange && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from && dateRange.to ? (
                            format(dateRange.from, "LLL dd, y") +
                            " - " +
                            format(dateRange.to, "LLL dd, y")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto bg-slate-900"
                        align="start"
                      >
                        <DayPicker
                          mode="range"
                          disabled={[{ before: new Date() }]}
                          selected={dateRange}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange(range);
                              setValue("startDate", range.from);
                              setValue("endDate", range.to);
                              field.onChange(range.from); // Update form's start date
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={createSprintLoading}>
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
