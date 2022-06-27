import Home from "./components/Home";
import Department from "./components/Department";
import Employee from "./components/Employee";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/department",
    element: <Department />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
];

export default AppRoutes;
