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
import { QueryClientProvider } from "react-query";
import useQueryConfig from "./environment/useQueryConfig";
import LoadingPage from "./components/LoadingPage";

const Note = lazy(() => import("./pages/notes/Note"));

function App() {
  const location = useLocation();
  const { queryClient } = useQueryConfig();

  return (
    <QueryClientProvider client={queryClient}>
      <Header path={location.pathname} />

      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.HOME.ME} />} />
        <Route path={ROUTES.HOME.ME}>{HomeRouter}</Route>
        <Route
          path={ROUTES.AUTH.ME}
          element={
            <AuthRoute
              redirectWhenSuccess={ROUTES.ROUTES.ME}
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
          path={ROUTES.ROUTES.ME}
          element={
            <AuthRoute>
              <Suspense fallback={<LoadingPage />}>
                <Note />
              </Suspense>
            </AuthRoute>
          }
        >
          {NoteRouter}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
