"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEmployerInterviews,
  useInterviewDetails,
  useRescheduleInterview,
  useCancelInterview,
} from "@/modules/employer/hooks/use-employer";

export default function EmployerInterviewsPage() {
  const [selectedInterviewId, setSelectedInterviewId] =
    useState("");

  const { data, isLoading } =
    useEmployerInterviews(1);

  const {
    data: interviewDetails,
    isLoading: detailsLoading,
  } = useInterviewDetails(selectedInterviewId);

  const rescheduleMutation =
    useRescheduleInterview();

  const cancelMutation =
    useCancelInterview();

  const [newSlotStart, setNewSlotStart] =
    useState("");

  const [newSlotEnd, setNewSlotEnd] =
    useState("");

  async function handleReschedule() {
    if (!selectedInterviewId) return;

    try {
      await rescheduleMutation.mutateAsync({
        interviewId: selectedInterviewId,
        payload: {
          newSlotStart: new Date(
            newSlotStart
          ).toISOString(),
          newSlotEnd: new Date(
            newSlotEnd
          ).toISOString(),
          reason: "",
        },
      });

      alert("Interview rescheduled");
    } catch (error) {
      console.error(error);
      alert("Reschedule failed");
    }
  }

  async function handleCancel() {
    if (!selectedInterviewId) return;

    const confirmed = window.confirm(
      "Cancel this interview?"
    );

    if (!confirmed) return;

    try {
      await cancelMutation.mutateAsync(
        selectedInterviewId
      );

      alert("Interview cancelled");
    } catch (error) {
      console.error(error);
      alert("Cancel failed");
    }
  }

  const interviews = data?.data || [];

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT */}
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Interviews
        </h1>

        {isLoading ? (
          <div>Loading interviews...</div>
        ) : interviews.length === 0 ? (
          <div>No interviews found</div>
        ) : (
          <div className="space-y-4">
            {interviews.map((item: any) => (
              <div
                key={item._id}
                className={`border rounded-2xl p-5 cursor-pointer transition ${
                  selectedInterviewId === item._id
                    ? "border-black"
                    : "border-slate-200"
                }`}
                onClick={() =>
                  setSelectedInterviewId(item._id)
                }
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.jobId?.jobTitle?.name ||
                        "Unknown Job"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.meetingType}
                    </p>
                  </div>

                  <span className="text-sm font-medium">
                    {item.status}
                  </span>
                </div>

                <div className="mt-3 text-sm text-slate-600">
                  {new Date(
                    item.slotStart
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Interview Details
        </h2>

        {!selectedInterviewId ? (
          <div>Select interview</div>
        ) : detailsLoading ? (
          <div>Loading details...</div>
        ) : (
          <div className="border rounded-2xl p-6 space-y-6">
            <div>
              <div className="font-semibold">
                Job
              </div>
              <div>
                {
                  interviewDetails?.jobId
                    ?.jobTitle?.name
                }
              </div>
            </div>

            <div>
              <div className="font-semibold">
                Employer
              </div>
              <div>
                {
                  interviewDetails?.employerId
                    ?.companyName
                }
              </div>
            </div>

            <div>
              <div className="font-semibold">
                Location
              </div>
              <div>
                {
                  interviewDetails?.location
                }
              </div>
            </div>

            <div>
              <div className="font-semibold">
                Meeting Type
              </div>
              <div>
                {
                  interviewDetails?.meetingType
                }
              </div>
            </div>

            <div>
              <div className="font-semibold">
                Status
              </div>
              <div>
                {
                  interviewDetails?.status
                }
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">
                Reschedule
              </h3>

              <input
                type="datetime-local"
                value={newSlotStart}
                onChange={(e) =>
                  setNewSlotStart(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="datetime-local"
                value={newSlotEnd}
                onChange={(e) =>
                  setNewSlotEnd(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <Button
                onClick={handleReschedule}
                disabled={
                  rescheduleMutation.isPending
                }
              >
                Reschedule
              </Button>
            </div>

            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={
                cancelMutation.isPending
              }
            >
              Cancel Interview
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}