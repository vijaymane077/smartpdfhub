"use client";

type Props = {
  file: File | null;
  setFile: (file: File) => void;
};

export default function UploadDropzone({ file, setFile }: Props) {
  return (
    <div className="border-2 border-dashed border-blue-500 rounded-2xl p-10 text-center bg-white shadow-lg">

      <h2 className="text-3xl font-bold mb-4">
        Upload Your PDF
      </h2>

      <p className="text-gray-500 mb-6">
        Drag & Drop your PDF here or choose a file
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
        className="mb-6"
      />

      {file && (
        <div className="mt-4 p-4 rounded-lg bg-gray-100">
          <p className="font-semibold">{file.name}</p>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
}