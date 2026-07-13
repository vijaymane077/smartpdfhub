"use client";

import { useState } from "react";

export default function MergeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const pdfs = Array.from(fileList).filter(
      (f) => f.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...pdfs]);
  }

  async function handleMerge() {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Merge failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Merge failed");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 text-center bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Upload PDF Files</h2>
        <p className="text-gray-500 mb-6">Add one PDF at a time.</p>

        <input
          id="pdfUpload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <label
          htmlFor="pdfUpload"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer"
        >
          {files.length === 0 ? "Upload PDF" : "Add More PDF"}
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4">Selected Files</h3>
          {files.map((file, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{file.name}</span>
              <span>{(file.size/1024/1024).toFixed(2)} MB</span>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={handleMerge}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl"
        >
          {loading ? "Merging..." : "Merge PDF"}
        </button>
      </div>
    </section>
  );
}
