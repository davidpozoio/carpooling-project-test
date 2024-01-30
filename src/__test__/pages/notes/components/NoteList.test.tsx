import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { GlobalProviders } from "../../../App.test";
import NoteList from "../../../../pages/notes/components/NoteList";
import ROUTES from "../../../../consts/routes";
import userEvent from "@testing-library/user-event";

describe("NoteList component", () => {
  const mocks = vi.hoisted(() => ({
    getMyNotes: vi.fn(),
  }));

  vi.mock("/src/services/noteService", () => ({
    getMyNotes: mocks.getMyNotes,
  }));

  test("should render", () => {
    render(<NoteList />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should have My notes title", () => {
    render(<NoteList />, { wrapper: GlobalProviders });
    screen.getByText("My notes");
  });

  test("must have an add button", () => {
    render(<NoteList />, { wrapper: GlobalProviders });
    screen.getByTestId("add-note");
  });

  test("should show not notes message ", async () => {
    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: { notes: [] },
      })
    );

    render(<NoteList />, { wrapper: GlobalProviders });
    const message = await screen.findByText(
      "There is no notes yet, create one!"
    );
    expect(message).toBeInTheDocument();
  });

  test("should show notes", async () => {
    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: {
          notes: [
            { id: 1, title: "note1", content: "content1" },
            { id: 2, title: "note2", content: "lorem" },
          ],
        },
      })
    );

    render(<NoteList />, { wrapper: GlobalProviders });
    const noteTitle = await screen.findByText("note1");
    const noteTitle2 = await screen.findByText("note2");
    expect(noteTitle).toBeInTheDocument();
    expect(noteTitle2).toBeInTheDocument();

    screen.debug();
  });

  test("should open modal menu when I click on add button", async () => {
    render(
      <>
        <NoteList />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route
            path={ROUTES.NOTES.CREATE}
            element={<span>create new note</span>}
          />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const addButton = screen.getByTestId("add-note");
    await userEvent.click(addButton);
    screen.getByText("Create a new note");
  });
});
