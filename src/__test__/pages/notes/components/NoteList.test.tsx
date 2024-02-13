import { render, screen, waitFor } from "@testing-library/react";
import { Routes, Route, Link } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { GlobalProviders } from "../../../App.test";
import NoteList from "../../../../pages/notes/components/NoteList";
import ROUTES from "../../../../consts/routes";
import userEvent from "@testing-library/user-event";
import { useAppStore } from "../../../../store/store";

describe("NoteList component", () => {
  const mocks = vi.hoisted(() => ({
    getMyNotes: vi.fn(),
    deleteNote: vi.fn(() => Promise.resolve({ message: "note deleted" })),
    markNoteAsDeleted: vi.fn(() =>
      Promise.resolve({ message: "deleted state changed successfully" })
    ),
    createNote: vi.fn(),
    cancelAllPostQueries: vi.fn(),
  }));

  vi.mock("/src/environment/config.ts", () => ({
    cancelAllPostQueries: mocks.cancelAllPostQueries,
  }));

  vi.mock("/src/services/noteService", () => ({
    getMyNotes: mocks.getMyNotes,
    deleteNote: mocks.deleteNote,
    markNoteAsDeleted: mocks.markNoteAsDeleted,
    createNote: mocks.createNote,
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

  test("should switch to trash bean mode", () => {
    render(<NoteList trashBean />, { wrapper: GlobalProviders });
    screen.getByText("Trash");
    const addButton = screen.queryByTestId("add-note");
    expect(addButton).not.toBeInTheDocument();
  });

  test("should execute query to get notes when changes from normal list to trash list", async () => {
    render(
      <>
        <Link to={ROUTES.NOTES.ME}>normal note list</Link>
        <Link to={ROUTES.NOTES.TRASH}>trash note list</Link>
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<NoteList />} />
          <Route path={ROUTES.NOTES.TRASH} element={<NoteList trashBean />} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const noteListLink = screen.getByText("normal note list");
    const trashLink = screen.getByText("trash note list");
    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: {
          notes: [{ id: 1, title: "note1", content: "content1" }],
        },
      })
    );
    await userEvent.click(noteListLink);
    await waitFor(() => {
      expect(mocks.getMyNotes).toBeCalled();
    });
    screen.getByText("note1");

    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: {
          notes: [{ id: 1, title: "note2", content: "content1" }],
        },
      })
    );
    await userEvent.click(trashLink);
    await waitFor(() => {
      expect(mocks.getMyNotes).toBeCalled();
    });
    screen.getByText("note2");
  });

  test("should delete note from list", async () => {
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

    expect(noteTitle).toBeInTheDocument();
    const optionsNote1 = screen.getAllByTestId("options")[0];
    await userEvent.click(optionsNote1);
    const deleteOption = screen.getByText("Delete permanently");

    await userEvent.click(deleteOption);

    await waitFor(() => {
      expect(mocks.deleteNote).toHaveBeenCalled();
    });

    const note1 = screen.queryByText("note1");
    expect(note1).not.toBeInTheDocument();
  });

  test("should delete note from list and transport to trash list", async () => {
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

    render(
      <>
        <Link to={ROUTES.NOTES.ME}>normal list</Link>
        <Link to={ROUTES.NOTES.TRASH}>trash list</Link>
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<NoteList />} />
          <Route path={ROUTES.NOTES.TRASH} element={<NoteList trashBean />} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const normalList = screen.getByText("normal list");
    const trashList = screen.getByText("trash list");

    await userEvent.click(normalList);
    const optionsNote1 = screen.getAllByTestId("options")[0];
    await userEvent.click(optionsNote1);
    screen.debug();
    const markAsDeleted = screen.getByText("Delete");
    await userEvent.click(markAsDeleted);
    await waitFor(() => {
      expect(mocks.markNoteAsDeleted).toHaveBeenCalled();
    });

    const note1 = screen.queryByText("note1");
    expect(note1).not.toBeInTheDocument();
    await userEvent.click(trashList);

    screen.getByText("note1");
  });

  test("should show Trash empty message", async () => {
    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: {
          notes: [],
        },
      })
    );

    render(<NoteList trashBean />, { wrapper: GlobalProviders });

    await waitFor(() => {
      expect(mocks.getMyNotes).toHaveBeenCalled();
    });

    screen.getByText("Trash empty");
  });

  test("should keep creating note when I change page", async () => {
    useAppStore.setState({ isCreatingNote: true });
    render(
      <>
        <Link to={ROUTES.NOTES.ME}>normal list</Link>
        <Link to={ROUTES.NOTES.TRASH}>trash list</Link>
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<NoteList />} />
          <Route
            path={ROUTES.NOTES.TRASH}
            element={<NoteList trashBean={true} />}
          />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const noteList = screen.getByText("normal list");
    const trashList = screen.getByText("trash list");

    await userEvent.click(noteList);
    let creationMenu = screen
      .getByText("Create a new note")
      .closest("div") as HTMLElement;
    let createButton = screen.getByText<HTMLButtonElement>("Creating...");
    expect(creationMenu.style.display).toBe("flex");
    expect(createButton.disabled).toBeTruthy();

    await userEvent.click(trashList);
    screen.getByText("Trash");
    expect(creationMenu.style.display).toBe("none");

    await userEvent.click(noteList);
    creationMenu = screen
      .getByText("Create a new note")
      .closest("div") as HTMLElement;
    createButton = screen.getByText<HTMLButtonElement>("Creating...");
    expect(creationMenu.style.display).toBe("flex");
    expect(createButton.disabled).toBeTruthy();
    screen.debug();
  });

  test("should show message 'Sorry, there was an error to get the notes, try again!'", async () => {
    mocks.getMyNotes.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 500,
        },
      })
    );

    render(<NoteList />, { wrapper: GlobalProviders });

    await screen.findByText(
      "Sorry, there was an error to get the notes, try again!"
    );
    const reloadButton = screen.getByText("Reload notes");
    mocks.getMyNotes.mockImplementation(() =>
      Promise.resolve({
        data: {
          notes: [],
        },
      })
    );
    expect(mocks.getMyNotes).toBeCalled();

    await userEvent.click(reloadButton);

    expect(screen.queryByText("Reload notes")).not.toBeInTheDocument();
  });
});
