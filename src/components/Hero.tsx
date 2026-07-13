import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40"></div>

      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-6">
            🚀 Fast • Secure • Free
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">

            All PDF Tools

            <br />

            <span className="text-blue-600">
              In One Place
            </span>

          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-xl text-gray-600 leading-9">

            Compress, Merge, Split, Convert and Edit PDF files online.

            No registration required.

            Fast processing.

            100% Secure.

          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

            <Link
              href="/compress"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Start Compressing
            </Link>

            <Link
              href="/merge"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Merge PDF
            </Link>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-3xl font-bold text-blue-600">
                ⚡
              </h3>
              <p className="mt-3 font-semibold">
                Fast Processing
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-3xl font-bold text-blue-600">
                🔒
              </h3>
              <p className="mt-3 font-semibold">
                Secure Files
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-3xl font-bold text-blue-600">
                📱
              </h3>
              <p className="mt-3 font-semibold">
                Mobile Friendly
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-3xl font-bold text-blue-600">
                ☁️
              </h3>
              <p className="mt-3 font-semibold">
                No Watermark
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}