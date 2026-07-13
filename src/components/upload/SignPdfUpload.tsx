"use client";

import { useState } from "react";
import FileUpload from "../common/FileUpload";

export default function SignPdfUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState("");
  const [page, setPage] = useState("1");
  const [loading, setLoading] = useState(false);

  async function handleSign() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!signature.trim()) {
      alert("Enter your signature.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("page", page);

      const res = await fetch("/api/sign-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Signing failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "signed.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Signing failed.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Sign PDF
        </h2>

        <FileUpload
          file={file}
          onChange={setFile}
        />

        <div className="mt-8">

          <label className="font-semibold">
            Signature
          </label>

          <input
            type="text"
            value={signature}
            onChange={(e) =>
              setSignature(e.target.value)
            }
            placeholder="Type your signature"
            className="w-full border rounded-xl p-4 mt-2"
          />

        </div>

        <div className="mt-6">

          <label className="font-semibold">
            Page Number
          </label>

          <input
            type="number"
            min="1"
            value={page}
            onChange={(e) =>
              setPage(e.target.value)
            }
            className="w-full border rounded-xl p-4 mt-2"
          />

        </div>

        <button
          onClick={handleSign}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
        >
          {loading ? "Signing..." : "Sign PDF"}
        </button>

      </div>

    </section>
  );
}