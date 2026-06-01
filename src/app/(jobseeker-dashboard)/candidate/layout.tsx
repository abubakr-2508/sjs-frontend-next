"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNotificationCount } from "@/modules/candidate/hooks/use-notifications";

const navItems = [
  {
    label: "Dashboard",
    href: "/candidate/dashboard",
  },
  {
    label: "Jobs",
    href: "/candidate/jobs",
  },
  {
    label: "Applied Jobs",
    href: "/candidate/applied-jobs",
  },
  {
    label: "Saved Jobs",
    href: "/candidate/saved-jobs",
  },
  {
    label: "Notifications",
    href: "/candidate/notifications",
  },
  {
    label: "AI CV Builder",
    href: "/candidate/ai-cv",
  },
  {
    label: "Settings",
    href: "/candidate/settings",
  },
  {
    label: "Account",
    href: "/candidate/account",
  },
  {
    label: "Messages",
    href: "/candidate/messages",
  },
  {
    label: "Profile",
    href: "/candidate/profile",
  },
];

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { data } = useNotificationCount();
  const count = data?.count || 0;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-white border-r p-6">
        <h2 className="text-2xl font-bold mb-8">Candidate Panel</h2>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>

                {item.label === "Notifications" && count > 0 && (
                  <span className="px-2 py-1 rounded-full text-xs bg-red-500 text-white">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
