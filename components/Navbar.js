import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Notice Board
        </h1>

        <Link
          href="/notices/new"
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
        >
          + Add Notice
        </Link>
      </div>
    </nav>
  );
}