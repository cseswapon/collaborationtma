import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import TaskManager from "../Components/TaskManager/TaskManager";
import PublicRoute from "../PublicRoute/PublicRoute";
import Header from "../Components/Share/Header/Header";
import CreateTeam from "../Components/CreateTeam/CreateTeam";
import TeamWork from "../Components/TeamWork/TeamWork";

export const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Header />
        <TaskManager />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/createTeam",
    element: (
      <PrivateRoute>
        <CreateTeam />
      </PrivateRoute>
    ),
  },
  {
    path: "/taskTeam",
    element: (
      <PrivateRoute>
        <TeamWork />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
