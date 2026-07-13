import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadBox from "../components/UploadBox";
import ToolCard from "../components/ToolCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <UploadBox />

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold text-gray-900">
            Popular PDF Tools
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            Everything you need to work with PDF files.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <ToolCard
            title="Compress PDF"
            description="Reduce PDF file size without losing quality."
            href="/compress"
          />

          <ToolCard
            title="Merge PDF"
            description="Combine multiple PDF files into one document."
            href="/merge"
          />

          <ToolCard
            title="Split PDF"
            description="Split PDF into multiple files instantly."
            href="/split"
          />

          <ToolCard
            title="JPG to PDF"
            description="Convert JPG images into high-quality PDF."
            href="/jpg-to-pdf"
          />

          <ToolCard
            title="PDF to JPG"
            description="Extract every PDF page as JPG images."
            href="/pdf-to-jpg"
          />

          <ToolCard
            title="Word to PDF"
            description="Convert DOC and DOCX files into PDF."
            href="/word-to-pdf"
          />

          <ToolCard
            title="PDF to Word"
            description="Convert PDF into editable Word document."
            href="/pdf-to-word"
          />

          <ToolCard
            title="Protect PDF"
            description="Add password protection to your PDF."
            href="/protect-pdf"
          />
          <ToolCard
            title="Rotate PDF"
            description="Rotate PDF pages by 90°, 180° or 270°."
            href="/rotate-pdf"
          />
          <ToolCard
            title="Delete Pages"
            description="Delete unwanted pages from your PDF."
            href="/delete-pages"
          />

          <ToolCard
            title="Watermark PDF"
            description="Add text watermark to every page of your PDF."
            href="/watermark-pdf"
          />

          <ToolCard
            title="Unlock PDF"
            description="Remove password protection from your PDF."
            href="/unlock-pdf"
          />

          <ToolCard
            title="Extract Pages"
            description="Extract selected pages into a new PDF."
            href="/extract-pages"
          />

        </div>

      </section>

      <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center">
            Why SmartPDFHub?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="text-5xl">⚡</div>
              <h3 className="font-bold text-2xl mt-5">
                Fast
              </h3>
              <p className="text-gray-600 mt-3">
                Process your PDF files within seconds.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="text-5xl">🔒</div>
              <h3 className="font-bold text-2xl mt-5">
                Secure
              </h3>
              <p className="text-gray-600 mt-3">
                Files are processed securely and privately.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="text-5xl">📱</div>
              <h3 className="font-bold text-2xl mt-5">
                Responsive
              </h3>
              <p className="text-gray-600 mt-3">
                Works perfectly on desktop, tablet and mobile.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="text-5xl">☁️</div>
              <h3 className="font-bold text-2xl mt-5">
                Free
              </h3>
              <p className="text-gray-600 mt-3">
                Use essential PDF tools without paying.
              </p>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}