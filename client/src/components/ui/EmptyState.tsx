export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <h3 className="text-2xl font-semibold text-slate-700">
        Upload a CSV to Get Started
      </h3>

      <p className="mt-3 text-slate-500">
        Drag & drop a CSV file or click the upload area above to preview and
        import your CRM data using AI.
      </p>
    </div>
  );
}