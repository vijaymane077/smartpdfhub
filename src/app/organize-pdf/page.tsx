import OrganizeUpload from "../../components/upload/OrganizeUpload";

export default function OrganizePage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Organize PDF
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Reorder PDF pages into any sequence.
      </p>

      <OrganizeUpload />
    </main>
  );
}