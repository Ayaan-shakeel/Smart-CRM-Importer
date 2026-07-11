interface StatsCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md">
      <p className="text-slate-500">{title}</p>

      <h2 className={`mt-2 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}