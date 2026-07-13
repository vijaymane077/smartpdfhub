import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          SmartPDFHub
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

          <Link
            href="/compress"
            className="hover:text-blue-600 transition"
          >
            Compress
          </Link>

          <Link
            href="/merge"
            className="hover:text-blue-600 transition"
          >
            Merge
          </Link>

          <Link
            href="/split"
            className="hover:text-blue-600 transition"
          >
            Split
          </Link>

          <Link
            href="/jpg-to-pdf"
            className="hover:text-blue-600 transition"
          >
            JPG to PDF
          </Link>

          <Link
            href="/pdf-to-jpg"
            className="hover:text-blue-600 transition"
          >
            PDF to JPG
          </Link>

        </nav>

        <div className="flex gap-3">

          <Link
            href="/compress"
            className="hidden md:inline-flex px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            All Tools
          </Link>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Login
          </button>

        </div>

      </div>
    </header>
  );
}