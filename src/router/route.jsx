import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const route = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute>
      <Home/>
    </PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
