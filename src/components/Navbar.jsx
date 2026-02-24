import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold text-cyan-400 tracking-tighter"
      >
        Firebase Authentication<span className="text-white">.</span>
      </Link>

      <div className="space-x-6 flex items-center">
        {user ? (
          <>
            <span className="hidden md:inline text-slate-400 text-sm italic">
              Logged in as: {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-cyan-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
