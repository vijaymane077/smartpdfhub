type Props = {
  originalSize: number;
  compressedSize: number;
  onReset: () => void;
};

export default function CompressionResult({
  originalSize,
  compressedSize,
  onReset,
}: Props) {
  if (!compressedSize) return null;

  const saved =
    ((originalSize - compressedSize) / originalSize) * 100;

  return (
    <div className="mt-10 border rounded-2xl p-8 bg-green-50 shadow">

      <h2 className="text-3xl font-bold text-green-700 mb-6">
        ✅ PDF Compressed Successfully
      </h2>

      <div className="space-y-3 text-lg">
        <p>
          <strong>Original Size:</strong>{" "}
          {(originalSize / 1024 / 1024).toFixed(2)} MB
        </p>

        <p>
          <strong>Compressed Size:</strong>{" "}
          {(compressedSize / 1024 / 1024).toFixed(2)} MB
        </p>

        <p className="text-green-700 font-bold">
          Space Saved: {saved.toFixed(1)}%
        </p>
      </div>

      <button
        onClick={onReset}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
      >
        Compress Another PDF
      </button>

    </div>
  );
}