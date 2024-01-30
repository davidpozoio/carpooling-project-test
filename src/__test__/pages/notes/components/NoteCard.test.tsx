import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NoteCard from "../../../../pages/notes/components/NoteCard";
import { GlobalProviders } from "../../../App.test";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../../../consts/routes";

describe("NoteCard component", () => {
  test("should render", () => {
    render(<NoteCard note={{ id: 1, title: "", content: "" }} />, {
      wrapper: GlobalProviders,
    });
    expect(true).toBeTruthy();
  });

  test("should have a title and a content", () => {
    render(<NoteCard note={{ id: 1, title: "note 1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    screen.getByText("note 1");
    screen.getByText("lorem");
  });

  test("should open editor", async () => {
    render(
      <>
        <NoteCard note={{ id: 1, title: "Note 1", content: "lorem" }} />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route
            path={ROUTES.NOTES.EDITOR}
            element={<span>editor page</span>}
          />
        </Routes>
      </>,
      {
        wrapper: GlobalProviders,
      }
    );
    const title = screen.getByText("Note 1");
    const card = title.closest("button") as HTMLElement;
    await userEvent.click(card);
    screen.getByText("editor page");
  });
});
