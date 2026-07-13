"use client";

import { useState } from "react";

export default function PdfToJpgUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function convertPdf() {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    setLoading(true);

    try {
      alert(
        "PDF selected successfully.\n\nIn the next step we'll add the page conversion engine."
      );
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 text-center bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-4">
          Upload PDF
        </h2>

        <p className="text-gray-500 mb-6">
          Select the PDF you want to convert into JPG images.
        </p>

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
          <div className="mt-6 rounded-xl bg-gray-100 p-4">
            <h3 className="font-semibold">{file.name}</h3>

            <p className="text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

      </div>

      <div className="text-center mt-8">

        <button
          onClick={convertPdf}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Converting..." : "Convert to JPG"}
        </button>

      </div>

    </section>
  );
}