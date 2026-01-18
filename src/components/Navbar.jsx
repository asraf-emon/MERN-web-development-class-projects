import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow-md p-4 sticky top-0 z-50 border-b border-gray-100">
    <div className="container mx-auto flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-black text-orange-600 uppercase tracking-tighter"
      >
        Contact <span className="text-slate-700">App</span>
      </Link>
      <div className="text-sm text-gray-400 font-medium hidden md:block">
        Your digital phonebook
      </div>
    </div>
  </nav>
);

export default Navbar;
