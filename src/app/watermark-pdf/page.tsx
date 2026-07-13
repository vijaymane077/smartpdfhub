import WatermarkUpload from "../../components/upload/WatermarkUpload";

export default function WatermarkPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Watermark PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Add a text watermark to every page of your PDF.
      </p>

      <WatermarkUpload />
    </main>
  );
}