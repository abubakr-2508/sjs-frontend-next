import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Jobs",
    href: "/jobs",
  },
  {
    label: "Employers",
    href: "/employers",
  },
  {
    label: "Candidates",
    href: "/candidates",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          SecondJobSearch
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-black transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">
              Post a Job
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
