"use client";

import { useState } from "react";

export default function ProtectUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleProtect() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);

    // Backend API next step me banayenge
    setTimeout(() => {
      alert("Protect PDF backend will be connected in the next step.");
      setLoading(false);
    }, 1000);
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 text-center bg-white shadow-lg">

        <h2 className="text-3xl font-bold mb-4">
          Upload PDF
        </h2>

        <p className="text-gray-500 mb-6">
          Select a PDF file to protect.
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

        <div className="mt-8">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl p-4"
          />
        </div>

      </div>

      <div className="text-center mt-8">

        <button
          onClick={handleProtect}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Protecting..." : "Protect PDF"}
        </button>

      </div>

    </section>
  );
}