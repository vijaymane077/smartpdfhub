import ProtectUpload from "../../components/upload/ProtectUpload";

export default function ProtectPdfPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">

      <h1 className="text-5xl font-bold mb-6">
        Protect PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Add password protection to your PDF.
      </p>

      <ProtectUpload />

    </main>
  );
}