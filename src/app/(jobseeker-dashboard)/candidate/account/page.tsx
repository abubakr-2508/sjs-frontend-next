"use client";

import { useProfile } from "@/modules/candidate/hooks/use-profile";

import {
  useWalletAllotments,
  useActivePlan,
  usePlanHistory,
  useAvailablePlans,
} from "@/modules/candidate/hooks/use-account";

export default function AccountPage() {
  const { data: profileData } =
    useProfile();

  const userId =
    profileData?.data?._id;

  const {
    data: walletData,
  } = useWalletAllotments(
    userId
  );

  const {
    data: activePlanData,
  } = useActivePlan();

  const {
    data: planHistoryData,
  } = usePlanHistory();

  const {
    data: availablePlansData,
  } = useAvailablePlans();

  const profile =
    profileData?.data;

  const walletItems =
    walletData?.items || [];

  const activePlan =
    activePlanData || null;

  const planHistory =
    planHistoryData?.data || [];

  const availablePlans =
    availablePlansData?.plans || [];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Account & Subscription
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Wallet Points
          </div>

          <div className="text-3xl font-bold mt-2">
            {profile?.walletPoints ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Current Plan
          </div>

          <div className="text-2xl font-bold mt-2">
            {profile?.plan ||
              "free"}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Account Status
          </div>

          <div className="text-2xl font-bold mt-2">
            {profile?.status ||
              "active"}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Profile Visibility
          </div>

          <div className="text-2xl font-bold mt-2">
            {profile?.profileVisibility ||
              "public"}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Active Plan
        </h2>

        {activePlan?.success ===
        false ? (
          <p>
            No active plan
          </p>
        ) : (
          <pre className="text-sm overflow-auto">
            {JSON.stringify(
              activePlan,
              null,
              2
            )}
          </pre>
        )}
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Wallet Allotments
        </h2>

        {walletItems.length >
        0 ? (
          walletItems.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(
                    item,
                    null,
                    2
                  )}
                </pre>
              </div>
            )
          )
        ) : (
          <p>
            No wallet allotments
          </p>
        )}
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Plan History
        </h2>

        {planHistory.length >
        0 ? (
          planHistory.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(
                    item,
                    null,
                    2
                  )}
                </pre>
              </div>
            )
          )
        ) : (
          <p>
            No plan history
          </p>
        )}
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Available Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {availablePlans.map(
            (plan: any) => (
              <div
                key={plan.plan_id}
                className="border rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold">
                  {plan.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  Duration:{" "}
                  {
                    plan.duration_days
                  }{" "}
                  days
                </p>

                <p className="text-lg font-semibold mt-3">
                  ₹
                  {
                    plan
                      .billing_options?.[0]
                      ?.price
                  }
                </p>

                <div className="mt-4 space-y-2">
                  {plan.features?.map(
                    (
                      feature: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="text-sm"
                      >
                        {
                          feature.name
                        }
                        :{" "}
                        {String(
                          feature.value
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}