import PageNumbersUpload from "../../components/upload/PageNumbersUpload";

export default function PageNumbersPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Page Numbers
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Add page numbers to every page of your PDF.
      </p>

      <PageNumbersUpload />
    </main>
  );
}