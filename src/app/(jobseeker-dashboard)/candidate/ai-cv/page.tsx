"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useProfile } from "@/modules/candidate/hooks/use-profile";
import { useSummarizeCv } from "@/modules/candidate/hooks/use-ai-cv";
import { useSpeechRecognition } from "@/modules/candidate/hooks/use-speech-recognition";

import { useAiCvStore } from "@/store/ai-cv-store";

export default function AiCvBuilderPage() {
  const router = useRouter();

  const { data } = useProfile();

  const profile = data?.data;

  const summarizeMutation =
    useSummarizeCv();

  const {
    transcript,
    isListening,
    startListening,
  } = useSpeechRecognition();

  const {
    manualInput,
    extraJobTitle,
    setManualInput,
    setExtraJobTitle,
    setVoiceInput,
    setSummaryData,
  } = useAiCvStore();

  useEffect(() => {
    if (transcript) {
      setVoiceInput(transcript);
    }
  }, [transcript, setVoiceInput]);

  function buildCandidateText() {
    const educationText =
      profile?.education?.length
        ? profile.education
            .map(
              (item: any) =>
                `${item.course} - ${item.institution} (${item.startDate} - ${
                  item.currentlyPursuing
                    ? "Currently Pursuing"
                    : item.endDate
                })`
            )
            .join("\n")
        : "None";

    const experienceText =
      profile?.experience?.length
        ? profile.experience
            .map(
              (item: any) =>
                `${item.title} at ${item.company} (${item.from} - ${
                  item.currentlyWorking
                    ? "Present"
                    : item.to
                })`
            )
            .join("\n")
        : "None";

    return `
Personal Information:
Name: ${profile?.name || ""}
Email: ${profile?.email || ""}
Mobile: ${profile?.mobile || ""}
Location: ${profile?.location?.city || ""}, ${profile?.location?.country || ""}

Manual Input:
${manualInput}

Voice Input:
${transcript}

Desired Job Title:
${extraJobTitle}

Education:
${educationText}

Experience:
${experienceText}
`;
  }

  async function handleSummarize() {
    try {
      const text =
        buildCandidateText();

      const result =
        await summarizeMutation.mutateAsync(
          {
            text,
          }
        );

      setSummaryData(result);

      router.push(
        "/candidate/ai-cv/review"
      );
    } catch {
      alert(
        "Failed to generate summary"
      );
    }
  }

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div className="bg-white border rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold">
          AI CV Builder
        </h1>

        <p className="text-slate-600">
          Build your AI-generated CV using your profile, manual input, and voice input.
        </p>

        <Input
          placeholder="Desired Job Title"
          value={extraJobTitle}
          onChange={(e) =>
            setExtraJobTitle(
              e.target.value
            )
          }
        />

        <textarea
          className="w-full border rounded-xl px-4 py-3 min-h-40"
          placeholder="Tell AI about yourself, achievements, projects, strengths..."
          value={manualInput}
          onChange={(e) =>
            setManualInput(
              e.target.value
            )
          }
        />

        <div className="flex gap-4">
          <Button
            onClick={startListening}
            disabled={isListening}
          >
            {isListening
              ? "Listening..."
              : "Start Voice Input"}
          </Button>

          {transcript && (
            <div className="flex-1 border rounded-xl p-4 bg-slate-50">
              <strong>
                Voice Transcript:
              </strong>
              <p className="mt-2">
                {transcript}
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleSummarize}
          disabled={
            summarizeMutation.isPending
          }
        >
          {summarizeMutation.isPending
            ? "Generating Summary..."
            : "Generate AI Summary"}
        </Button>
      </div>
    </div>
  );
}