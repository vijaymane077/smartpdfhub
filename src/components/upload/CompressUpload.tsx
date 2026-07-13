"use client";

import { useState } from "react";

import UploadDropzone from "./UploadDropzone";
import UploadProgress from "./UploadProgress";
import CompressionResult from "./CompressionResult";

export default function CompressUpload() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [originalSize, setOriginalSize] = useState(0);

  const [compressedSize, setCompressedSize] = useState(0);

  const [quality, setQuality] = useState("/ebook");

  function resetUpload() {
    setFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select PDF first");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append("quality", quality);

    try {
      const res = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      const original = Number(
        res.headers.get("X-Original-Size")
      );

      const compressed = Number(
        res.headers.get("X-Compressed-Size")
      );

      setOriginalSize(original);

      setCompressedSize(compressed);

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "compressed.pdf";

      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.log(err);

      alert("Compression Failed");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">

      <UploadDropzone
        file={file}
        setFile={setFile}
      />

      <h2 className="text-3xl font-bold mt-12 mb-8">
        Choose Compression Level
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => setQuality("/prepress")}
          className={`cursor-pointer border rounded-xl p-6 ${
            quality === "/prepress"
              ? "border-blue-600 bg-blue-50"
              : ""
          }`}
        >
          <h3 className="font-bold text-xl">
            🟢 Maximum Quality
          </h3>

          <p className="mt-2">
            Best for Printing
          </p>
        </div>

        <div
          onClick={() => setQuality("/ebook")}
          className={`cursor-pointer border rounded-xl p-6 ${
            quality === "/ebook"
              ? "border-blue-600 bg-blue-50"
              : ""
          }`}
        >
          <h3 className="font-bold text-xl">
            ⭐ Recommended
          </h3>

          <p className="mt-2">
            Best Balance
          </p>
        </div>

        <div
          onClick={() => setQuality("/screen")}
          className={`cursor-pointer border rounded-xl p-6 ${
            quality === "/screen"
              ? "border-blue-600 bg-blue-50"
              : ""
          }`}
        >
          <h3 className="font-bold text-xl">
            🔴 Maximum Compression
          </h3>

          <p className="mt-2">
            Smallest Size
          </p>
        </div>

      </div>

      <div className="text-center mt-10">

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
        >
          {loading
            ? "Compressing..."
            : "Compress PDF"}
        </button>

      </div>

      <UploadProgress loading={loading} />

      <CompressionResult
        originalSize={originalSize}
        compressedSize={compressedSize}
        onReset={resetUpload}
      />

    </section>
  );
}