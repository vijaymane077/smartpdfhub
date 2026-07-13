import MetadataUpload from "../../components/upload/MetadataUpload";

export default function MetadataPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Edit PDF Metadata
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Update PDF title, author, subject and creator.
      </p>

      <MetadataUpload />
    </main>
  );
}