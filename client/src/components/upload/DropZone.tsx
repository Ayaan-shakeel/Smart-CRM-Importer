"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

export default function DropZone({ onFileSelect }: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`group cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300
      ${
        isDragActive
          ? "border-blue-600 bg-blue-50 scale-[1.02]"
          : "border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-white hover:shadow-lg"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-all group-hover:bg-blue-200">
        <UploadCloud className="h-10 w-10 text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {isDragActive ? "Drop your CSV here" : "Drag & Drop your CSV"}
      </h2>

      <p className="mt-3 text-slate-600">
        or <span className="font-semibold text-blue-600">click to browse</span>
      </p>

      <div className="mt-6 inline-flex rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
        Supports .CSV files only
      </div>
    </div>
  );
}