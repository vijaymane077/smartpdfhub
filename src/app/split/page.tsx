import SplitUpload from "../../components/upload/SplitUpload";

export default function SplitPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">Split PDF</h1>
      <p className="text-xl text-gray-600 mb-10">
        Split a PDF into two parts.
      </p>
      <SplitUpload />
    </main>
  );
}
