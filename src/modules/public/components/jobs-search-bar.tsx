import { Input } from "@/components/ui/input";

export default function JobsSearchBar() {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Job title or keyword" />
        <Input placeholder="Location" />
        <Input placeholder="Job type" />
      </div>
    </div>
  );
}