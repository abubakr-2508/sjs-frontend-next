"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/shared/auth/logout-button";

const navItems = [
  {
    label: "Dashboard",
    href: "/employer/dashboard",
  },
  {
    label: "Manage Jobs",
    href: "/employer/jobs",
  },
  {
    label: "Post Job",
    href: "/employer/post-job",
  },
  {
    label: "Applicants",
    href: "/employer/applicants",
  },
  {
    label: "Candidate Pool",
    href: "/employer/candidate-pool",
  },
  {
    label: "Interviews",
    href: "/employer/interviews",
  },
  {
    label: "Testimonials",
    href: "/employer/testimonials",
  },
  {
    label: "Profile",
    href: "/employer/profile",
  },
  {
    label: "Subscriptions",
    href: "/employer/subscriptions",
  },
  {
    label: "Account",
    href: "/employer/account",
  },
];

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-white border-r p-6">
        <h2 className="text-2xl font-bold mb-8">Employer Panel</h2>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-4 rounded-2xl text-lg ${
                  active
                    ? "bg-slate-950 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LogoutButton />
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
