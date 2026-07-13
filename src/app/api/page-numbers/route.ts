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
    const position =
      (formData.get("position") as string) ||
      "bottom-center";

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
      StandardFonts.Helvetica
    );

    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      const text = `${index + 1}`;

      let x = width / 2;
      let y = 20;

      switch (position) {
        case "bottom-right":
          x = width - 40;
          y = 20;
          break;

        case "top-left":
          x = 20;
          y = height - 30;
          break;

        case "top-right":
          x = width - 40;
          y = height - 30;
          break;

        default:
          x = width / 2;
          y = 20;
      }

      page.drawText(text, {
        x,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="page-numbers.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add page numbers.",
      },
      {
        status: 500,
      }
    );
  }
}