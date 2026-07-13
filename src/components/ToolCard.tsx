import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

function getIcon(title: string) {
  switch (title) {
    case "Compress PDF":
      return "🗜️";
    case "Merge PDF":
      return "📑";
    case "Split PDF":
      return "✂️";
    case "JPG to PDF":
      return "🖼️";
    case "PDF to JPG":
      return "📷";
    case "Word to PDF":
      return "📝";
    case "PDF to Word":
      return "📄";
    default:
      return "📁";
  }
}

export default function ToolCard({
  title,
  description,
  href,
}: Props) {
  return (
    <Link href={href}>

      <div className="group h-full bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition">

          {getIcon(title)}

        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">

          {title}

        </h3>

        <p className="text-gray-600 leading-7">

          {description}

        </p>

        <div className="mt-8 flex items-center text-blue-600 font-semibold">

          Open Tool

          <span className="ml-2 group-hover:translate-x-2 transition">
            →
          </span>

        </div>

      </div>

    </Link>
  );
}