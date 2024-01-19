import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import HomeRouter from "./pages/home/HomeRouter";
import Header from "./components/Header";
import ROUTES from "./consts/routes";
import AuthRouter from "./pages/auth/AuthRouter";
import PageNotFound from "./pages/error/PageNotFound";

function App() {
  const location = useLocation();

  return (
    <>
      <Header isHome={location.pathname === "/home"} />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.HOME.ME} />} />
        <Route path={ROUTES.HOME.ME}>{HomeRouter}</Route>
        <Route path={ROUTES.AUTH.ME}>{AuthRouter}</Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
