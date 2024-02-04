import { Route } from "react-router-dom";

import ROUTES from "../../consts/routes";

import { Suspense, lazy } from "react";
import LoadingPage from "../../components/LoadingPage";

const NoteList = lazy(() => import("./components/NoteList"));
const EditorNote = lazy(() => import("./EditorNote"));

const NoteRouter = (
  <>
    <Route path="" element={<NoteList />} />
    <Route
      path={ROUTES.NOTES.EDITOR}
      element={
        <Suspense fallback={<LoadingPage />}>
          <EditorNote />
        </Suspense>
      }
    />
    <Route
      path={ROUTES.NOTES.TRASH}
      element={
        <Suspense fallback={<LoadingPage />}>
          <NoteList trashBean />
        </Suspense>
      }
    />
  </>
);

export default NoteRouter;
