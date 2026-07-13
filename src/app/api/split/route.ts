import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const splitPage = Number(formData.get("splitPage"));

    if (!file) {
      return NextResponse.json(
        { error: "PDF file is required." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(bytes);

    const totalPages = sourcePdf.getPageCount();

    if (
      splitPage < 1 ||
      splitPage >= totalPages
    ) {
      return NextResponse.json(
        {
          error: `Split page must be between 1 and ${totalPages - 1}`,
        },
        { status: 400 }
      );
    }

    const pdf1 = await PDFDocument.create();
    const pdf2 = await PDFDocument.create();

    const firstPages = await pdf1.copyPages(
      sourcePdf,
      [...Array(splitPage).keys()]
    );

    firstPages.forEach((page) => pdf1.addPage(page));

    const secondPages = await pdf2.copyPages(
      sourcePdf,
      [...Array(totalPages - splitPage).keys()].map(
        (i) => i + splitPage
      )
    );

    secondPages.forEach((page) => pdf2.addPage(page));

    const bytes1 = await pdf1.save();
    const bytes2 = await pdf2.save();

    return NextResponse.json({
      part1: Buffer.from(bytes1).toString("base64"),
      part2: Buffer.from(bytes2).toString("base64"),
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Split failed." },
      { status: 500 }
    );
  }
}