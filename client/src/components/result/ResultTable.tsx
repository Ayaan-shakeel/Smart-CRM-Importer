"use client";

import { CRMRecord } from "@/types/crm";

interface ResultTableProps {
  records: CRMRecord[];
  totalImported: number;
  totalSkipped: number;
}

export default function ResultTable({
  records,
  totalImported,
  totalSkipped,
}: ResultTableProps) {
  if (!records.length) return null;

  const headers = Object.keys(records[0]);

  return (
    <div className="mt-10 space-y-8">

      {/* Title */}

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          AI Import Results
        </h2>

        <p className="mt-2 text-slate-600">
          CRM records successfully extracted using Gemini AI.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-green-700">
            Successfully Imported
          </p>

          <h3 className="mt-2 text-4xl font-bold text-green-700">
            {totalImported}
          </h3>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-red-700">
            Skipped Records
          </p>

          <h3 className="mt-2 text-4xl font-bold text-red-700">
            {totalSkipped}
          </h3>
        </div>

      </div>

      {/* Records Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">

        <div className="max-h-[500px] overflow-auto">

          <table className="min-w-full border-collapse">

            <thead className="sticky top-0 bg-slate-800 text-white">

              <tr>

                {headers.map((header) => (

                  <th
                    key={header}
                    className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide"
                  >
                    {header}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {records.map((record, index) => (

                <tr
                  key={index}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >

                  {headers.map((header) => (

                    <td
                      key={header}
                      className="whitespace-nowrap border-b border-slate-100 px-6 py-4 text-sm text-slate-700"
                    >
                      {record[header as keyof CRMRecord] || (
                        <span className="italic text-slate-400">—</span>
                      )}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}