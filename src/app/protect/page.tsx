import ProtectUpload from "../../components/upload/ProtectUpload";

export default function ProtectPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Protect PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Add a password to your PDF and protect it from unauthorized access.
      </p>

      <ProtectUpload />
    </main>
  );
}