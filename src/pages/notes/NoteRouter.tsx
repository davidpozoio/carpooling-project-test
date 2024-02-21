import { Route } from "react-router-dom";

import ROUTES from "../../consts/routes";

import { Suspense, lazy } from "react";
import LoadingPage from "../../components/LoadingPage";
import UserDetails from "./UserDetails";

const NoteList = lazy(() => import("./components/NoteList"));
const EditorNote = lazy(() => import("./EditorNote"));

const NoteRouter = (
  <>
    <Route path="" element={<NoteList />} />
    <Route
      path={ROUTES.ROUTES.EDITOR}
      element={
        <Suspense fallback={<LoadingPage />}>
          <EditorNote />
        </Suspense>
      }
    />
    <Route
      path={ROUTES.ROUTES.TRASH}
      element={
        <Suspense fallback={<LoadingPage />}>
          <NoteList trashBean />
        </Suspense>
      }
    />
    <Route path={ROUTES.ROUTES.USER_DETAILS} element={<UserDetails />} />
  </>
);

export default NoteRouter;
