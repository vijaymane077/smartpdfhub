import CompressUpload from "../../components/upload/CompressUpload";

export default function CompressPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Compress PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Reduce PDF file size without losing quality.
      </p>

      <CompressUpload />
    </main>
  );
}