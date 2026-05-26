export default function PublicFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">
              SecondJobSearch
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Modern recruitment and job discovery platform.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 SecondJobSearch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
