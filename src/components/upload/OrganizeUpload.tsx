"use client";
import FileUpload from "../common/FileUpload";

import { useState } from "react";

export default function OrganizeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOrganize() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!order.trim()) {
      alert("Enter page order.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("order", order);

      const res = await fetch("/api/organize-pdf", {
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
      a.download = "organized.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Failed to organize PDF.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Organize PDF Pages
        </h2>

        <FileUpload
         file={file}
         onChange={setFile}
        />

        <div className="mt-8">

          <label className="font-semibold">
            New Page Order
          </label>

          <input
            type="text"
            placeholder="Example: 3,1,2,4"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2"
          />

          <p className="text-sm text-gray-500 mt-2">
            Enter the page order separated by commas.
          </p>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={handleOrganize}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          >
            {loading ? "Organizing..." : "Organize PDF"}
          </button>

        </div>

      </div>

    </section>
  );
}