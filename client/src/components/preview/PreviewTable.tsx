"use client";

import { CSVRow } from "@/types/csv";

interface PreviewTableProps {
  rows: CSVRow[];
}

export default function PreviewTable({
  rows,
}: PreviewTableProps) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">

      <div className="max-h-125 overflow-auto">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 z-10 bg-slate-800 text-white">

            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-slate-700 px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {rows.slice(0, 10).map((row, index) => (

              <tr
                key={index}
                className={`transition-colors hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    className="whitespace-nowrap border-b border-slate-100 px-6 py-4 text-sm text-slate-700"
                  >
                    {row[header] || (
                      <span className="text-slate-400 italic">—</span>
                    )}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t bg-slate-50 px-6 py-4 text-sm text-slate-600">

        Showing <span className="font-semibold">{Math.min(rows.length, 10)}</span> of{" "}
        <span className="font-semibold">{rows.length}</span> records

      </div>

    </div>
  );
}