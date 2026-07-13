"use client";

import { useState } from "react";

export default function PageNumbersUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState("bottom-center");
  const [loading, setLoading] = useState(false);

  async function handleAddNumbers() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("position", position);

      const res = await fetch("/api/page-numbers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "page-numbers.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Failed to add page numbers.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Add Page Numbers
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
            <h3 className="font-semibold">{file.name}</h3>

            <p className="text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="mt-8">

          <label className="font-semibold">
            Position
          </label>

          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2"
          >
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
          </select>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={handleAddNumbers}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Page Numbers"}
          </button>

        </div>

      </div>

    </section>
  );
}