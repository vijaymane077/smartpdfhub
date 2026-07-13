import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-extrabold text-blue-400">
              SmartPDFHub
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Fast, Secure and Free PDF Tools.
              Compress, Merge, Split, Convert and Edit PDFs
              online with ease.
            </p>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              PDF Tools
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link href="/compress" className="hover:text-white">
                  Compress PDF
                </Link>
              </li>

              <li>
                <Link href="/merge" className="hover:text-white">
                  Merge PDF
                </Link>
              </li>

              <li>
                <Link href="/split" className="hover:text-white">
                  Split PDF
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              Convert
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link href="/jpg-to-pdf" className="hover:text-white">
                  JPG to PDF
                </Link>
              </li>

              <li>
                <Link href="/pdf-to-jpg" className="hover:text-white">
                  PDF to JPG
                </Link>
              </li>

              <li>
                <Link href="/word-to-pdf" className="hover:text-white">
                  Word to PDF
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">

          © 2026 SmartPDFHub. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}