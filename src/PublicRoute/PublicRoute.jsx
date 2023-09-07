import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const userInfo = localStorage.getItem("user-info");
  const user = JSON.parse(userInfo);
  const location = useLocation();
  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default PublicRoute;
