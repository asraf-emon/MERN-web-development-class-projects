import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials!", error);
    }
  };

  // Social Login Function
  const handleSocial = async (provider) => {
    try {
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      console.error(error.code);
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "Email already in use. Please sign in using the provider you used during registration.",
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

        <h2 className="text-4xl font-black text-center text-cyan-400 mb-8 tracking-tighter">
          SIGN IN
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full bg-slate-900 border border-slate-700 p-3.5 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 p-3.5 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-cyan-900/20 transition-all transform active:scale-95">
            Login
          </button>
        </form>

        <div className="relative my-8 text-center">
          <hr className="border-slate-700" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e293b] px-4 text-xs text-slate-500 font-bold uppercase">
            Or continue with
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleSocial(googleProvider)}
            className="flex-1 flex items-center justify-center gap-2 border border-slate-700 py-3 rounded-xl hover:bg-slate-800 transition-all font-bold"
          >
            Google
          </button>
          <button
            onClick={() => handleSocial(githubProvider)}
            className="flex-1 flex items-center justify-center gap-2 border border-slate-700 py-3 rounded-xl hover:bg-slate-800 transition-all font-bold"
          >
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 font-bold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
