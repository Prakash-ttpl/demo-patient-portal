import { MAIN_PATHS } from "../libs/utility/constant";
import HomeSection from "../pages/HomeSection";
import MainApp from "../pages/MainApp";
import { AuthProtected, FullPageRoute } from "./authProtected";
import { Navigate } from "react-router-dom";

const AppRoutes = [
  {
    path: "/login/*",
    component: (
      <FullPageRoute>
        <div>Login</div>
      </FullPageRoute>
    ),
  },
  {
    path: "/*",
    component: (
      <AuthProtected>
        <MainApp />
      </AuthProtected>
    ),
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const MAIN_ROUTES = [
  {
    path: MAIN_PATHS.DASHBOARD,
    component: <HomeSection />,
    label: "Dashboard",
  },
  {
    path: MAIN_PATHS.ROOT,
    component: <Navigate to={MAIN_PATHS.REDIRECT_TO_DASHBOARD} />,
  },
];

export default AppRoutes;
