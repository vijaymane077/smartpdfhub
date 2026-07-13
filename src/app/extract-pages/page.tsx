import ExtractPagesUpload from "../../components/upload/ExtractPagesUpload";

export default function ExtractPagesPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Extract PDF Pages
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Create a new PDF with selected pages.
      </p>

      <ExtractPagesUpload />
    </main>
  );
}