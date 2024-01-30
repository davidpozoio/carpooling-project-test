import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { GlobalProviders } from "../../../App.test";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../../../consts/routes";
import EditorNote from "../../../../pages/notes/EditorNote";
import ModalNoteMenu from "../../../../pages/notes/components/ModalNoteMenu";

describe("ModalMenuNote component", () => {
  const mocks = vi.hoisted(() => ({
    createNote: vi.fn(() =>
      Promise.resolve({
        data: {
          note: {
            title: "new note",
            content: "default",
          },
        },
      })
    ),
  }));

  vi.mock("/src/services/noteService", () => ({
    createNote: mocks.createNote,
  }));

  test("should render", () => {
    render(<ModalNoteMenu />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should redirect to editor when note is created", async () => {
    render(
      <>
        <ModalNoteMenu show={true} />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route
            path={ROUTES.NOTES.EDITOR}
            element={<span>editor page</span>}
          />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const createButton = screen.getByText("create!");
    await userEvent.click(createButton);
    screen.getByText("editor page");
  });

  test("should show default content in editor when note is created", async () => {
    render(
      <>
        <ModalNoteMenu show={true} />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.EDITOR} element={<EditorNote />} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const createButton = screen.getByText("create!");
    await userEvent.click(createButton);
    screen.getByText("new note");
    screen.getByText("default");
  });

  test("should show content when show is true", () => {
    render(<ModalNoteMenu show={true} />, {
      wrapper: GlobalProviders,
    });
    const button = screen.getByText("create!");
    const modal = button.closest("div");
    expect(modal?.style.display).toBe("flex");
  });

  test("should not show content when show is false", () => {
    render(<ModalNoteMenu show={false} />, {
      wrapper: GlobalProviders,
    });
    const button = screen.getByText("create!");
    const modal = button.closest("div");
    expect(modal?.style.display).toBe("none");
  });

  test("should execute onClose function when I click on cancel button", async () => {
    const onCloseSpy = vi.fn(() => {});

    render(<ModalNoteMenu show={false} onClose={onCloseSpy} />, {
      wrapper: GlobalProviders,
    });
    const button = screen.getByText("cancel");
    await userEvent.click(button);
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
