import { useState } from "react";
import { parseCSV } from "@/lib/parseCSV";
import {CSVRow} from "@/types/csv"

export const useCSV = () => {
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const loadCSV = async (selectedFile: File) => {
    setFile(selectedFile);

    const data = await parseCSV(selectedFile);

    setRows(data);
  };

  return {
    file,
    rows,
    loadCSV,
  };
};