"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  useEmployerPlans,
  useEmployerActivePlan,
  useEmployerPlanHistory,
  useCancelEmployerPlan,
  useEmployerPlanPurchase,
} from "@/modules/employer/hooks/use-employer";

export default function EmployerSubscriptionsPage() {
  const { data: plansData } =
    useEmployerPlans();

  const { data: activePlanData } =
    useEmployerActivePlan();

  const { data: historyData } =
    useEmployerPlanHistory();

  const cancelMutation =
    useCancelEmployerPlan();

  const purchaseMutation =
    useEmployerPlanPurchase();

  const plans =
    plansData?.plans || [];

  const activePlan =
    activePlanData?.data;

  const history =
    historyData?.data || [];

  async function handleCancel() {
    try {
      await cancelMutation.mutateAsync();

      toast.success("Plan cancelled successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to cancel plan");
    }
  }

  async function handlePurchase(
    plan: any
  ) {
    try {
      const result =
        await purchaseMutation.mutateAsync(
          plan
        );

      toast.success(
        result.message
      );
    } catch (error) {
      console.error(error);

      toast.error("Payment integration unavailable");
    }
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">
        Subscriptions
      </h1>

      {/* ACTIVE PLAN */}
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Active Plan
        </h2>

        {!activePlan ? (
          <p>
            No active plan
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Plan:</strong>{" "}
                {
                  activePlan.plan_name
                }
              </div>

              <div>
                <strong>Status:</strong>{" "}
                {
                  activePlan.status
                }
              </div>

              <div>
                <strong>Billing:</strong>{" "}
                {
                  activePlan.billing_type
                }
              </div>

              <div>
                <strong>Price:</strong>{" "}
                {
                  activePlan.currency
                }{" "}
                {
                  activePlan.price
                }
              </div>

              <div>
                <strong>Start:</strong>{" "}
                {new Date(
                  activePlan.start_date
                ).toLocaleDateString()}
              </div>

              <div>
                <strong>End:</strong>{" "}
                {new Date(
                  activePlan.end_date
                ).toLocaleDateString()}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mt-4 mb-3">
                Features
              </h3>

              <div className="space-y-2">
                {activePlan.features?.map(
                  (
                    feature: any
                  ) => (
                    <div
                      key={
                        feature._id
                      }
                      className="border rounded-lg p-3"
                    >
                      <div>
                        <strong>
                          {
                            feature.name
                          }
                        </strong>
                      </div>

                      <div>
                        Limit:{" "}
                        {
                          feature.limit
                        }
                      </div>

                      <div>
                        Used:{" "}
                        {
                          feature.used
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={
                handleCancel
              }
            >
              Cancel Plan
            </Button>
          </>
        )}
      </div>

      {/* AVAILABLE PLANS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          Available Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map(
            (plan: any) => (
              <div
                key={
                  plan.plan_id
                }
                className="bg-white border rounded-2xl p-6 space-y-4"
              >
                <h3 className="text-xl font-bold">
                  {plan.name}
                </h3>

                <p>
                  Duration:{" "}
                  {
                    plan.duration_days
                  }{" "}
                  days
                </p>

                <div className="space-y-2">
                  {plan.features?.map(
                    (
                      feature: any,
                      index: number
                    ) => (
                      <div
                        key={
                          index
                        }
                      >
                        •{" "}
                        {
                          feature.name
                        }
                        :{" "}
                        {
                          feature.value
                        }
                      </div>
                    )
                  )}
                </div>

                <div className="space-y-2">
                  {plan.billing_options?.map(
                    (
                      option: any,
                      index: number
                    ) => (
                      <Button
                        key={
                          index
                        }
                        onClick={() =>
                          handlePurchase(
                            {
                              ...plan,
                              billingOption:
                                option,
                            }
                          )
                        }
                        className="w-full"
                      >
                        Buy (
                        {
                          option.currency
                        }{" "}
                        {
                          option.price
                        }
                        )
                      </Button>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Plan History
        </h2>

        {history.length ===
        0 ? (
          <p>
            No subscription history
          </p>
        ) : (
          <div className="space-y-3">
            {history.map(
              (
                item: any
              ) => (
                <div
                  key={
                    item._id
                  }
                  className="border rounded-lg p-4"
                >
                  <div>
                    <strong>
                      {
                        item.plan_name
                      }
                    </strong>
                  </div>

                  <div>
                    Status:{" "}
                    {
                      item.status
                    }
                  </div>

                  <div>
                    Payment:{" "}
                    {
                      item.payment_status
                    }
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* FUTURE WALLET */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">
          Wallet
        </h2>

        <p className="text-slate-500">
          Wallet integration
          coming soon
        </p>
      </div>
    </div>
  );
}