import RotateUpload from "../../components/upload/RotateUpload";

export default function RotatePage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Rotate PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Rotate all pages of your PDF in seconds.
      </p>

      <RotateUpload />
    </main>
  );
}