import PublicNavbar from "@/components/shared/navigation/public-navbar";
import PublicFooter from "@/components/shared/navigation/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}
