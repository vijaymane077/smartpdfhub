import PdfToJpgUpload from "../../components/upload/PdfToJpgUpload";

export default function PdfToJpgPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        PDF to JPG
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Convert every page of your PDF into high-quality JPG images.
      </p>

      <PdfToJpgUpload />
    </main>
  );
}