import PdfInfoUpload from "../../components/upload/PdfInfoUpload";

export default function PdfInfoPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        PDF Information
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        View metadata and document information.
      </p>

      <PdfInfoUpload />
    </main>
  );
}