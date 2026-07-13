import JpgToPdfUpload from "../../components/upload/JpgToPdfUpload";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        JPG to PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Convert JPG, JPEG and PNG images into a PDF.
      </p>

      <JpgToPdfUpload />
    </main>
  );
}