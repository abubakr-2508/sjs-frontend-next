"use client";

import { useRef } from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  useUploadResume,
  useDeleteResume,
} from "@/modules/candidate/hooks/profile/use-resume";

interface Props {
  hasResume: boolean;
}

export default function ResumeSection({
  hasResume,
}: Props) {
  const fileRef =
    useRef<HTMLInputElement>(null);

  const uploadMutation =
    useUploadResume();

  const deleteMutation =
    useDeleteResume();

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      await uploadMutation.mutateAsync(
        file
      );

      alert(
        "Resume uploaded successfully"
      );

      window.location.reload();
    } catch {
      alert(
        "Resume upload failed"
      );
    }
  }

  async function handleDelete() {
    try {
      await deleteMutation.mutateAsync();

      alert(
        "Resume deleted successfully"
      );

      window.location.reload();
    } catch {
      alert(
        "Failed to delete resume"
      );
    }
  }

  function handleView() {
    window.open(
      "https://api.secondjobsearch.com/cv/view",
      "_blank"
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Resume
      </h2>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleUpload}
      />

      {!hasResume ? (
        <Button
          onClick={() =>
            fileRef.current?.click()
          }
          disabled={
            uploadMutation.isPending
          }
        >
          {uploadMutation.isPending
            ? "Uploading..."
            : "Upload Resume"}
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            onClick={handleView}
          >
            View Resume
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteMutation.isPending
            }
          >
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Resume"}
          </Button>
        </div>
      )}
    </div>
  );
}