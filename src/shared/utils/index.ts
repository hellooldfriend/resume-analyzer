import pdfToText from "react-pdftotext";

export async function extractTextFromPDF(file?: File) {
  if (!file) {
    return '';
  }

  try {
    const text = await pdfToText(file);
    return text;

  } catch (e) {
    console.error("Failed to extract text from pdf");
    return "";

  }
}