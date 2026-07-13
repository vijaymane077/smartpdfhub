import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (files.length < 2) {
    return NextResponse.json({error:"Upload at least 2 PDFs."},{status:400});
  }

  const merged = await PDFDocument.create();

  for (const file of files) {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p=>merged.addPage(p));
  }

  const bytes = await merged.save();

  return new NextResponse(Buffer.from(bytes),{
    headers:{
      "Content-Type":"application/pdf",
      "Content-Disposition":'attachment; filename="merged.pdf"'
    }
  });
}
