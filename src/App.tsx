import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import "./App.css";
import HomeRouter from "./pages/home/HomeRouter";
import Header from "./components/Header";
import ROUTES from "./consts/routes";
import AuthRouter from "./pages/auth/AuthRouter";
import PageNotFound from "./pages/error/PageNotFound";

import NoteRouter from "./pages/notes/NoteRouter";
import AuthRoute from "./guards/AuthRoute";
import { Suspense, lazy } from "react";

const Note = lazy(() => import("./pages/notes/Note"));

function App() {
  const location = useLocation();

  return (
    <>
      <Header path={location.pathname} />

      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.HOME.ME} />} />
        <Route path={ROUTES.HOME.ME}>{HomeRouter}</Route>
        <Route
          path={ROUTES.AUTH.ME}
          element={
            <AuthRoute
              redirectWhenSuccess={ROUTES.NOTES.ME}
              defaultRedirectWhenError={false}
              showContent
            >
              <Outlet />
            </AuthRoute>
          }
        >
          {AuthRouter}
        </Route>
        <Route
          path={ROUTES.NOTES.ME}
          element={
            <AuthRoute>
              <Suspense fallback={<div>loading content...</div>}>
                <Note />
              </Suspense>
            </AuthRoute>
          }
        >
          {NoteRouter}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
