import { NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import { randomUUID } from "crypto";
import { execFileAsync, QPDF_PATH } from "@/lib/qpdf";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const password = (formData.get("password") as string) || "";

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

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    const tempDir = path.join(
      os.tmpdir(),
      "smartpdfhub-" + randomUUID()
    );

    fs.mkdirSync(tempDir, { recursive: true });

    const inputPath = path.join(tempDir, "input.pdf");
    const outputPath = path.join(tempDir, "protected.pdf");

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(inputPath, buffer);

    await execFileAsync(QPDF_PATH, [
      "--encrypt",
      password,
      password,
      "256",
      "--",
      inputPath,
      outputPath,
    ]);
        const pdfBuffer = fs.readFileSync(outputPath);

    fs.rmSync(tempDir, {
      recursive: true,
      force: true,
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="protected.pdf"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to protect PDF.",
      },
      {
        status: 500,
      }
    );
  }
}