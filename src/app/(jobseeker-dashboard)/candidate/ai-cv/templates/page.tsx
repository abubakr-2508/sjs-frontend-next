"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  usePreviewCv,
  useSaveCv,
} from "@/modules/candidate/hooks/use-ai-cv";

import { useAiCvStore } from "@/store/ai-cv-store";

const templates = [
  {
    key: "professional",
    label: "Professional",
  },
  {
    key: "modern",
    label: "Modern",
  },
  {
    key: "minimal",
    label: "Minimal",
  },
];

export default function AiCvTemplatesPage() {
  const router = useRouter();

  const previewMutation =
    usePreviewCv();

  const saveMutation =
    useSaveCv();

  const {
    generatedCv,
    selectedTemplate,
    setSelectedTemplate,
    resetAiCv,
  } = useAiCvStore();

  if (!generatedCv) {
    return (
      <div className="p-8">
        No generated CV found.
      </div>
    );
  }

  async function handlePreview(
    template:
      | "professional"
      | "modern"
      | "minimal"
  ) {
    try {
      const html =
        await previewMutation.mutateAsync({
          template,
          cv: generatedCv,
        });

      const previewWindow =
        window.open(
          "",
          "_blank"
        );

      if (previewWindow) {
        previewWindow.document.open();
        previewWindow.document.write(
          html
        );
        previewWindow.document.close();
      }

      setSelectedTemplate(
        template
      );
    } catch {
      alert(
        "Preview failed"
      );
    }
  }

  async function handleSave() {
    if (!selectedTemplate) {
      alert(
        "Select a template first"
      );
      return;
    }

    try {
      await saveMutation.mutateAsync({
        template:
          selectedTemplate,
        cv: generatedCv,
      });

      alert(
        "Resume saved successfully"
      );

      resetAiCv();

      router.push(
        "/candidate/profile"
      );
    } catch {
      alert(
        "Save failed"
      );
    }
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="bg-white border rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold">
          Choose CV Template
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {templates.map(
            (template) => (
              <div
                key={template.key}
                className={`border rounded-2xl p-6 space-y-4 ${
                  selectedTemplate ===
                  template.key
                    ? "border-slate-900"
                    : ""
                }`}
              >
                <h2 className="text-xl font-semibold">
                  {
                    template.label
                  }
                </h2>

                <Button
                  onClick={() =>
                    handlePreview(
                      template.key as
                        | "professional"
                        | "modern"
                        | "minimal"
                    )
                  }
                  disabled={
                    previewMutation.isPending
                  }
                >
                  Preview
                </Button>
              </div>
            )
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={
            saveMutation.isPending
          }
        >
          {saveMutation.isPending
            ? "Saving..."
            : "Save CV"}
        </Button>
      </div>
    </div>
  );
}