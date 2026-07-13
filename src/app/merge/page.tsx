import MergeUpload from "../../components/upload/MergeUpload";

export default function MergePage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">Merge PDF</h1>
      <p className="text-xl text-gray-600 mb-10">
        Combine multiple PDF files into one.
      </p>
      <MergeUpload />
    </main>
  );
}
