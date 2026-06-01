"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  useEmployerTestimonials,
  useCreateEmployerTestimonial,
  useDeleteEmployerTestimonial,
} from "@/modules/employer/hooks/use-employer";

export default function EmployerTestimonialsPage() {
  const { data, isLoading } =
    useEmployerTestimonials();

  const createMutation =
    useCreateEmployerTestimonial();

  const deleteMutation =
    useDeleteEmployerTestimonial();

  const [designation, setDesignation] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [rating, setRating] =
    useState("5");

  const [tag, setTag] =
    useState("general");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createMutation.mutateAsync({
        designation,
        title,
        message,
        rating,
        tag,
        video: "",
      });

      setDesignation("");
      setTitle("");
      setMessage("");
      setRating("5");
      setTag("general");

      alert(
        "Testimonial added successfully"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to add testimonial"
      );
    }
  }

  async function handleDelete(
    testimonialId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this testimonial?"
      );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(
        testimonialId
      );

      alert(
        "Deleted successfully"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Delete failed"
      );
    }
  }

  const testimonials =
    data?.testimonials || [];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Testimonials
      </h1>

      {/* FORM */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Add Testimonial
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            value={designation}
            onChange={(e) =>
              setDesignation(
                e.target.value
              )
            }
            placeholder="Designation"
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="border rounded-xl px-4 py-3"
            required
          />

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="1">
              1 Star
            </option>
            <option value="2">
              2 Stars
            </option>
            <option value="3">
              3 Stars
            </option>
            <option value="4">
              4 Stars
            </option>
            <option value="5">
              5 Stars
            </option>
          </select>

          <select
            value={tag}
            onChange={(e) =>
              setTag(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="general">
              General
            </option>
            <option value="candidate-review">
              Candidate Review
            </option>
            <option value="employer-review">
              Employer Review
            </option>
          </select>

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Message"
            rows={5}
            className="border rounded-xl px-4 py-3 md:col-span-2"
            required
          />

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={
                createMutation.isPending
              }
            >
              {createMutation.isPending
                ? "Adding..."
                : "Add Testimonial"}
            </Button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Your Testimonials
        </h2>

        {isLoading ? (
          <div>
            Loading testimonials...
          </div>
        ) : testimonials.length ===
          0 ? (
          <div>
            No testimonials found
          </div>
        ) : (
          testimonials.map(
            (item: any) => (
              <div
                key={item._id}
                className="bg-white border rounded-2xl p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {
                        item.designation
                      }
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>

                <div className="text-yellow-500">
                  {"★".repeat(
                    item.rating
                  )}
                </div>

                <p className="text-slate-700">
                  {item.message}
                </p>

                <div className="text-xs text-slate-500 flex gap-4">
                  <span>
                    Tag: {item.tag}
                  </span>

                  <span>
                    Approved:{" "}
                    {item.approved
                      ? "Yes"
                      : "No"}
                  </span>

                  <span>
                    Visible:{" "}
                    {item.isDisplayed
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}