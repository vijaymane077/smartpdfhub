import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const signature =
      (formData.get("signature") as string) || "";

    const pageNumber = parseInt(
      (formData.get("page") as string) || "1",
      10
    );

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

    if (
      pageNumber < 1 ||
      pageNumber > pages.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page number.",
        },
        {
          status: 400,
        }
      );
    }

    const page = pages[pageNumber - 1];

    const font = await pdfDoc.embedFont(
      StandardFonts.HelveticaOblique
    );

    page.drawText(signature, {
      x: 50,
      y: 50,
      size: 24,
      font,
      color: rgb(0, 0, 0.8),
    });

    const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="signed.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to sign PDF.",
      },
      {
        status: 500,
      }
    );
  }
}