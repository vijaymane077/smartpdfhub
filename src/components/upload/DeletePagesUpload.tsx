"use client";

import { useState } from "react";

export default function DeletePagesUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
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

      const res = await fetch("/api/delete-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "updated.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Delete PDF Pages
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
            <h3 className="font-semibold">
              {file.name}
            </h3>

            <p className="text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="mt-8">

          <label className="font-semibold">
            Pages to delete
          </label>

          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Example: 2,4,6"
            className="w-full border rounded-xl p-4 mt-2"
          />

          <p className="text-sm text-gray-500 mt-2">
            Enter page numbers separated by commas.
          </p>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700"
          >
            {loading
              ? "Deleting..."
              : "Delete Pages"}
          </button>

        </div>

      </div>

    </section>
  );
}