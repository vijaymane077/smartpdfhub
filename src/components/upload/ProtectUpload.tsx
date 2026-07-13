"use client";

import { useState } from "react";
import FileUpload from "../common/FileUpload";

export default function ProtectUpload() {

  const [file, setFile] = useState<File | null>(null);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleProtect() {

    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!password) {
      alert("Enter password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("password", password);

      const res = await fetch("/api/protect-pdf", {
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
      a.download = "protected.pdf";

      a.click();

      URL.revokeObjectURL(url);

    } catch (err) {

      console.error(err);

      alert("Failed to protect PDF.");

    }

    setLoading(false);

  }

  return (

    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold text-center mb-8">

          Protect PDF

        </h2>

        <FileUpload
          file={file}
          onChange={setFile}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-4 mt-8"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl p-4 mt-5"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleProtect}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          {loading ? "Protecting..." : "Protect PDF"}
        </button>

      </div>

    </section>

  );

}