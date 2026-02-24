import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl overflow-hidden group">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-[90px] group-hover:bg-cyan-500/30 transition-all duration-1000"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-[90px] group-hover:bg-purple-500/30 transition-all duration-1000"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            {/* Ekhane 'animate-[spin_8s_linear_infinite]' soriye deya hoyeche */}
            <div className="w-36 h-36 rounded-full p-1 bg-linear-to-tr from-cyan-400 via-blue-500 to-purple-500">
              <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden border-2 border-[#0f172a]">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <span className="text-6xl text-slate-500 font-black">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute bottom-3 right-3 w-7 h-7 bg-emerald-500 border-4 border-[#121a2b] rounded-full shadow-xl"></div>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">
              {user?.displayName || "User"}
            </h1>
            <div className="mt-3 px-5 py-2 rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-inner">
              <p className="text-cyan-400 text-sm font-mono font-medium truncate max-w-62.5">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-10">
            <div className="bg-white/5 p-4 rounded-[20px] border border-white/5 text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Status
              </p>
              <p className="text-white text-sm font-bold mt-1">Verified</p>
            </div>
            <div className="bg-white/5 p-4 rounded-[20px] border border-white/5 text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Access
              </p>
              <p className="text-white text-sm font-bold mt-1">Student</p>
            </div>
          </div>

          <button
            onClick={logOut}
            className="group relative w-full mt-10 rounded-2xl bg-linear-to-r from-red-500 to-orange-500 p-[1.5px] transition-transform active:scale-95 cursor-pointer"
          >
            <div className="relative px-8 py-4 bg-[#0f172a] rounded-[14px] group-hover:bg-transparent transition-all">
              <span className="text-white font-black text-sm tracking-[0.2em] uppercase">
                End Session
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
