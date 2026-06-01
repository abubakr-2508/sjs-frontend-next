"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGenerateCv } from "@/modules/candidate/hooks/use-ai-cv";

import { useAiCvStore } from "@/store/ai-cv-store";

export default function AiCvReviewPage() {
  const router = useRouter();

  const generateMutation =
    useGenerateCv();

  const {
    summaryData,
    setSummaryData,
    setGeneratedCv,
  } = useAiCvStore();

  if (!summaryData) {
    return (
      <div className="p-8">
        No AI summary found.
      </div>
    );
  }

  function updateField(
    key: string,
    value: string
  ) {
    if (!summaryData) return;
    setSummaryData({
      ...summaryData,
      [key]: value,
    } as typeof summaryData);
  }

  async function handleGenerateCv() {
    if (!summaryData) return;

    try {
      const payload = `
${summaryData.summary}
name:${summaryData.name}
email:${summaryData.email}
jobTitle:${summaryData.jobTitle}
location:${summaryData.location}
mobile:${summaryData.mobile}
`;

      const result =
        await generateMutation.mutateAsync(
          {
            text: payload,
          }
        );

      setGeneratedCv(
        result.cv as Record<
          string,
          unknown
        >
      );

      router.push(
        "/candidate/ai-cv/templates"
      );
    } catch {
      toast.error("Failed to generate CV");
    }
  }

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div className="bg-white border rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold">
          Review AI Summary
        </h1>

        <Input
          placeholder="Name"
          value={summaryData.name}
          onChange={(e) =>
            updateField(
              "name",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Email"
          value={summaryData.email}
          onChange={(e) =>
            updateField(
              "email",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Mobile"
          value={summaryData.mobile}
          onChange={(e) =>
            updateField(
              "mobile",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Location"
          value={
            summaryData.location
          }
          onChange={(e) =>
            updateField(
              "location",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Job Title"
          value={
            summaryData.jobTitle
          }
          onChange={(e) =>
            updateField(
              "jobTitle",
              e.target.value
            )
          }
        />

        <textarea
          className="w-full border rounded-xl px-4 py-3 min-h-56"
          value={
            summaryData.summary
          }
          onChange={(e) =>
            updateField(
              "summary",
              e.target.value
            )
          }
        />

        <Button
          onClick={handleGenerateCv}
          disabled={
            generateMutation.isPending
          }
        >
          {generateMutation.isPending
            ? "Generating CV..."
            : "Generate Structured CV"}
        </Button>
      </div>
    </div>
  );
}