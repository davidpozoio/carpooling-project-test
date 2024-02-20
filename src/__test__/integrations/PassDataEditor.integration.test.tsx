import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import { GlobalProviders } from "../App.test";
import NoteCard from "../../pages/notes/components/RouteCard";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../consts/routes";
import EditorNote from "../../pages/notes/EditorNote";
import userEvent from "@testing-library/user-event";

describe("Pass data to editor integration", () => {
  test("should send note data to editor", async () => {
    render(
      <>
        <Routes>
          <Route
            path=""
            element={
              <NoteCard note={{ id: 1, title: "note 1", content: "lorem" }} />
            }
          />
          <Route path={ROUTES.NOTES.EDITOR} element={<EditorNote />} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const title = screen.getByText("note 1");
    const card = title.closest("button") as HTMLElement;
    await userEvent.click(card);
    screen.getByText("note 1");
    screen.getByText("lorem");
  });
});
