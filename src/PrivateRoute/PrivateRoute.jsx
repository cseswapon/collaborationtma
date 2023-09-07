import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem("user-info");
  const user = JSON.parse(userInfo);

  const location = useLocation();

  if (!user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
