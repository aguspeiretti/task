import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { loading, isAutenticated } = useAuth();
  console.log(loading, isAutenticated);
  // replace sobreescribe la ruta

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAutenticated) return <Navigate to={"/login"} replace />;

  //Outlet le dice que continue con el componente q sigue
  return <Outlet />;
};

export default ProtectedRoutes;
