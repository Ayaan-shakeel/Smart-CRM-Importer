import { Request, Response } from "express";
import {parseCSV} from '../servcies/csvService'
import fs from "fs/promises";
import { extractCRMRecords } from "../servcies/aiService";
export const uploadCSV = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const rows = await parseCSV(req.file.path);
    
    const crmRecords = await extractCRMRecords(rows);
    await fs.unlink(req.file.path);

return res.status(200).json({
  success: true,
  totalImported: crmRecords.length,
  totalSkipped: rows.length - crmRecords.length,
  records: crmRecords,
});
  } catch (error: any) {
  console.error(error);

  if (error?.status === 429) {
    return res.status(429).json({
      success: false,
      message:
        "Gemini API quota exceeded. Please try again later.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong while processing the CSV.",
  });
}
};