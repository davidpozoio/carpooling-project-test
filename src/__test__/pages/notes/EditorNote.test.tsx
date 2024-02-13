import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import EditorNote from "../../../pages/notes/EditorNote";
import { GlobalProviders } from "../../App.test";
import { Route, Routes } from "react-router-dom";
import NoteCard from "../../../pages/notes/components/NoteCard";
import ROUTES from "../../../consts/routes";
import userEvent from "@testing-library/user-event";

describe("Editor component", () => {
  const mocks = vi.hoisted(() => ({
    createNote: Promise.resolve({
      note: {
        title: "note 1",
        content: "lorem",
        userId: 1,
      },
    }),
    getNoteById: vi.fn(() =>
      Promise.resolve({
        data: {
          note: {
            title: "note 12",
            content: "lorem",
            id: 12,
          },
        },
      })
    ),
    patchNote: vi.fn(() =>
      Promise.resolve({
        data: {
          note: {
            title: "note 12",
            content: "lorem",
            id: 12,
          },
        },
      })
    ),
  }));

  vi.mock("/src/services/noteService", () => ({
    createNote: mocks.createNote,
    getNoteById: mocks.getNoteById,
    patchNote: mocks.patchNote,
  }));

  test("should render", () => {
    render(<EditorNote />, { wrapper: GlobalProviders });

    expect(true).toBeTruthy();
  });

  test("should get the note based in its id when a navigate object it's not provided", async () => {
    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );
    await waitFor(() => {
      expect(mocks.getNoteById).toHaveBeenCalled();
    });

    await screen.findByText("note 12");
    await screen.findByText("lorem");
  });

  test("should not execute getNoteById when a state object is provided", async () => {
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

    const card = screen.getByText("note 1").closest("button") as HTMLElement;
    await userEvent.click(card);
    await waitFor(() => {
      expect(mocks.getNoteById).not.toBeCalled();
    });
    screen.debug();
  });

  test("should show note not found", async () => {
    mocks.getNoteById.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 404,
        },
      })
    );
    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );
    await waitFor(() => {
      expect(mocks.getNoteById).toHaveBeenCalled();
    });

    await screen.findByText("Note not found");
  });

  test("should show message 'There was an error, retry?'", async () => {
    mocks.getNoteById.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 500,
        },
      })
    );
    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );
    await waitFor(() => {
      expect(mocks.getNoteById).toHaveBeenCalled();
    });

    await screen.findByText("There was an error, retry?");
  });

  test("should update note data", async () => {
    mocks.getNoteById.mockImplementation(() => {
      return Promise.resolve({
        data: {
          note: { title: "note 2", content: "lorem", id: 1 },
        },
      });
    });

    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );

    await waitFor(() => {
      expect(mocks.getNoteById).toHaveBeenCalled();
    });
    const editorTitle = await screen.findByText("note 2");
    screen.debug();
    await userEvent.click(editorTitle);
    await userEvent.keyboard("wasd");
    await waitFor(() => {
      expect(mocks.patchNote).toHaveBeenCalled();
    });
  });

  test("should show message It can't update this note, please restore it", async () => {
    mocks.getNoteById.mockImplementation(() => {
      return Promise.resolve({
        data: {
          note: { title: "note 2", content: "lorem", id: 1 },
        },
      });
    });

    mocks.patchNote.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: "it can't update a note that is deleting",
            code: "E1000",
          },
        },
      })
    );

    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );

    await waitFor(() => {
      expect(mocks.getNoteById).toHaveBeenCalled();
    });
    const editorTitle = await screen.findByText("note 2");
    screen.debug();
    await userEvent.click(editorTitle);
    await userEvent.keyboard("wasd");
    await waitFor(() => {
      expect(mocks.patchNote).toHaveBeenCalled();
    });
    screen.getByText("It can't update this note, please restore it");
  });

  test("should show message note not found when note is a deleted note", async () => {
    mocks.getNoteById.mockImplementation(() =>
      Promise.resolve({
        data: {
          note: {
            id: 1,
            title: "note 1",
            content: "lorem",
            is_deleting: true,
          },
        },
      })
    );

    render(
      <>
        <EditorNote />
      </>,
      { wrapper: GlobalProviders }
    );
    await screen.findByText("Note not found");
    const titleNote = screen.queryByText("note 1");
    const contentNote = screen.queryByText("content");

    expect(titleNote).not.toBeInTheDocument();
    expect(contentNote).not.toBeInTheDocument();
  });

  test("should redirect to the notes page", async () => {
    render(
      <>
        <EditorNote />
        <Routes>
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const backButton = screen.getByTestId("back-button");
    await userEvent.click(backButton);
    screen.getByText("notes page");
  });
});
