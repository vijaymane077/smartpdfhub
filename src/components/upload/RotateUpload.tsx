"use client";

import { useState } from "react";

export default function RotateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState("90");
  const [loading, setLoading] = useState(false);

  async function handleRotate() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("rotation", rotation);

      const res = await fetch("/api/rotate-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Rotation failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Rotation failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Rotate PDF
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
            Rotation
          </label>

          <select
            value={rotation}
            onChange={(e) =>
              setRotation(e.target.value)
            }
            className="w-full border rounded-xl p-4 mt-2"
          >
            <option value="90">90°</option>
            <option value="180">180°</option>
            <option value="270">270°</option>
          </select>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={handleRotate}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          >
            {loading
              ? "Rotating..."
              : "Rotate PDF"}
          </button>

        </div>

      </div>

    </section>
  );
}