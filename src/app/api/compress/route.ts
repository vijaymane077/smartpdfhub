import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import { GS_PATH, execFileAsync } from "@/lib/ghostscript";
import { deleteFile } from "@/lib/utils";

export async function POST(req: Request) {
  let inputPath = "";
  let outputPath = "";

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const quality = (formData.get("quality") as string) || "ebook";

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

    const allowedQualities = [
      "screen",
      "ebook",
      "prepress",
    ];

    const pdfSetting = allowedQualities.includes(quality)
      ? quality
      : "ebook";

    const uploadsDir = path.join(
      process.cwd(),
      "uploads"
    );

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, {
        recursive: true,
      });
    }

    inputPath = path.join(
      uploadsDir,
      `${uuid()}.pdf`
    );

    outputPath = path.join(
      uploadsDir,
      `${uuid()}-compressed.pdf`
    );

    const bytes = await file.arrayBuffer();

    fs.writeFileSync(
      inputPath,
      Buffer.from(bytes)
    );

    await execFileAsync(
      GS_PATH,
      [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        `-dPDFSETTINGS=/${pdfSetting}`,
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        `-sOutputFile=${outputPath}`,
        inputPath,
      ]
    );

    const originalSize =
      fs.statSync(inputPath).size;

    const compressedSize =
      fs.statSync(outputPath).size;

    const compressedBuffer =
      fs.readFileSync(outputPath);

    const response = new NextResponse(
      compressedBuffer,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            'attachment; filename="compressed.pdf"',

          "X-Original-Size":
            originalSize.toString(),

          "X-Compressed-Size":
            compressedSize.toString(),
        },
      }
    );

    deleteFile(inputPath);
    deleteFile(outputPath);

    return response;

  } catch (error: any) {
    console.error(error);

    if (inputPath) {
      deleteFile(inputPath);
    }

    if (outputPath) {
      deleteFile(outputPath);
    }

    return NextResponse.json(
      {
        success: false,
        message: "Compression failed.",
      },
      {
        status: 500,
      }
    );
  }
}