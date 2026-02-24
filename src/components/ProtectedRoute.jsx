import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white font-mono">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-white/5"></div>

          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
        </div>
        <span className="ml-4 text-cyan-400 tracking-widest uppercase text-sm animate-pulse">
          Authenticating...
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
