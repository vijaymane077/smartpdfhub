import DeletePagesUpload from "../../components/upload/DeletePagesUpload";

export default function DeletePagesPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Delete PDF Pages
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Remove unwanted pages from your PDF.
      </p>

      <DeletePagesUpload />
    </main>
  );
}