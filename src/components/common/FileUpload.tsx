"use client";

type Props = {
  accept?: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function FileUpload({
  accept = ".pdf",
  file,
  onChange,
}: Props) {
  return (
    <div>

      <input
        id="pdf-file"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] || null);
        }}
      />

      <label
        htmlFor="pdf-file"
        className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition"
      >
        {file ? "Choose Another File" : "Choose File"}
      </label>

      {file && (
        <div className="mt-6 bg-gray-100 rounded-xl p-5">

          <h3 className="font-bold text-lg">
            {file.name}
          </h3>

          <p className="text-gray-600">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>
      )}

    </div>
  );
}