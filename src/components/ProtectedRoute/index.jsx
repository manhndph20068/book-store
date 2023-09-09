import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const role = useSelector((state) => state.account.user.role);
  if (
    (isAdminRoute && role === "ADMIN") ||
    (!isAdminRoute && (role === "USER" || role === "ADMIN"))
  ) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
  // return <>{role === "ADMIN" ? <>{props.children}</> : <NotPermitted />}</>;
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};
export default ProtectedRoute;
