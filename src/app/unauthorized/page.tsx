import Link from "next/link";

export const metadata = {
  title: "Unauthorized",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-semibold">Access denied</h1>
      <p className="max-w-md text-neutral-600">
        You don&apos;t have permission to view this page. If you believe this is
        a mistake, please sign in with a different account or contact support.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-100"
      >
        Back to home
      </Link>
    </main>
  );
}
