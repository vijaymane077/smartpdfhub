import { NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const rotation = Number(formData.get("rotation") || "90");

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

    pages.forEach((page) => {
      page.setRotation(
        degrees(rotation)
      );
    });

    const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="rotated.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to rotate PDF.",
      },
      {
        status: 500,
      }
    );
  }
}