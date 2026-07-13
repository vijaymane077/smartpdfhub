import { NextResponse } from "next/server";
import { getDocument } from "pdfjs-dist";
import sharp from "sharp";
import archiver from "archiver";
import fs from "fs";
import path from "path";
import os from "os";
import { createWriteStream } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";

const streamPipeline = promisify(pipeline);

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

    const pdfBytes = new Uint8Array(await file.arrayBuffer());

    const pdf = await getDocument({
      data: pdfBytes,
    }).promise;

    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "smartpdfhub-")
    );

    const zipPath = path.join(tempDir, "images.zip");

    const output = createWriteStream(zipPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(output);
    import { NextResponse } from "next/server";
import { getDocument } from "pdfjs-dist";
import sharp from "sharp";
import archiver from "archiver";
import fs from "fs";
import path from "path";
import os from "os";
import { createWriteStream } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";

const streamPipeline = promisify(pipeline);

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

    const pdfBytes = new Uint8Array(await file.arrayBuffer());

    const pdf = await getDocument({
      data: pdfBytes,
    }).promise;

    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "smartpdfhub-")
    );

    const zipPath = path.join(tempDir, "images.zip");

    const output = createWriteStream(zipPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(output);