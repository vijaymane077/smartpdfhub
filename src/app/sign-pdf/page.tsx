import SignPdfUpload from "../../components/upload/SignPdfUpload";

export default function SignPdfPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Sign PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Add your signature to any PDF document.
      </p>

      <SignPdfUpload />
    </main>
  );
}