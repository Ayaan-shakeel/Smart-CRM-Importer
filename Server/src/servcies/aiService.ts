import { getGeminiClient } from "../config/gemini";
import { SYSTEM_PROMPT } from "../utils/prompt";
import { CSVRow } from "../types/csv";
import { CRMRecord } from "../types/crm";
export const extractCRMRecords = async (
    rows: CSVRow[]
): Promise<CRMRecord[]> => {
    const batchSize = 20;
    const allRecords: CRMRecord[] = [];
    const ai = getGeminiClient();

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const prompt = `
${SYSTEM_PROMPT}

CSV Records:

${JSON.stringify(batch, null, 2)}

Return ONLY a valid JSON array.
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;
      const cleaned = text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

     try {
  const parsed = JSON.parse(cleaned || "[]");

  allRecords.push(...parsed);
} catch (err) {
  
}

    }catch (error) {
  console.error("Gemini Error:", error);
}
  }

  return allRecords;
};