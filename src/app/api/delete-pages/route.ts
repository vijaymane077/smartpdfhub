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

    const totalPages = sourcePdf.getPageCount();

    const deletePages = pages
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p))
      .map((p) => p - 1);

    const keepPages: number[] = [];

    for (let i = 0; i < totalPages; i++) {
      if (!deletePages.includes(i)) {
        keepPages.push(i);
      }
    }

    const copiedPages = await newPdf.copyPages(
      sourcePdf,
      keepPages
    );

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    const pdfBytes = await newPdf.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="updated.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete pages.",
      },
      {
        status: 500,
      }
    );
  }
}