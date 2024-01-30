import { render } from "@testing-library/react";

import { describe, expect, test, vi } from "vitest";
import EditorNote from "../../../pages/notes/EditorNote";
import { GlobalProviders } from "../../App.test";

describe("Editor component", () => {
  const mocks = vi.hoisted(() => ({
    createNote: Promise.resolve({
      note: {
        title: "note 1",
        content: "lorem",
        userId: 1,
      },
    }),
  }));

  vi.mock("/src/services/noteService", () => ({
    createNote: mocks.createNote,
  }));

  test("should render", () => {
    render(<EditorNote />, { wrapper: GlobalProviders });

    expect(true).toBeTruthy();
  });
});
