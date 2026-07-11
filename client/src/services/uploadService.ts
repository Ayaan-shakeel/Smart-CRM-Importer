import { api } from "./api";
import { ImportResult } from "@/types/crm";

export const uploadCSV = async (
  file: File
): Promise<ImportResult> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ImportResult>(
    "/upload",
    formData
  );

  return response.data;
};