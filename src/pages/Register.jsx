import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) return alert("Password must be 6+ chars");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 text-white">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-emerald-400">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg focus:border-emerald-500 outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg focus:border-emerald-500 outline-none"
            required
          />
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg font-bold transition">
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-slate-400">
          Have an account?{" "}
          <Link to="/login" className="text-emerald-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
