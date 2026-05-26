import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            SecondJobSearch
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
