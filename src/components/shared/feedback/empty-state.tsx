interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="border rounded-xl bg-white p-12 text-center">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      {description && (
        <p className="text-slate-500 mt-3">
          {description}
        </p>
      )}
    </div>
  );
}