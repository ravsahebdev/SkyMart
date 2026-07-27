import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// login nahi hai to /login pe bhej do
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
