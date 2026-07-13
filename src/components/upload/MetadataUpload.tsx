"use client";

import { useState } from "react";
import FileUpload from "../common/FileUpload";

export default function MetadataUpload() {
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [creator, setCreator] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("subject", subject);
      formData.append("creator", creator);

      const res = await fetch("/api/edit-metadata", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Metadata update failed");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "metadata-updated.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Failed to update metadata.");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Edit PDF Metadata
        </h2>

        <FileUpload
          file={file}
          onChange={setFile}
        />

        <div className="grid gap-5 mt-8">

          <input
            className="border rounded-xl p-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border rounded-xl p-4"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            className="border rounded-xl p-4"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            className="border rounded-xl p-4"
            placeholder="Creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />

        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
        >
          {loading ? "Updating..." : "Update Metadata"}
        </button>

      </div>

    </section>
  );
}