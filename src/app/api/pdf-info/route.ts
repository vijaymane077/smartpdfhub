import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const pdfDoc = await PDFDocument.load(bytes);

    const pages = pdfDoc.getPages();

    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    const creator = pdfDoc.getCreator();
    const producer = pdfDoc.getProducer();

    return NextResponse.json({
      success: true,

      fileName: file.name,

      fileSize:
        (file.size / 1024 / 1024).toFixed(2) + " MB",

      totalPages: pages.length,

      pageWidth: Math.round(width),

      pageHeight: Math.round(height),

      title,
      author,
      subject,
      creator,
      producer,
    });
      } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to read PDF information.",
      },
      {
        status: 500,
      }
    );
  }
}