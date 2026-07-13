"use client";

import Link from "next/link";
import { useState } from "react";

export default function UploadBox() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              Start Working with Your PDF
            </h2>

            <p className="text-gray-600 mt-4 text-lg leading-8">
              Upload your PDF to compress, merge or split it.
              Your files remain private and secure.
            </p>

            <input
              type="file"
              id="pdfUpload"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setFileName(file.name);
                setFileSize(
                  (file.size / 1024 / 1024).toFixed(2)
                );
              }}
            />

            <label
              htmlFor="pdfUpload"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl cursor-pointer font-semibold transition"
            >
              📄 Choose PDF
            </label>

            {fileName && (

              <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">

                <h3 className="font-bold text-lg">
                  {fileName}
                </h3>

                <p className="text-gray-600 mt-1">
                  {fileSize} MB
                </p>

              </div>

            )}

          </div>

          <div>

            <div className="grid grid-cols-2 gap-5">

              <Link
                href="/compress"
                className="rounded-2xl bg-blue-50 hover:bg-blue-100 p-6 transition"
              >
                <div className="text-4xl">🗜️</div>
                <h3 className="font-bold text-xl mt-3">
                  Compress
                </h3>
              </Link>

              <Link
                href="/merge"
                className="rounded-2xl bg-blue-50 hover:bg-blue-100 p-6 transition"
              >
                <div className="text-4xl">📑</div>
                <h3 className="font-bold text-xl mt-3">
                  Merge
                </h3>
              </Link>

              <Link
                href="/split"
                className="rounded-2xl bg-blue-50 hover:bg-blue-100 p-6 transition"
              >
                <div className="text-4xl">✂️</div>
                <h3 className="font-bold text-xl mt-3">
                  Split
                </h3>
              </Link>

              <Link
                href="/jpg-to-pdf"
                className="rounded-2xl bg-blue-50 hover:bg-blue-100 p-6 transition"
              >
                <div className="text-4xl">🖼️</div>
                <h3 className="font-bold text-xl mt-3">
                  JPG to PDF
                </h3>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}