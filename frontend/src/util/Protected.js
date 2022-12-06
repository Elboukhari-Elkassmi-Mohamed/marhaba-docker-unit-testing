import { Navigate, Outlet } from "react-router-dom";
const Protected = ( ) => {
  const isLogin = localStorage.getItem("token");

  return (
      isLogin ? <Outlet/> : <Navigate to="/" />
  );
}
export default Protected;