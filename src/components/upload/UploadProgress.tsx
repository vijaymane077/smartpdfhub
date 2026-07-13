type Props = {
  loading: boolean;
};

export default function UploadProgress({ loading }: Props) {
  if (!loading) return null;

  return (
    <div className="mt-6">
      <p className="mb-2 font-medium">
        Compressing PDF...
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
}