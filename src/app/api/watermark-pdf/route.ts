import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  degrees,
} from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const text = (formData.get("text") as string) || "SmartPDFHub";

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

    const font = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const { width, height } = page.getSize();

      page.drawText(text, {
        x: width / 4,
        y: height / 2,
        size: 40,
        font,
        color: rgb(0.75, 0.75, 0.75),
        rotate: degrees(45),
        opacity: 0.4,
      });
    });

    const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="watermarked.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add watermark.",
      },
      {
        status: 500,
      }
    );
  }
}