import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Reno Notice Board
        </h1>

        <h2 className="text-medium font-bold text-white/75 hidden sm:block">
          Manage all notices efficiently
        </h2>

        <Link
          href="/notices/new"
          className="bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          + Add Notice
        </Link>
      </div>
    </nav>
  );
}