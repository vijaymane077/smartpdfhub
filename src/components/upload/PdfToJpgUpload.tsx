"use client";

import { useState } from "react";
import FileUpload from "../common/FileUpload";

export default function PdfToJpgUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("high");
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("quality", quality);

      const res = await fetch("/api/pdf-to-jpg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          PDF to JPG
        </h2>

        <FileUpload
          file={file}
          onChange={setFile}
        />

        <div className="mt-8">

          <label className="font-semibold">
            Quality
          </label>

          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          {loading ? "Converting..." : "Convert to JPG"}
        </button>

      </div>

    </section>
  );
}