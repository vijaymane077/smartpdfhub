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

    const title = (formData.get("title") as string) || "";
    const author = (formData.get("author") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const creator = (formData.get("creator") as string) || "";

    const bytes = await file.arrayBuffer();

    const pdfDoc = await PDFDocument.load(bytes);

    if (title.trim()) {
      pdfDoc.setTitle(title);
    }

    if (author.trim()) {
      pdfDoc.setAuthor(author);
    }

    if (subject.trim()) {
      pdfDoc.setSubject(subject);
    }

    if (creator.trim()) {
      pdfDoc.setCreator(creator);
    }

    pdfDoc.setModificationDate(new Date());

    const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="metadata-updated.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update PDF metadata.",
      },
      {
        status: 500,
      }
    );
  }
}