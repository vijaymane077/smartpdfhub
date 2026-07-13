import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const pages = (formData.get("pages") as string) || "";

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

    const sourcePdf = await PDFDocument.load(bytes);

    const newPdf = await PDFDocument.create();

    const pageNumbers = pages
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p))
      .map((p) => p - 1);

    const validPages = pageNumbers.filter(
      (p) => p >= 0 && p < sourcePdf.getPageCount()
    );

    if (validPages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page numbers.",
        },
        {
          status: 400,
        }
      );
    }

    const copiedPages = await newPdf.copyPages(
      sourcePdf,
      validPages
    );

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    const pdfBytes = await newPdf.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="extracted.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to extract pages.",
      },
      {
        status: 500,
      }
    );
  }
}