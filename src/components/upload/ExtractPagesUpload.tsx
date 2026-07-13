"use client";

import { useState } from "react";

export default function ExtractPagesUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExtract() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!pages.trim()) {
      alert("Enter page numbers.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("pages", pages);

      const res = await fetch("/api/extract-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Extraction failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Extraction failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Extract Pages
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />

        {file && (
          <div className="mt-6 bg-gray-100 rounded-xl p-4">
            <h3>{file.name}</h3>
            <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <input
          className="w-full border rounded-xl p-4 mt-6"
          placeholder="Example: 1,3,5"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />

        <button
          onClick={handleExtract}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          {loading ? "Extracting..." : "Extract Pages"}
        </button>

      </div>

    </section>
  );
}