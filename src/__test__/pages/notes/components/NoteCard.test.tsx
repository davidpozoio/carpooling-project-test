import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NoteCard from "../../../../pages/notes/components/RouteCard";
import { GlobalProviders } from "../../../App.test";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../../../consts/routes";
import { useAppStore } from "../../../../store/store";

describe("NoteCard component", () => {
  const mocks = vi.hoisted(() => ({
    deleteNote: vi.fn(() =>
      Promise.resolve({
        message: "note deleted",
      })
    ),
    markNoteAsDeleted: vi.fn(),
    restoreNote: vi.fn(),
  }));

  vi.mock("/src/services/noteService", () => ({
    deleteNote: mocks.deleteNote,
    markNoteAsDeleted: mocks.markNoteAsDeleted,
    restoreNote: mocks.restoreNote,
  }));

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
    const card = title.closest("div") as HTMLElement;
    await userEvent.click(card);
    screen.getByText("editor page");
  });

  test("should not redirect to editor when is in trash bean mode", async () => {
    render(
      <>
        <NoteCard
          note={{ id: 1, title: "Note 1", content: "lorem" }}
          trashBean={true}
        />
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
    const card = title.closest("div") as HTMLElement;
    await userEvent.click(card);
    const editorPage = screen.queryByText("editor page");
    expect(editorPage).not.toBeInTheDocument();
  });

  test("should has an options button", () => {
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    screen.getByTestId("options");
  });

  test("should open options menu when I click on options button", async () => {
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    const optionsButton = screen.getByTestId("options");

    await userEvent.click(optionsButton);

    screen.getByText("Delete");
    screen.getByText("Delete permanently");
  });

  test("should change delete option to restore when is no trashBeanMode", async () => {
    render(
      <NoteCard
        trashBean={true}
        note={{ id: 1, title: "note1", content: "lorem" }}
      />,
      {
        wrapper: GlobalProviders,
      }
    );
    const optionsButton = screen.getByTestId("options");

    await userEvent.click(optionsButton);

    screen.getByText("Restore note");
    screen.getByText("Delete permanently");
  });

  test("should restore note", async () => {
    render(
      <NoteCard
        trashBean={true}
        note={{ id: 1, title: "note1", content: "lorem" }}
      />,
      {
        wrapper: GlobalProviders,
      }
    );
    const optionsButton = screen.getByTestId("options");

    await userEvent.click(optionsButton);

    const restore = screen.getByText("Restore note");
    await userEvent.click(restore);
    expect(mocks.restoreNote).toHaveBeenCalled();
  });

  test("should delete note permanently", async () => {
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    const optionsButton = screen.getByTestId("options");

    await userEvent.click(optionsButton);

    const deleteButton = screen.getByText("Delete permanently");
    await userEvent.click(deleteButton);
    expect(mocks.deleteNote).toHaveBeenCalled();
  });

  test("should mark as deleted", async () => {
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    const optionsButton = screen.getByTestId("options");

    await userEvent.click(optionsButton);

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    expect(mocks.markNoteAsDeleted).toHaveBeenCalled();
  });

  test("should show loading state when is deleting", async () => {
    useAppStore.setState({
      notes: [{ id: 1, isDeleting: true }],
    });
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    screen.getByText("Deleting note...");
  });

  test("should not show loading state", async () => {
    useAppStore.setState({
      notes: [{ id: 1, isDeleting: false }],
    });
    render(<NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />, {
      wrapper: GlobalProviders,
    });
    const message = screen.queryByText("Deleting note...");
    expect(message).not.toBeInTheDocument();
  });

  test("should show Restoring note... when is in trashBean mode", () => {
    useAppStore.setState({
      notes: [{ id: 1, isDeleting: true }],
    });
    render(
      <NoteCard trashBean note={{ id: 1, title: "note1", content: "lorem" }} />,
      {
        wrapper: GlobalProviders,
      }
    );
    screen.getByText("Restoring note...");
  });

  test("should not redirect to editor when is deleting note", async () => {
    useAppStore.setState({
      notes: [{ id: 1, isDeleting: true }],
    });
    render(
      <>
        <NoteCard note={{ id: 1, title: "note1", content: "lorem" }} />
        <Routes>
          <Route
            path={ROUTES.NOTES.EDITORID(1)}
            element={<span>editor note</span>}
          />
        </Routes>
      </>,
      {
        wrapper: GlobalProviders,
      }
    );
    const noteCard = screen.getByText("note1").closest("div") as HTMLElement;
    await userEvent.click(noteCard);
    expect(screen.queryByText("editor note")).not.toBeInTheDocument();
  });
});
