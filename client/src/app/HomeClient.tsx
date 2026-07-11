"use client";

import { useState } from "react";
import DropZone from "@/components/upload/DropZone";
import PreviewTable from "@/components/preview/PreviewTable";
import { useCSV } from "@/hooks/UseCSV";
import { uploadCSV } from "@/services/uploadService";
import ResultTable from "@/components/result/ResultTable";
import { ImportResult } from "@/types/crm";
import EmptyState from "@/components/ui/EmptyState";
import StatsCard from "@/components/ui/StatsCard";
import axios from "axios"
export default function HomeClient() {
  const { rows, file, loadCSV } = useCSV();
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleFileSelect = (selectedFile: File) => {
    setResult(null);
    setSuccess("");
    setError("");

    loadCSV(selectedFile);
  };
  const handleImport = async () => {
    setError("");
    setSuccess("");
    if (!file) return;

    setLoading(true);

    try {
      const data = await uploadCSV(file);
      setResult(data);
      setSuccess(
        `Successfully imported ${data.totalImported} records.`
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
          "Failed to import CSV."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Hero Section */}

        <div className="text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Smart CRM Importer
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-600">
            AI Powered CSV → GrowEasy CRM Converter
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-slate-600 leading-8">
            Upload CSV files from Facebook Leads, Google Ads, Excel,
            Real Estate CRMs, Marketing tools, or any spreadsheet.
            Gemini AI intelligently maps your data into GrowEasy CRM format.
          </p>

        </div>

        {/* Upload Card */}

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl border border-slate-200">

          <DropZone onFileSelect={handleFileSelect} />

          {file && (
            <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">

              <p className="font-semibold text-green-700">
                Selected File
              </p>

              <p className="mt-1 text-slate-700">
                {file.name}
              </p>

            </div>
          )}

          <div className="mt-6 flex justify-center">

            <span className="rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-semibold">

              {rows.length} Records Detected

            </span>

          </div>

        </div>
        {rows.length === 0 && <EmptyState />}
        {/* Preview */}

        {rows.length > 0 && (

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl border border-slate-200">

            {success && (
              <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
                {success}
              </div>
            )}
            {result && (
              <div className="mt-6 grid gap-6 mb-6 md:grid-cols-2">
                <StatsCard
                  title="Imported"
                  value={result.totalImported}
                  color="text-green-600"
                />

                <StatsCard
                  title="Skipped"
                  value={result.totalSkipped}
                  color="text-red-600"
                />
              </div>
            )}
            {error && (
              <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold text-slate-800">
                CSV Preview
              </h2>

              <button
                disabled={loading || !file}
                onClick={handleImport}
                className={`rounded-xl lg:px-7 sm:px-4 py-3  font-semibold text-white transition-all
              ${loading || !file
                    ? "cursor-not-allowed bg-slate-400"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                  }`}
              >
                {loading ? "Importing..." : "Import into GrowEasy CRM"}
              </button>
            </div>
            {loading && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                <p className="font-medium text-slate-700">
                  Gemini AI is analyzing your CSV...
                </p>
              </div>
            )}


            <PreviewTable rows={rows} />
            {result && (
              <ResultTable
                records={result.records}
                totalImported={result.totalImported}
                totalSkipped={result.totalSkipped}
              />
            )}
          </div>

        )}

      </div>
      <footer className="mt-20 border-t border-slate-200 py-8 text-center text-slate-500">
        Built with Next.js • Express • Gemini AI • Tailwind CSS
      </footer>
    </main>
  );
}