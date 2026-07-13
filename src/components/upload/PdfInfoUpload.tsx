"use client";

import { useState } from "react";
import FileUpload from "../common/FileUpload";

export default function PdfInfoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<any>(null);

  async function handleInfo() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/pdf-info", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setInfo(data);

    } catch (err) {
      console.error(err);
      alert("Unable to read PDF information.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          PDF Information
        </h2>

        <FileUpload
          file={file}
          onChange={setFile}
        />

        <button
          onClick={handleInfo}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
        >
          {loading ? "Reading PDF..." : "Show PDF Information"}
        </button>

        {info && (

          <div className="mt-10 bg-gray-100 rounded-2xl p-6 space-y-3">

            <div><b>File Name:</b> {info.fileName}</div>

            <div><b>File Size:</b> {info.fileSize}</div>

            <div><b>Total Pages:</b> {info.totalPages}</div>

            <div><b>Page Width:</b> {info.pageWidth}</div>

            <div><b>Page Height:</b> {info.pageHeight}</div>

            <div><b>Title:</b> {info.title || "-"}</div>

            <div><b>Author:</b> {info.author || "-"}</div>

            <div><b>Subject:</b> {info.subject || "-"}</div>

            <div><b>Creator:</b> {info.creator || "-"}</div>

            <div><b>Producer:</b> {info.producer || "-"}</div>

          </div>

        )}

      </div>

    </section>
  );
}